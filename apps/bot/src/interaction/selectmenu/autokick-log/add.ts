import { ChannelType, ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { Emoji, erx, xcf } from "../../../utils"

export async function autokick_log_add(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.update({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("history")} Log - channel`
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: `Select a channel below to add to the log channels.`
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    custom_id: "autokick-log",
                                    type: ComponentType.ChannelSelect,
                                    placeholder: "Select a channel to add to log",
                                    channel_types: [ChannelType.GuildText, ChannelType.GuildAnnouncement],
                                    max_values: 1,
                                    min_values: 1
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
