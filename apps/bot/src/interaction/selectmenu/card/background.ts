import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"

export async function background(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Customize Your Rank Card",
        custom_id: "card-background",
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Image URL",
                        custom_id: "image",
                        placeholder: "Enter the image URL (e.g., https://example.com/image.png)",
                        type: ComponentType.TextInput,
                        style: TextInputStyle.Short,
                        required: true
                    }
                ]
            }
        ]
    })
}
