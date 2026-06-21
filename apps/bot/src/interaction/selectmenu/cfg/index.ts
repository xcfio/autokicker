import { StringSelectMenuInteraction } from "discord.js"
import { message, isInvalid } from "../../../utils"
import { whitelist } from "./whitelist"
import { warnings } from "./warnings"
import { autokick } from "./autokick"
import { toggle } from "./toggle"
import { status } from "./status"

export function cfg(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(message.error(invalid))

    switch (interaction.values[0]) {
        case "status": {
            return status(interaction)
        }
        case "toggle": {
            return toggle(interaction)
        }
        case "autokick": {
            return autokick(interaction)
        }
        case "whitelist": {
            return whitelist(interaction)
        }
        case "warnings": {
            return warnings(interaction)
        }
        default: {
            return interaction.reply(message.error("Invalid option"))
        }
    }
}
