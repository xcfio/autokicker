import { ComponentType, MessageFlags } from "discord.js"
import { eq, and, lt } from "drizzle-orm"
import { table } from "@repo/database"
import { duration } from "@repo/utils"
import { isSendable } from "./logic"
import { client } from "../index"
import { db } from "./database"
import { Emoji } from "./emoji"

export async function CronJob() {
    try {
        const guilds = await db.select().from(table.guild).where(eq(table.guild.enabled, true))

        for (const config of guilds) {
            const guildId = config.id
            const guild = client.guilds.cache.get(guildId)
            if (!guild) continue

            const threshold = Temporal.Duration.from({ minutes: config.threshold })
            const now = Temporal.Now.instant()

            // Whitelisted roles
            const whitelisted = await db.select().from(table.whitelist).where(eq(table.whitelist.guildId, guildId))
            const whitelistedIds = whitelisted.map((row) => ({ id: row.entry, type: row.type }))

            // Guild's custom warning stages (sorted descending — largest minutes first)
            const [stages] = await db.select().from(table.guild).where(eq(table.guild.id, guildId))
            const sortedStages = stages.stages.sort((a, b) => b - a)

            // Earliest cutoff: we care about members whose inactivity has entered the largest warning window
            const largestWarning = sortedStages.length > 0 ? sortedStages[0] : 0
            const cutoff = now.subtract(threshold).add({ minutes: largestWarning }).toString()

            const records = await db
                .select()
                .from(table.activity)
                .where(and(eq(table.activity.guildId, guildId), lt(table.activity.lastActiveAt, cutoff)))

            record_loop: for (const record of records) {
                const member =
                    guild.members.cache.get(record.userId) ??
                    (await guild.members.fetch(record.userId).catch(() => null))

                if (!member) continue
                if (member.user.bot) continue
                if (member.id === guild.ownerId) continue
                if (!member.kickable) continue

                for (const { id, type } of whitelistedIds) {
                    if (type === "role" && member.roles.cache.get(id)) continue record_loop
                    if (type === "user" && member.id === id) continue record_loop
                }

                const lastActive = Temporal.Instant.from(record.lastActiveAt)
                const inactiveDuration = now.since(lastActive)
                const timeLeft = threshold.subtract(inactiveDuration)

                // === KICK / BAN: past the threshold ===
                if (timeLeft.sign <= 0) {
                    try {
                        const actionVerb = config.action === "ban" ? "banned" : "kicked"
                        const dmText =
                            config.message ??
                            `You have been **${actionVerb}** from **${guild.name}** for being inactive for ${duration(inactiveDuration)}.`

                        await member
                            .send({
                                flags: [MessageFlags.IsComponentsV2],
                                components: [
                                    {
                                        type: ComponentType.Container,
                                        components: [
                                            { type: ComponentType.TextDisplay, content: "# AutoKick" },
                                            { type: ComponentType.Separator },
                                            { type: ComponentType.TextDisplay, content: dmText }
                                        ]
                                    }
                                ]
                            })
                            .catch(() => {})

                        if (config.action === "ban") {
                            await member.ban({ reason: `AutoKick: Inactive for ${duration(inactiveDuration)}` })
                        } else {
                            await member.kick(`AutoKick: Inactive for ${duration(inactiveDuration)}`)
                        }

                        // Log
                        if (config.log.length) {
                            for (const channel of config.log) {
                                const logCh = guild.channels.cache.get(channel)
                                if (logCh && isSendable(logCh)) {
                                    await logCh.send({
                                        flags: [MessageFlags.IsComponentsV2],
                                        components: [
                                            {
                                                type: ComponentType.Container,
                                                components: [
                                                    {
                                                        type: ComponentType.TextDisplay,
                                                        content: `**AutoKick** — ${member.user.tag} was **${actionVerb}** for being inactive for ${duration(inactiveDuration)}.`
                                                    }
                                                ]
                                            }
                                        ]
                                    })
                                }
                            }
                        }
                    } catch (err) {
                        console.log(`Failed to ${config.action} ${record.userId}:`, err)
                    }
                    continue
                }

                // === WARNINGS: check each custom stage ===
                const timeLeftMinutes = timeLeft.total("minutes")

                // Get already-sent warnings for this member
                const sentWarnings = await db
                    .select()
                    .from(table.warnings)
                    .where(and(eq(table.warnings.guildId, guildId), eq(table.warnings.userId, record.userId)))
                const sentSet = new Set(sentWarnings.map((w) => w.before))

                for (const stageMinutes of sortedStages) {
                    if (sentSet.has(stageMinutes)) continue
                    if (timeLeftMinutes > stageMinutes) continue

                    const actionVerb = config.action === "ban" ? "banned" : "kicked"

                    try {
                        await member
                            .send({
                                flags: [MessageFlags.IsComponentsV2],
                                components: [
                                    {
                                        type: ComponentType.Container,
                                        components: [
                                            {
                                                type: ComponentType.TextDisplay,
                                                content: `# ${Emoji("exclamation")} Inactivity Warning`
                                            },
                                            {
                                                type: ComponentType.Separator
                                            },
                                            {
                                                type: ComponentType.TextDisplay,
                                                content: `You will be **${actionVerb}** from **${guild.name}** in approximately **${duration(timeLeft)}** due to inactivity.\n\nSend a message, join a voice channel, or react to stay!`
                                            }
                                        ]
                                    }
                                ]
                            })
                            .catch(() => {})

                        await db
                            .insert(table.warnings)
                            .values({
                                guildId: guildId,
                                userId: record.userId,
                                before: stageMinutes,
                                sentAt: Temporal.Now.instant().toString()
                            })
                            .onConflictDoNothing()
                    } catch (err) {
                        console.log(`Failed to warn ${record.userId} (${stageMinutes}m stage):`, err)
                    }
                }
            }
        }
    } catch (error) {
        console.log("AutoKick cron error:", error)
    }
}
