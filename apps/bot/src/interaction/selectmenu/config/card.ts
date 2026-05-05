import { ComponentType, StringSelectMenuInteraction } from "discord.js"
import { ColorPicker, embed } from "../../../function"

export async function rank_card(interaction: StringSelectMenuInteraction) {
    await interaction.update({
        embeds: embed({
            title: "Customize Rank Card",
            description: [
                "Use the options below to customize rank card. You can modify:",
                "",
                "• Background Image - Custom image URL",
                "• Overlay Opacity - Value between 0-100%",
                "• Name Color - Name & Username colors",
                "• Progress Bar Colors - Fill & Empty colors",
                "• Statistics Colors - Text & Value colors",
                "",
                "**Color Format:**",
                "• Use hex color codes (e.g., #0000ff for Blue)",
                "• Colors can be input with or without the # symbol",
                "",
                "**Helpful Links:**",
                "• [Color Picker & Hex Codes](https://www.colorhexa.com/color-names)",
                "• [Image Hosting](https://postimg.cc/)",
                "",
                "**Examples:**",
                ColorPicker(5, "• ")
            ].join("\n"),
            footer: {
                text: `Select an option from the menu to continue customizing. Type "revert" to undo any changes.`
            }
        }),
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        custom_id: "card",
                        placeholder: "Select an option to continue",
                        type: ComponentType.StringSelect,
                        options: [
                            {
                                label: "Background Image",
                                description: "Set a custom background URL",
                                value: "background"
                            },
                            {
                                label: "Overlay Opacity",
                                description: "Set background overlay (0-100)",
                                value: "overlay"
                            },
                            {
                                label: "Name Color",
                                description: `Set name/username color (e.g., ${ColorPicker()})`,
                                value: "name"
                            },
                            {
                                label: "Progress Bar Colors",
                                description: `Set fill/empty colors (e.g., ${ColorPicker()})`,
                                value: "progressbar"
                            },
                            {
                                label: "Statistics Colors",
                                description: `Set text/value colors (e.g., ${ColorPicker()})`,
                                value: "statistics"
                            },
                            {
                                label: "Return To Config",
                                description: "Go back to main configuration",
                                value: "return"
                            }
                        ]
                    }
                ]
            }
        ]
    })
}
