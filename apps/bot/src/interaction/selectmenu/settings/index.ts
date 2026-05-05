import { StringSelectMenuInteraction } from "discord.js"
import { base_config, cfg_component, embed, isInvalid } from "../../../function"
import { message } from "./message"

export async function settings(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.update({ embeds: embed(invalid) })

    switch (interaction.values.shift()) {
        case "message":
            await message(interaction)
            break

        case "return":
            await base_config(interaction)
            break

        default:
            await interaction.update({ embeds: embed("Invalid Option"), components: cfg_component() })
    }
}
