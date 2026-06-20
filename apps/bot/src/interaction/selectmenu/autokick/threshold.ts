import { ComponentType, StringSelectMenuInteraction, TextInputStyle } from "discord.js"
import { erx, xcf } from "../../../utils"

export async function threshold(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.showModal({
            title: "Set Inactivity Threshold",
            custom_id: "cfg-threshold",
            components: [
                {
                    type: ComponentType.Label,
                    label: "Month",
                    component: {
                        custom_id: "month",
                        placeholder: "1",
                        style: TextInputStyle.Short,
                        type: ComponentType.TextInput,
                        min_length: 1,
                        max_length: 2,
                        required: false
                    }
                },
                {
                    type: ComponentType.Label,
                    label: "Days",
                    component: {
                        custom_id: "days",
                        placeholder: "30",
                        style: TextInputStyle.Short,
                        type: ComponentType.TextInput,
                        min_length: 1,
                        max_length: 2,
                        required: false
                    }
                }
            ]
        })
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
