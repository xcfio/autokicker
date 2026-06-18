import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { Emoji, erx, xcf } from "../../../utils"

export async function whitelist_add(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.update({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("shield")} Add Whitelist Entry`
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "Select the type of whitelist entry you want to add."
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    custom_id: "whitelist-add-type",
                                    placeholder: "Select type",
                                    type: ComponentType.StringSelect,
                                    options: [
                                        {
                                            label: "User",
                                            value: "user",
                                            description: "Whitelist a user"
                                        },
                                        {
                                            label: "Role",
                                            value: "role",
                                            description: "Whitelist a role"
                                        },
                                        {
                                            label: "Channel",
                                            value: "channel",
                                            description: "Whitelist a channel"
                                        },
                                        {
                                            label: "Return",
                                            value: "return",
                                            description: "Return to previous menu"
                                        }
                                    ]
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
