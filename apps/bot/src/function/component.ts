import { APIActionRowComponent, APIStringSelectComponent, ComponentType, StringSelectMenuInteraction } from "discord.js"
import { embed } from "./embed"

export function cfg_component(): Array<APIActionRowComponent<APIStringSelectComponent>> {
    return [
        {
            type: ComponentType.ActionRow,
            components: [
                {
                    custom_id: "config",
                    placeholder: "Select an option to continue",
                    type: ComponentType.StringSelect,
                    options: [
                        {
                            value: "status",
                            label: "Check configuration status",
                            description: "View current user profile settings and configuration status"
                        },
                        {
                            value: "card",
                            label: "Customize rank card",
                            description: "Personalize the appearance of member rank cards"
                        },
                        {
                            value: "settings",
                            label: "Customize settings",
                            description: "Personalize the appearance of member rank cards"
                        }
                    ]
                }
            ]
        }
    ]
}

export async function base_config(interaction: StringSelectMenuInteraction) {
    await interaction.update({
        embeds: embed({
            title: "User Configuration",
            description: "Select an option below to configure your profile settings."
        }),
        components: cfg_component()
    })
}
