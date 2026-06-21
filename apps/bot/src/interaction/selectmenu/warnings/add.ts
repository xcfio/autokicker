import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"

export async function warning_add(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Add Warning Stage",
        custom_id: "cfg-warning-add",
        components: [
            {
                type: ComponentType.Label,
                label: "Days before kick to send warning",
                component: {
                    custom_id: "days",
                    placeholder: "30",
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
