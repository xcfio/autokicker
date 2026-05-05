import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"

export async function overlay(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Customize Your Rank Card",
        custom_id: "card-overlay",
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Set overlay",
                        custom_id: "overlay",
                        placeholder: "e.g., 80",
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Short,
                        min_length: 1,
                        max_length: 6,
                        required: true
                    }
                ]
            }
        ]
    })
}
