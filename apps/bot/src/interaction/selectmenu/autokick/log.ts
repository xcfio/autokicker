import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { Emoji, erx, xcf } from "../../../utils"

export async function log(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.update({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("history")} Configure Log Channels`
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "Select an option below to manage autokick log channels."
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    custom_id: "autokick-log",
                                    placeholder: "Select action",
                                    type: ComponentType.StringSelect,
                                    options: [
                                        {
                                            label: "Add log channels",
                                            value: "add",
                                            description: "Choose text channels for autokick logs"
                                        },
                                        {
                                            label: "Remove log channels",
                                            value: "remove",
                                            description: "Choose text channels for autokick logs"
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
        void xcf(interaction)
    }
}
