import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"

export async function whitelist_add(interaction: StringSelectMenuInteraction) {
    await interaction.showModal({
        title: "Add Whitelist Entry",
        custom_id: "cfg-whitelist-add",
        components: [
            {
                type: ComponentType.Label,
                label: "Type (user, role, or channel)",
                component: {
                    custom_id: "type",
                    placeholder: "user",
                    style: TextInputStyle.Short,
                    type: ComponentType.TextInput,
                    min_length: 4,
                    max_length: 7,
                    required: true
                }
            },
            {
                type: ComponentType.Label,
                label: "ID",
                component: {
                    custom_id: "id",
                    placeholder: "123456789012345678",
                    style: TextInputStyle.Short,
                    type: ComponentType.TextInput,
                    min_length: 17,
                    max_length: 20,
                    required: true
                }
            }
        ]
    })
}
