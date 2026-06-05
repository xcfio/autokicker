import { StringSelectMenuInteraction } from "discord.js"
import { message, isInvalid } from "../../../utils"
import { whitelist } from "./whitelist"
import { warnings } from "./warnings"
import { autokick } from "./autokick"
import { toggle } from "./toggle"
import { status } from "./status"

export async function cfg(interaction: StringSelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(message.error(invalid))

    switch (interaction.values[0]) {
        case "status": {
            return await status(interaction)
        }
        case "toggle": {
            return await toggle(interaction)
        }
        case "autokick": {
            return await autokick(interaction)
        }
        case "whitelist": {
            return await whitelist(interaction)
        }
        case "warnings": {
            return await warnings(interaction)
        }
        default: {
            return await interaction.reply(message.error("Invalid option"))
        }
    }
}
