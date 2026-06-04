import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { Emoji, warnings_component } from "../../../utils"

export async function warnings(interaction: StringSelectMenuInteraction) {
    await interaction.update({
        flags: [MessageFlags.IsComponentsV2],
        components: [
            {
                type: ComponentType.Container,
                components: [
                    {
                        type: ComponentType.TextDisplay,
                        content: `## ${Emoji("exclamation")} Warning Stages`
                    },
                    { type: ComponentType.Separator },
                    {
                        type: ComponentType.TextDisplay,
                        content: "Configure warning stages that notify members before they are kicked for inactivity."
                    },
                    warnings_component()
                ]
            }
        ]
    } as any)
}
