import { StringSelectMenuInteraction } from "discord.js"
import { message, isInvalid } from "../../../utils"
import { return_handler } from "../return"
import { whitelist_add } from "./add"
import { whitelist_remove } from "./remove"
import { whitelist_list } from "./list"

export function cfg_whitelist(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(message.error(invalid))

    switch (interaction.values[0]) {
        case "add": {
            return whitelist_add(interaction)
        }
        case "remove": {
            return whitelist_remove(interaction)
        }
        case "list": {
            return whitelist_list(interaction)
        }
        case "return": {
            return return_handler(interaction)
        }
        default: {
            return interaction.reply(message.error("Invalid option"))
        }
    }
}
