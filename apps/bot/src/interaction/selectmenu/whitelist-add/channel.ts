import { ChannelSelectMenuInteraction } from "discord.js"
import { message, erx, xcf } from "../../../utils"

export async function whitelist_add_channel(interaction: ChannelSelectMenuInteraction) {
    try {
        const channelId = interaction.values[0]
        const channel = interaction.channels
        const displayName = channel && "name" in channel ? `#${channel.toJSON()}` : `<#${channelId}>`
        // TODO: add validation and database integration
        return await interaction.update(
            message.success(
                `Selected channel **${displayName}** (\`${channelId}\`) to whitelist. (Database insertion skipped as requested)`
            )
        )
    } catch (error) {
        erx(error as Error)
        xcf(interaction)
    }
}
