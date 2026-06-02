import { ComponentType, MessageFlags, ModalSubmitInteraction } from "discord.js"
import { db } from "../../database"
import { table } from "@repo/database"
import { ex, cx } from "../../function"

export default async function autokickConfigModal(interaction: ModalSubmitInteraction) {
    try {
        await interaction.deferReply()

        const guildId = interaction.guildId
        if (!guildId) return cx(interaction)

        const thresholdStr = interaction.fields.getTextInputValue("threshold_hours")
        const actionStr = interaction.fields.getTextInputValue("action").toLowerCase().trim()
        const logChannelId = interaction.fields.getTextInputValue("log_channel_id").trim() || null
        const kickMessage = interaction.fields.getTextInputValue("kick_message").trim() || null

        const thresholdHours = parseInt(thresholdStr, 10)
        if (isNaN(thresholdHours) || thresholdHours < 1) {
            return await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [
                    {
                        type: ComponentType.Container,
                        components: [
                            { type: ComponentType.TextDisplay, content: "# ❌ Invalid Threshold" },
                            { type: ComponentType.Separator },
                            {
                                type: ComponentType.TextDisplay,
                                content: "Threshold must be a positive number (hours)."
                            }
                        ]
                    }
                ]
            })
        }

        if (actionStr !== "kick" && actionStr !== "ban") {
            return await interaction.editReply({
                flags: MessageFlags.IsComponentsV2,
                components: [
                    {
                        type: ComponentType.Container,
                        components: [
                            { type: ComponentType.TextDisplay, content: "# ❌ Invalid Action" },
                            { type: ComponentType.Separator },
                            {
                                type: ComponentType.TextDisplay,
                                content: "Action must be either `kick` or `ban`."
                            }
                        ]
                    }
                ]
            })
        }

        await db
            .insert(table.guild)
            .values({
                guildId: guildId,
                threshold_hours: thresholdHours,
                action: actionStr,
                log_channel_id: logChannelId,
                kick_message: kickMessage
            })
            .onConflictDoUpdate({
                target: [table.guild.guildId],
                set: {
                    threshold_hours: thresholdHours,
                    action: actionStr,
                    log_channel_id: logChannelId,
                    kick_message: kickMessage
                }
            })

        return await interaction.editReply({
            flags: MessageFlags.IsComponentsV2,
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        { type: ComponentType.TextDisplay, content: "# ✅ Configuration Saved" },
                        { type: ComponentType.Separator },
                        {
                            type: ComponentType.TextDisplay,
                            content: [
                                `**Threshold:** ${thresholdHours} hours`,
                                `**Action:** ${actionStr}`,
                                `**Log Channel:** ${logChannelId ? `<#${logChannelId}>` : "Not set"}`,
                                `**Custom Message:** ${kickMessage ? "Set ✅" : "Default"}`
                            ].join("\n")
                        }
                    ]
                }
            ]
        })
    } catch (error: any) {
        ex(error)
        cx(interaction)
    }
}

