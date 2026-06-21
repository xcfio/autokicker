import { AnySelectMenuInteraction } from "discord.js"
import { erx, xcf, cfg_message } from "../../utils"

export async function return_handler(interaction: AnySelectMenuInteraction) {
    try {
        await interaction.update(cfg_message())
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
