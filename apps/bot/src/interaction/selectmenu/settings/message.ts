import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"

export async function message(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Edit Level-up Message",
        custom_id: "settings-message",
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Level-up Message",
                        custom_id: "message",
                        placeholder: `Write a message. Use "stop" to stop the level-up message`,
                        style: TextInputStyle.Paragraph,
                        type: ComponentType.TextInput,
                        min_length: 0,
                        max_length: 2000,
                        required: true
                    }
                ]
            }
        ]
    })
}
