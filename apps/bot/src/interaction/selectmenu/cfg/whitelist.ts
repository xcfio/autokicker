import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { Emoji, whitelist_component } from "../../../utils"

export async function whitelist(interaction: StringSelectMenuInteraction) {
    await interaction.update({
        flags: [MessageFlags.IsComponentsV2],
        components: [
            {
                type: ComponentType.Container,
                components: [
                    {
                        type: ComponentType.TextDisplay,
                        content: `## ${Emoji("shield")} Whitelist Management`
                    },
                    { type: ComponentType.Separator },
                    {
                        type: ComponentType.TextDisplay,
                        content: "Manage whitelisted users, roles, and channels that are exempt from autokick."
                    },
                    whitelist_component()
                ]
            }
        ]
    })
}
