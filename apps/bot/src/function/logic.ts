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

export const randomColors = [
    ["Red", 0xff0000],
    ["Blue", 0x0000ff],
    ["Green", 0x00ff00],
    ["White", 0xffffff],
    ["Black", 0x000000],
    ["Cornflower Blue", 0x6495ed],
    ["Steel Blue", 0x4682b4],
    ["Azure", 0x007fff],
    ["Navy Blue", 0x000080],
    ["Midnight Blue", 0x191970],
    ["Dark Blue", 0x00008b],
    ["Sky Blue", 0x87ceeb],
    ["Light Blue", 0xadd8e6],
    ["Baby Blue", 0x89cff0],
    ["Coral", 0xff7f50],
    ["Salmon", 0xfa8072],
    ["Rose Gold", 0xb76e79],
    ["Emerald", 0x50c878],
    ["Forest Green", 0x228b22],
    ["Mint", 0x98ff98],
    ["Orchid", 0xda70d6],
    ["Plum", 0xdda0dd],
    ["Mauve", 0xe0b0ff],
    ["Deep Pink", 0xff1493],
    ["Terracotta", 0xe2725b],
    ["Sienna", 0xa0522d],
    ["Bronze", 0xcd7f32],
    ["Desert Sand", 0xedc9af],
    ["Slate Gray", 0x708090],
    ["Pewter", 0x899499],
    ["Warm Gray", 0x808077]
]

export function ColorPicker(count = 1, padStart = "") {
    const length = randomColors.length
    const random = new Set<number>()
    while (random.size < (count ?? 1)) random.add(Math.floor(Math.random() * length))

    const colors = []
    for (const index of random) {
        const color = randomColors[index]
        colors.push(`${padStart}${color[0]}: #${color[1].toString(16).padStart(6, "0")}`)
    }

    return colors.join("\n")
}

export function isInvalid(interaction: StringSelectMenuInteraction): false | string {
    if (!interaction.inCachedGuild()) return "Unknown guild"
    if (!isSendable(interaction.channel)) return "Unknown channel"
    return false
}
