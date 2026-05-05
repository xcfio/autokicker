import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"
import { ColorPicker } from "../../../function"

export async function statistics(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Customize Your Rank Card",
        custom_id: "card-statistics",
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Hex Code for Statistics Text Color",
                        placeholder: `e.g., ${ColorPicker()}`,
                        custom_id: "text",
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Short,
                        min_length: 6,
                        max_length: 7,
                        required: false
                    }
                ]
            },
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Hex Code for Statistics Value Color",
                        placeholder: `e.g., ${ColorPicker()}`,
                        custom_id: "value",
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Short,
                        min_length: 6,
                        max_length: 7,
                        required: false
                    }
                ]
            }
        ]
    })
}
