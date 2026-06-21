import { StringSelectMenuInteraction } from "discord.js"
import { erx, message, xcf } from "../../../utils"

export async function msg(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.update(
            message.error(
                "This configuration is not available yet. This feature will be available in our [dashboard](https://autokicker.xcfio.com)"
            )
        )
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
