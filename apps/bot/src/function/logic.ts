import {
    BaseChannel,
    Channel,
    ChannelType,
    PermissionFlagsBits,
    SendableChannels,
    StringSelectMenuInteraction
} from "discord.js"

export function isSendable(channel: Channel | null, text = false): channel is SendableChannels {
    if (!channel) return false

    if (!(channel instanceof BaseChannel)) return false
    if (!channel.isSendable()) return false

    if (channel.type === ChannelType.DM) return true
    if (!channel.viewable) return false

    const permissions = channel.permissionsFor(channel.client.user)
    if (!permissions) return false

    if (!permissions.has(PermissionFlagsBits.SendMessages)) return false
    if (!text && !permissions.has(PermissionFlagsBits.EmbedLinks)) return false

    return true
}
