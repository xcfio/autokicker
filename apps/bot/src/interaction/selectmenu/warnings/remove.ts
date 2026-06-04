import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"

export async function warning_remove(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Remove Warning Stage",
        custom_id: "cfg-warning-remove",
        components: [
            {
                type: ComponentType.Label,
                label: "Minutes value to remove",
                component: {
                    custom_id: "hours",
                    placeholder: "2880",
                    style: TextInputStyle.Short,
                    type: ComponentType.TextInput,
                    min_length: 1,
                    max_length: 6,
                    required: true
                }
            }
        ]
    })
}
