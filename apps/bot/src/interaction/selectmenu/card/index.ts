import { StringSelectMenuInteraction } from "discord.js"
import { base_config, cfg_component, embed, isInvalid } from "../../../function"
import { background } from "./background"
import { name } from "./name"
import { progressbar } from "./progressbar"
import { statistics } from "./statistics"
import { overlay } from "./overlay"

export async function card(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.update({ embeds: embed(invalid) })

    switch (interaction.values.shift()) {
        case "background":
            await background(interaction)
            break

        case "overlay":
            await overlay(interaction)
            break

        case "name":
            await name(interaction)
            break

        case "progressbar":
            await progressbar(interaction)
            break

        case "statistics":
            await statistics(interaction)
            break

        case "return":
            await base_config(interaction)
            break

        default:
            await interaction.update({ embeds: embed("Invalid Option"), components: cfg_component() })
    }
}
