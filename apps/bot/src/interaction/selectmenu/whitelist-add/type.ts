import { ChannelType, ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { Emoji, erx, xcf } from "../../../utils"
import { return_handler } from "../return"

export async function whitelist_add_type(interaction: StringSelectMenuInteraction) {
    try {
        const value = interaction.values[0]
        if (value === "return") return await return_handler(interaction)

        let type: ComponentType.UserSelect | ComponentType.RoleSelect | ComponentType.ChannelSelect
        let channel_types: Array<ChannelType> | undefined
        let placeholder: string
        let title: string

        switch (value) {
            case "user": {
                type = ComponentType.UserSelect
                placeholder = "Select a user to whitelist"
                title = "Whitelist User"
                break
            }

            case "role": {
                type = ComponentType.RoleSelect
                placeholder = "Select a role to whitelist"
                title = "Whitelist Role"
                break
            }

            case "channel": {
                type = ComponentType.ChannelSelect
                placeholder = "Select a channel to whitelist"
                title = "Whitelist Channel"
                channel_types = [
                    ChannelType.GuildText,
                    ChannelType.GuildAnnouncement,
                    ChannelType.GuildForum,
                    ChannelType.GuildMedia
                ]
                break
            }

            default: {
                return void xcf(interaction)
            }
        }

        await interaction.update({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("shield")} Whitelist - ${title}`
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: `Select a ${value} below to add to the whitelist.`
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    custom_id: "whitelist-add",
                                    type,
                                    placeholder,
                                    channel_types,
                                    max_values: 25,
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
