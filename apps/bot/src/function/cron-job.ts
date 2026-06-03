import cron from "node-cron"
import { db } from "../database"
import { table } from "@repo/database"
import { eq, and, lt } from "drizzle-orm"
import { client } from "../index"
import { ComponentType, MessageFlags } from "discord.js"
import { isSendable } from "./logic"

cron.schedule("0 * * * *", async () => {
    try {
        const guilds = await db.select().from(table.guild).where(eq(table.guild.enabled, true))

        for (const config of guilds) {
            const guildId = config.guildId
            const guild = client.guilds.cache.get(guildId)
            if (!guild) continue

            const thresholdMs = config.thresholdHours * 3_600_000
            const now = Temporal.Now.instant()

            // Whitelisted roles
            const whitelisted = await db.select().from(table.whitelist).where(eq(table.whitelist.guildId, guildId))
            const whitelistedIds = whitelisted.map((row) => ({ id: row.whitelistId, type: row.whitelistType }))

            // Guild's custom warning stages (sorted descending — largest hours first)
            const [stages] = await db.select().from(table.guild).where(eq(table.guild.guildId, guildId))
            const sortedStages = stages.warningStages.sort((a, b) => b - a)

            // Earliest cutoff: we care about members whose inactivity has entered the largest warning window
            const largestWarning = sortedStages.length > 0 ? sortedStages[0] : 0
            const cutoffMs = thresholdMs - largestWarning * 3_600_000
            const cutoff = Temporal.Instant.fromEpochMilliseconds(now.epochMilliseconds - cutoffMs).toString()

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
                const inactiveMs = now.epochMilliseconds - lastActive.epochMilliseconds
                const timeLeftMs = thresholdMs - inactiveMs

                // === KICK / BAN: past the threshold ===
                if (timeLeftMs <= 0) {
                    try {
                        const inactiveHours = Math.floor(inactiveMs / 3_600_000)
                        const actionVerb = config.action === "ban" ? "banned" : "kicked"
                        const dmText =
                            config.kickMessage ??
                            `You have been **${actionVerb}** from **${guild.name}** for being inactive for ${inactiveHours}+ hours.`

                        await member
                            .send({
                                flags: [MessageFlags.IsComponentsV2],
                                components: [
                                    {
                                        type: ComponentType.Container,
                                        components: [
                                            { type: ComponentType.TextDisplay, content: "# 🦶 AutoKick" },
                                            { type: ComponentType.Separator },
                                            { type: ComponentType.TextDisplay, content: dmText }
                                        ]
                                    }
                                ]
                            })
                            .catch(() => {})

                        if (config.action === "ban") {
                            await member.ban({ reason: `AutoKick: Inactive for ${inactiveHours}h` })
                        } else {
                            await member.kick(`AutoKick: Inactive for ${inactiveHours}h`)
                        }

                        // Log
                        if (config.logChannel.length) {
                            for (const channel of config.logChannel) {
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
                                                        content: `🦶 **AutoKick** — ${member.user.tag} was **${actionVerb}** for being inactive for ${inactiveHours} hours.`
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
                const timeLeftHours = timeLeftMs / 3_600_000

                // Get already-sent warnings for this member
                const sentWarnings = await db
                    .select()
                    .from(table.warnings)
                    .where(and(eq(table.warnings.guildId, guildId), eq(table.warnings.userId, record.userId)))
                const sentSet = new Set(sentWarnings.map((w) => w.hoursBefore))

                for (const stageHours of sortedStages) {
                    if (sentSet.has(stageHours)) continue
                    if (timeLeftHours > stageHours) continue

                    const actionVerb = config.action === "ban" ? "banned" : "kicked"
                    const hoursLeft = Math.floor(timeLeftHours)
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
                                                content: "# ⚠️ Inactivity Warning"
                                            },
                                            { type: ComponentType.Separator },
                                            {
                                                type: ComponentType.TextDisplay,
                                                content: `You will be **${actionVerb}** from **${guild.name}** in approximately **${hoursLeft} hours** due to inactivity.\n\nSend a message, join a voice channel, or react to stay!`
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
                                hoursBefore: stageHours,
                                sentAt: Temporal.Now.instant().toString()
                            })
                            .onConflictDoNothing()
                    } catch (err) {
                        console.log(`Failed to warn ${record.userId} (${stageHours}h stage):`, err)
                    }
                }
            }
        }
    } catch (error) {
        console.log("AutoKick cron error:", error)
    }
})
