import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    ComponentType,
    InteractionContextType,
    MessageFlags,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { db } from "../../database"
import { table } from "@repo/database"
import { eq, and } from "drizzle-orm"
import { ex, cx } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "autokick",
    description: "Configure automatic inactivity kicking",
    default_member_permissions: "32",
    contexts: [InteractionContextType.Guild],
    options: [
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "enable",
            description: "Enable autokick for this server"
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "disable",
            description: "Disable autokick for this server"
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "config",
            description: "Configure autokick settings (opens a form)"
        },
        {
            type: ApplicationCommandOptionType.SubcommandGroup,
            name: "warning",
            description: "Manage warning stages",
            options: [
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "add",
                    description: "Add a warning stage",
                    options: [
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "hours",
                            description: "Hours before deadline to send warning",
                            required: true,
                            min_value: 1
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "remove",
                    description: "Remove a warning stage",
                    options: [
                        {
                            type: ApplicationCommandOptionType.Integer,
                            name: "hours",
                            description: "Hours before deadline to remove",
                            required: true,
                            min_value: 1
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "list",
                    description: "List all warning stages"
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.SubcommandGroup,
            name: "whitelist",
            description: "Manage whitelisted roles",
            options: [
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "add",
                    description: "Add a role to the whitelist",
                    options: [
                        {
                            type: ApplicationCommandOptionType.Role,
                            name: "role",
                            description: "Role to whitelist",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "remove",
                    description: "Remove a role from the whitelist",
                    options: [
                        {
                            type: ApplicationCommandOptionType.Role,
                            name: "role",
                            description: "Role to remove",
                            required: true
                        }
                    ]
                },
                {
                    type: ApplicationCommandOptionType.Subcommand,
                    name: "list",
                    description: "List all whitelisted roles"
                }
            ]
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "status",
            description: "Show autokick config and stats"
        },
        {
            type: ApplicationCommandOptionType.Subcommand,
            name: "check",
            description: "Check a user's last activity",
            options: [
                {
                    type: ApplicationCommandOptionType.User,
                    name: "user",
                    description: "User to check",
                    required: true
                }
            ]
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    try {
        if (!interaction.inCachedGuild()) return cx(interaction)

        const sub = interaction.options.getSubcommand()
        const group = interaction.options.getSubcommandGroup()
        const guildId = interaction.guildId

        // === ENABLE ===
        if (sub === "enable") {
            await interaction.deferReply()
            await db
                .insert(table.guild)
                .values({ guildId, enabled: true })
                .onConflictDoUpdate({
                    target: [table.guild.guildId],
                    set: { enabled: true }
                })

            return await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [
                    {
                        type: ComponentType.Container,
                        components: [
                            { type: ComponentType.TextDisplay, content: "# ✅ AutoKick Enabled" },
                            { type: ComponentType.Separator },
                            {
                                type: ComponentType.TextDisplay,
                                content:
                                    "AutoKick is now enabled for this server.\nUse `/autokick config` to configure settings."
                            }
                        ]
                    }
                ]
            })
        }

        // === DISABLE ===
        if (sub === "disable") {
            await interaction.deferReply()
            await db
                .insert(table.guild)
                .values({ guildId: guildId, enabled: false })
                .onConflictDoUpdate({
                    target: [table.guild.guildId],
                    set: { enabled: false }
                })

            return await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [
                    {
                        type: ComponentType.Container,
                        components: [
                            { type: ComponentType.TextDisplay, content: "# ⛔ AutoKick Disabled" },
                            { type: ComponentType.Separator },
                            {
                                type: ComponentType.TextDisplay,
                                content: "AutoKick has been disabled for this server."
                            }
                        ]
                    }
                ]
            })
        }

        // === CONFIG (modal) ===
        if (sub === "config") {
            // Fetch current config to pre-fill
            const current = await db
                .select()
                .from(table.guild)
                .where(eq(table.guild.guildId, guildId))
                .then((rows) => rows[0])

            await interaction.showModal({
                customId: "autokick_config_modal",
                title: "AutoKick Configuration",
                components: [
                    {
                        type: 18,
                        label: "Inactivity Threshold (hours)",
                        description: "Members inactive longer than this will be kicked/banned",
                        component: {
                            type: 4,
                            custom_id: "threshold_hours",
                            style: 1,
                            placeholder: "720",
                            value: current?.threshold_hours?.toString() ?? "",
                            required: true
                        }
                    },
                    {
                        type: 18,
                        label: "Action (kick or ban)",
                        description: "What happens when a member exceeds the threshold",
                        component: {
                            type: 4,
                            custom_id: "action",
                            style: 1,
                            placeholder: "kick",
                            value: current?.action ?? "kick",
                            required: true
                        }
                    },
                    {
                        type: 18,
                        label: "Log Channel ID",
                        description: "Channel to log kicks/bans (leave empty to disable)",
                        component: {
                            type: 4,
                            custom_id: "log_channel_id",
                            style: 1,
                            placeholder: "1234567890",
                            value: current?.log_channel_id ?? "",
                            required: false
                        }
                    },
                    {
                        type: 18,
                        label: "Custom Kick/Ban Message",
                        description: "DM sent to the member before removal (optional)",
                        component: {
                            type: 4,
                            custom_id: "kick_message",
                            style: 2,
                            placeholder: "You have been removed for inactivity...",
                            value: current?.kick_message ?? "",
                            required: false
                        }
                    }
                ] as any
            })
            return
        }

        // === WARNING GROUP ===
        if (group === "warning") {
            await interaction.deferReply()

            if (sub === "add") {
                const hours = interaction.options.getInteger("hours", true)

                // Ensure guild config exists
                await db.insert(table.guild).values({ guildId }).onConflictDoNothing()

                await db
                    .insert(table.guildWarningStages)
                    .values({ guild_id: guildId, hours_before: hours })
                    .onConflictDoNothing()

                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                { type: ComponentType.TextDisplay, content: "# ✅ Warning Stage Added" },
                                { type: ComponentType.Separator },
                                {
                                    type: ComponentType.TextDisplay,
                                    content: `A warning will be sent **${hours} hours** before the deadline.`
                                }
                            ]
                        }
                    ]
                })
            }

            if (sub === "remove") {
                const hours = interaction.options.getInteger("hours", true)

                await db
                    .delete(table.guildWarningStages)
                    .where(
                        and(
                            eq(table.guildWarningStages.guild_id, guildId),
                            eq(table.guildWarningStages.hours_before, hours)
                        )
                    )

                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                { type: ComponentType.TextDisplay, content: "# 🗑️ Warning Stage Removed" },
                                { type: ComponentType.Separator },
                                {
                                    type: ComponentType.TextDisplay,
                                    content: `Warning stage at **${hours} hours** has been removed.`
                                }
                            ]
                        }
                    ]
                })
            }

            if (sub === "list") {
                const stages = await db
                    .select()
                    .from(table.guildWarningStages)
                    .where(eq(table.guildWarningStages.guild_id, guildId))

                const sorted = stages.map((s) => s.hours_before).sort((a, b) => b - a)
                const list =
                    sorted.length > 0
                        ? sorted.map((h) => `- **${h}** hours before deadline`).join("\n")
                        : "No warning stages configured."

                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                { type: ComponentType.TextDisplay, content: "# ⚠️ Warning Stages" },
                                { type: ComponentType.Separator },
                                { type: ComponentType.TextDisplay, content: list }
                            ]
                        }
                    ]
                })
            }
        }

        // === WHITELIST GROUP ===
        if (group === "whitelist") {
            await interaction.deferReply()

            if (sub === "add") {
                const role = interaction.options.getRole("role", true)

                await db.insert(table.guild).values({ guildId }).onConflictDoNothing()

                await db
                    .insert(table.guildWhitelist)
                    .values({ guild_id: guildId, role_id: role.id })
                    .onConflictDoNothing()

                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                { type: ComponentType.TextDisplay, content: "# ✅ Role Whitelisted" },
                                { type: ComponentType.Separator },
                                {
                                    type: ComponentType.TextDisplay,
                                    content: `Members with <@&${role.id}> will be exempt from autokick.`
                                }
                            ]
                        }
                    ]
                })
            }

            if (sub === "remove") {
                const role = interaction.options.getRole("role", true)

                await db
                    .delete(table.guildWhitelist)
                    .where(and(eq(table.guildWhitelist.guild_id, guildId), eq(table.guildWhitelist.role_id, role.id)))

                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                { type: ComponentType.TextDisplay, content: "# 🗑️ Role Removed" },
                                { type: ComponentType.Separator },
                                {
                                    type: ComponentType.TextDisplay,
                                    content: `<@&${role.id}> has been removed from the whitelist.`
                                }
                            ]
                        }
                    ]
                })
            }

            if (sub === "list") {
                const roles = await db
                    .select()
                    .from(table.guildWhitelist)
                    .where(eq(table.guildWhitelist.guild_id, guildId))

                const list =
                    roles.length > 0 ? roles.map((r) => `- <@&${r.role_id}>`).join("\n") : "No whitelisted roles."

                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                { type: ComponentType.TextDisplay, content: "# 🛡️ Whitelisted Roles" },
                                { type: ComponentType.Separator },
                                { type: ComponentType.TextDisplay, content: list }
                            ]
                        }
                    ]
                })
            }
        }

        // === STATUS ===
        if (sub === "status") {
            await interaction.deferReply()

            const config = await db
                .select()
                .from(table.guild)
                .where(eq(table.guild.guildId, guildId))
                .then((rows) => rows[0])

            if (!config) {
                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                { type: ComponentType.TextDisplay, content: "# 📊 AutoKick Status" },
                                { type: ComponentType.Separator },
                                {
                                    type: ComponentType.TextDisplay,
                                    content:
                                        "AutoKick has not been configured yet.\nUse `/autokick enable` to get started."
                                }
                            ]
                        }
                    ]
                })
            }

            const stages = await db
                .select()
                .from(table.guildWarningStages)
                .where(eq(table.guildWarningStages.guild_id, guildId))
            const whitelisted = await db
                .select()
                .from(table.guildWhitelist)
                .where(eq(table.guildWhitelist.guild_id, guildId))

            const trackedCount = await db
                .select()
                .from(table.memberActivity)
                .where(eq(table.memberActivity.guild_id, guildId))
                .then((rows) => rows.length)

            const warningList =
                stages.length > 0
                    ? stages
                          .map((s) => s.hours_before)
                          .sort((a, b) => b - a)
                          .map((h) => `${h}h`)
                          .join(", ")
                    : "None"

            const roleList = whitelisted.length > 0 ? whitelisted.map((r) => `<@&${r.role_id}>`).join(", ") : "None"

            return await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [
                    {
                        type: ComponentType.Container,
                        components: [
                            { type: ComponentType.TextDisplay, content: "# 📊 AutoKick Status" },
                            { type: ComponentType.Separator },
                            {
                                type: ComponentType.TextDisplay,
                                content: [
                                    `**Enabled:** ${config.enabled ? "Yes ✅" : "No ⛔"}`,
                                    `**Threshold:** ${config.threshold_hours} hours`,
                                    `**Action:** ${config.action}`,
                                    `**Log Channel:** ${config.log_channel_id ? `<#${config.log_channel_id}>` : "Not set"}`,
                                    `**Warning Stages:** ${warningList}`,
                                    `**Whitelisted Roles:** ${roleList}`,
                                    `**Tracked Members:** ${trackedCount}`
                                ].join("\n")
                            }
                        ]
                    }
                ]
            })
        }

        // === CHECK ===
        if (sub === "check") {
            await interaction.deferReply()

            const user = interaction.options.getUser("user", true)
            const record = await db
                .select()
                .from(table.memberActivity)
                .where(and(eq(table.memberActivity.guild_id, guildId), eq(table.memberActivity.user_id, user.id)))
                .then((rows) => rows[0])

            if (!record) {
                return await interaction.editReply({
                    flags: MessageFlags.IsComponentsV2,
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                { type: ComponentType.TextDisplay, content: "# 🔍 Activity Check" },
                                { type: ComponentType.Separator },
                                {
                                    type: ComponentType.TextDisplay,
                                    content: `No activity data found for <@${user.id}>.`
                                }
                            ]
                        }
                    ]
                })
            }

            const lastActive = Temporal.Instant.from(record.last_active_at)
            const now = Temporal.Now.instant()
            const diffMs = now.epochMilliseconds - lastActive.epochMilliseconds
            const diffHours = Math.floor(diffMs / 3_600_000)
            const diffDays = Math.floor(diffHours / 24)

            const sentWarnings = await db
                .select()
                .from(table.memberWarningsSent)
                .where(
                    and(eq(table.memberWarningsSent.guild_id, guildId), eq(table.memberWarningsSent.user_id, user.id))
                )

            const warningInfo =
                sentWarnings.length > 0 ? sentWarnings.map((w) => `${w.hours_before}h stage`).join(", ") : "None sent"

            return await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [
                    {
                        type: ComponentType.Container,
                        components: [
                            { type: ComponentType.TextDisplay, content: "# 🔍 Activity Check" },
                            { type: ComponentType.Separator },
                            {
                                type: ComponentType.TextDisplay,
                                content: [
                                    `**User:** <@${user.id}>`,
                                    `**Last Active:** ${record.last_active_at}`,
                                    `**Last Action:** ${record.last_action ?? "Unknown"}`,
                                    `**Inactive For:** ${diffDays}d ${diffHours % 24}h`,
                                    `**Warnings Sent:** ${warningInfo}`
                                ].join("\n")
                            }
                        ]
                    }
                ]
            })
        }
    } catch (error: any) {
        ex(error)
        cx(interaction)
    }
}

