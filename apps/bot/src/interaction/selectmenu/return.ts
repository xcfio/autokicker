import { StringSelectMenuInteraction } from "discord.js"
import { erx, xcf, cfg_message } from "../../utils"

export async function return_handler(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.update(cfg_message())
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
