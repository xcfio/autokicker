import { StringSelectMenuInteraction } from "discord.js"
import { message, isInvalid } from "../../../utils"
import { return_handler } from "../return"
import { threshold } from "./threshold"
import { action } from "./action"
import { msg } from "./message"
import { log } from "./log"

export function cfg_autokick(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(message.error(invalid))

    switch (interaction.values[0]) {
        case "threshold": {
            return threshold(interaction)
        }
        case "action": {
            return action(interaction)
        }
        case "log": {
            return log(interaction)
        }
        case "message": {
            return msg(interaction)
        }
        case "return": {
            return return_handler(interaction)
        }
        default: {
            return interaction.reply(message.error("Invalid option"))
        }
    }
}
