import { cfg_message, error_message, isInvalid } from "../../../utils"
import { StringSelectMenuInteraction } from "discord.js"
import { warning_remove } from "./remove"
import { warning_list } from "./list"
import { warning_add } from "./add"

export async function cfg_warnings(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(error_message(invalid) as any)

    switch (interaction.values[0]) {
        case "add":
            await warning_add(interaction)
            break
        case "remove":
            await warning_remove(interaction)
            break
        case "list":
            await warning_list(interaction)
            break
        case "return":
            await interaction.followUp(cfg_message())
            break
        default:
            await interaction.reply(error_message("Invalid option") as any)
            break
    }
}
