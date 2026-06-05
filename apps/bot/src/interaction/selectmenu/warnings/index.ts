import { cfg_message, error_message, isInvalid } from "../../../utils"
import { StringSelectMenuInteraction } from "discord.js"
import { warning_remove } from "./remove"
import { warning_list } from "./list"
import { warning_add } from "./add"

export async function cfg_warnings(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(error_message(invalid))

    switch (interaction.values[0]) {
        case "add": {
            return await warning_add(interaction)
        }
        case "remove": {
            return await warning_remove(interaction)
        }
        case "list": {
            return await warning_list(interaction)
        }
        case "return": {
            return await interaction.followUp(cfg_message())
        }
        default: {
            return await interaction.reply(error_message("Invalid option"))
        }
    }
}
