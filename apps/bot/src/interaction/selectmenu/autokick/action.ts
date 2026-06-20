import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { Emoji, erx, xcf } from "../../../utils"

export async function action(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.update({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("hammer")} Set Action Type`
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "Select the action to take on inactive members."
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    custom_id: "autokick-action",
                                    placeholder: "Select action type",
                                    type: ComponentType.StringSelect,
                                    options: [
                                        {
                                            label: "Kick",
                                            value: "kick",
                                            description: "Kick inactive members"
                                        },
                                        {
                                            label: "Ban",
                                            value: "ban",
                                            description: "Ban inactive members"
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
