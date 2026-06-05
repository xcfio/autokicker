import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { autokick_component, Emoji } from "../../../utils"

export async function autokick(interaction: StringSelectMenuInteraction) {
    await interaction.update({
        flags: [MessageFlags.IsComponentsV2],
        components: [
            {
                type: ComponentType.Container,
                components: [
                    {
                        type: ComponentType.TextDisplay,
                        content: `## ${Emoji("autokicker")} AutoKick Settings`
                    },
                    { type: ComponentType.Separator },
                    {
                        type: ComponentType.TextDisplay,
                        content: "Configure the autokick behavior for your server."
                    },
                    autokick_component()
                ]
            }
        ]
    })
}
