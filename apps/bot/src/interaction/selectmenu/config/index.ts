import { StringSelectMenuInteraction } from "discord.js"
import { embed, isInvalid } from "../../../function"
import { rank_card } from "./card"
import { status } from "./status"
import { customize_settings } from "./settings"

export async function config(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.update({ embeds: embed(invalid) })

    switch (interaction.values.shift()) {
        case "status":
            await status(interaction)
            break

        case "settings":
            await customize_settings(interaction)
            break

        case "card":
            await rank_card(interaction)
            break

        default:
            await interaction.update({ embeds: embed("Invalid Option") })
            break
    }
}
