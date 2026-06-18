import { RoleSelectMenuInteraction } from "discord.js"
import { message, erx, xcf } from "../../../utils"

export async function whitelist_add_role(interaction: RoleSelectMenuInteraction) {
    try {
        const roleId = interaction.values[0]
        const role = interaction.roles
        const displayName = role ? `@${role.toJSON()}` : `<@&${roleId}>`
        // TODO: add validation and database integration
        return await interaction.update(
            message.success(
                `Selected role **${displayName}** (\`${roleId}\`) to whitelist. (Database insertion skipped as requested)`
            )
        )
    } catch (error) {
        erx(error as Error)
        xcf(interaction)
    }
}
