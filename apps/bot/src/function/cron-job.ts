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

            const thresholdMs = config.threshold_hours * 3_600_000
            const now = Temporal.Now.instant()

            // Whitelisted roles
            const whitelisted = await db
                .select()
                .from(table.guildWhitelist)
                .where(eq(table.guildWhitelist.guild_id, guildId))
            const whitelistedIds = new Set(whitelisted.map((r) => r.role_id))

            // Guild's custom warning stages (sorted descending — largest hours first)
            const stages = await db
                .select()
                .from(table.guildWarningStages)
                .where(eq(table.guildWarningStages.guild_id, guildId))
            const sortedStages = stages.map((s) => s.hours_before).sort((a, b) => b - a)

            // Earliest cutoff: we care about members whose inactivity has entered the largest warning window
            const largestWarning = sortedStages.length > 0 ? sortedStages[0] : 0
            const cutoffMs = thresholdMs - largestWarning * 3_600_000
            const cutoff = Temporal.Instant.fromEpochMilliseconds(
                now.epochMilliseconds - cutoffMs
            ).toString()

            const records = await db
                .select()
                .from(table.memberActivity)
                .where(
                    and(
                        eq(table.memberActivity.guild_id, guildId),
                        lt(table.memberActivity.last_active_at, cutoff)
                    )
                )

            for (const record of records) {
                const member =
                    guild.members.cache.get(record.user_id) ??
                    (await guild.members.fetch(record.user_id).catch(() => null))

                if (!member) continue
                if (member.user.bot) continue
                if (member.id === guild.ownerId) continue
                if (!member.kickable) continue
                if (member.roles.cache.some((role) => whitelistedIds.has(role.id))) continue

                const lastActive = Temporal.Instant.from(record.last_active_at)
                const inactiveMs = now.epochMilliseconds - lastActive.epochMilliseconds
                const timeLeftMs = thresholdMs - inactiveMs

                // === KICK / BAN: past the threshold ===
                if (timeLeftMs <= 0) {
                    try {
                        const inactiveHours = Math.floor(inactiveMs / 3_600_000)
                        const actionVerb = config.action === "ban" ? "banned" : "kicked"
                        const dmText =
                            config.kick_message ??
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
                        if (config.log_channel_id) {
                            const logCh = guild.channels.cache.get(config.log_channel_id)
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

                        // Cleanup
                        await db
                            .delete(table.memberActivity)
                            .where(
                                and(
                                    eq(table.memberActivity.guild_id, guildId),
                                    eq(table.memberActivity.user_id, record.user_id)
                                )
                            )
                        await db
                            .delete(table.memberWarningsSent)
                            .where(
                                and(
                                    eq(table.memberWarningsSent.guild_id, guildId),
                                    eq(table.memberWarningsSent.user_id, record.user_id)
                                )
                            )
                    } catch (err) {
                        console.log(`Failed to ${config.action} ${record.user_id}:`, err)
                    }
                    continue
                }

                // === WARNINGS: check each custom stage ===
                const timeLeftHours = timeLeftMs / 3_600_000

                // Get already-sent warnings for this member
                const sentWarnings = await db
                    .select()
                    .from(table.memberWarningsSent)
                    .where(
                        and(
                            eq(table.memberWarningsSent.guild_id, guildId),
                            eq(table.memberWarningsSent.user_id, record.user_id)
                        )
                    )
                const sentSet = new Set(sentWarnings.map((w) => w.hours_before))

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
                            .insert(table.memberWarningsSent)
                            .values({
                                guild_id: guildId,
                                user_id: record.user_id,
                                hours_before: stageHours,
                                sent_at: Temporal.Now.instant().toString()
                            })
                            .onConflictDoNothing()
                    } catch (err) {
                        console.log(`Failed to warn ${record.user_id} (${stageHours}h stage):`, err)
                    }
                }
            }
        }
    } catch (error) {
        console.log("AutoKick cron error:", error)
    }
})
