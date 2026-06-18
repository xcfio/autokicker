import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { Emoji, erx, xcf } from "../../../utils"
import { return_handler } from "../return"

export async function whitelist_add(interaction: StringSelectMenuInteraction) {
    try {
        const value = interaction.values[0]
        if (value === "return") return return_handler(interaction)

        let componentType: ComponentType.UserSelect | ComponentType.RoleSelect | ComponentType.ChannelSelect
        let placeholder: string
        let customId: string
        let title: string

        switch (value) {
            case "user": {
                componentType = ComponentType.UserSelect
                placeholder = "Select a user to whitelist"
                customId = "whitelist-add-user"
                title = "Whitelist User"
                break
            }

            case "role": {
                componentType = ComponentType.RoleSelect
                placeholder = "Select a role to whitelist"
                customId = "whitelist-add-role"
                title = "Whitelist Role"
                break
            }

            case "channel": {
                componentType = ComponentType.ChannelSelect
                placeholder = "Select a channel to whitelist"
                customId = "whitelist-add-channel"
                title = "Whitelist Channel"
                break
            }

            default: {
                return xcf(interaction)
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
                                    custom_id: customId,
                                    placeholder: placeholder,
                                    type: componentType,
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
        xcf(interaction)
    }
}
