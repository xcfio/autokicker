// oxlint-disable

import { UserSelectMenuInteraction } from "discord.js"
import { message, erx, xcf } from "../../../utils"

export async function whitelist_add_user(interaction: UserSelectMenuInteraction) {
    try {
        const userId = interaction.values[0]
        const user = interaction.users
        const displayName = user ? `@${user.toJSON()}` : `<@${userId}>`
        // TODO: add validation and database integration
        return await interaction.update(
            message.success(
                `Selected user **${displayName}** (\`${userId}\`) to whitelist. (Database insertion skipped as requested)`
            )
        )
    } catch (error) {
        erx(error as Error)
        xcf(interaction)
    }
}
