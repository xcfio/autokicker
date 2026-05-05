import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"
import { ColorPicker } from "../../../function"

export async function name(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Customize Your Rank Card",
        custom_id: "card-name",
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Hex Code for Name Color",
                        placeholder: `e.g., ${ColorPicker()}`,
                        custom_id: "name",
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
                        label: "Hex Code for Username Color",
                        placeholder: `e.g., ${ColorPicker()}`,
                        custom_id: "username",
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
