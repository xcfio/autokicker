import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"
import { ColorPicker } from "../../../function"

export async function progressbar(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Customize Your Rank Card",
        custom_id: "card-progressbar",
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Hex Code for Fill Area Color",
                        placeholder: `e.g., ${ColorPicker()}`,
                        custom_id: "fill",
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
                        label: "Hex Code for Empty Area Color",
                        placeholder: `e.g., ${ColorPicker()}`,
                        custom_id: "empty",
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
