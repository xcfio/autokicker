import { StringSelectMenuInteraction } from "discord.js"
import { message, isInvalid } from "../../../utils"
import { return_handler } from "../return"
import { warning_remove } from "./remove"
import { warning_list } from "./list"
import { warning_add } from "./add"

export function cfg_warnings(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(message.error(invalid))

    switch (interaction.values[0]) {
        case "add": {
            return warning_add(interaction)
        }
        case "remove": {
            return warning_remove(interaction)
        }
        case "list": {
            return warning_list(interaction)
        }
        case "return": {
            return return_handler(interaction)
        }
        default: {
            return interaction.reply(message.error("Invalid option"))
        }
    }
}
