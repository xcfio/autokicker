import {
    ChannelType,
    ChatInputCommandInteraction,
    ComponentType,
    GuildPremiumTier,
    InteractionContextType,
    MessageFlags,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    version
} from "discord.js"
import { arch, cpus, freemem, loadavg, release, totalmem, type } from "node:os"
import { erx, xcf } from "../../utils"
import { blue } from "colorette"
import { uptime } from "coolcake"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "status",
    description: "check server and bot status",
    contexts: [InteractionContextType.Guild]
}

export async function run(interaction: ChatInputCommandInteraction) {
    try {
        await interaction.deferReply()
        if (!interaction.inCachedGuild()) return xcf(interaction)

        const { client, guild } = interaction
        const uptimeString = uptime()

        const memberCount = guild.memberCount
        const botCount = guild.members.cache.filter((member) => member.user.bot).size
        const humanCount = memberCount - botCount

        const member = {
            online: guild.members.cache.filter((member) => member.presence?.status === "online").size,
            idle: guild.members.cache.filter((member) => member.presence?.status === "idle").size,
            dnd: guild.members.cache.filter((member) => member.presence?.status === "dnd").size,
            get total() {
                return this.online + this.idle + this.dnd
            },
            get offline() {
                return memberCount - this.total
            }
        }

        const owner = guild.members.cache.get(guild.ownerId)
        const textChannels = guild.channels.cache.filter((channel) => channel.type === ChannelType.GuildText).size
        const voiceChannels = guild.channels.cache.filter((channel) => channel.type === ChannelType.GuildVoice).size
        const categoryChannels = guild.channels.cache.filter(
            (channel) => channel.type === ChannelType.GuildCategory
        ).size
        const forumChannels = guild.channels.cache.filter((channel) => channel.type === ChannelType.GuildForum).size

        const totalChannels = guild.channels.cache.size
        const roleCount = guild.roles.cache.size
        const emojiCount = guild.emojis.cache.size
        const stickerCount = guild.stickers.cache.size

        const boostLevel = guild.premiumTier
        const boostCount = guild.premiumSubscriptionCount || 0

        const boostTierText = {
            [GuildPremiumTier.None]: "None",
            [GuildPremiumTier.Tier1]: "Tier 1",
            [GuildPremiumTier.Tier2]: "Tier 2",
            [GuildPremiumTier.Tier3]: "Tier 3"
        }[boostLevel]

        const ping = client.ws.ping
        const apiLatency = Date.now() - interaction.createdTimestamp

        const memoryUsage = (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)
        const totalMemory = (totalmem() / 1024 / 1024 / 1024).toFixed(2)
        const freeMemory = (freemem() / 1024 / 1024 / 1024).toFixed(2)
        const cpuModel = cpus()[0].model
        const cpuCores = cpus().length
        const nodeVersion = process.version
        const osInfo = `${type()} ${release()} (${arch()})`
        const loadAvg = loadavg()[0].toFixed(2)

        const totalGuilds = client.guilds.cache.size
        const totalUsers = client.users.cache.size

        await interaction.editReply({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: "## Status Information"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### Bot Status"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${blue("Ping")}: ${ping}ms\n` +
                                `${blue("API Latency")}: ${apiLatency}ms\n` +
                                `${blue("Uptime")}: ${uptimeString}\n` +
                                `${blue("Memory")}: ${memoryUsage} MB\n` +
                                `${blue("Servers")}: ${totalGuilds}\n` +
                                `${blue("Users Cached")}: ${totalUsers}\n` +
                                `${blue("Discord.js")}: v${version}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "\n### Server Information"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${blue("Guild")}: ${guild.name} (${guild.id})\n` +
                                `${blue("Owner")}: ${owner?.user.username} (${owner?.id})\n` +
                                `${blue("Created")}: ${guild.createdAt.toLocaleDateString()}\n` +
                                `${blue("Region")}: ${guild.preferredLocale}\n` +
                                `${blue("Verification")}: ${guild.verificationLevel}\n` +
                                `${blue("Boost")}: ${boostTierText} (${boostCount} boosts)\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### Member Stats"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${blue("Total")}: ${memberCount}\n` +
                                `${blue("Humans")}: ${humanCount}\n` +
                                `${blue("Bots")}: ${botCount}\n` +
                                `${blue("Online")}: ${member.online}\n` +
                                `${blue("Idle")}: ${member.idle}\n` +
                                `${blue("DND")}: ${member.dnd}\n` +
                                `${blue("Total Online")}: ${member.total}\n` +
                                `${blue("Offline")}: ${member.offline}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### Channel Stats"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${blue("Total")}: ${totalChannels}\n` +
                                `${blue("Text")}: ${textChannels}\n` +
                                `${blue("Voice")}: ${voiceChannels}\n` +
                                `${blue("Categories")}: ${categoryChannels}\n` +
                                `${blue("Forums")}: ${forumChannels}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### Server Assets"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${blue("Roles")}: ${roleCount}\n` +
                                `${blue("Emojis")}: ${emojiCount}\n` +
                                `${blue("Stickers")}: ${stickerCount}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### System Info"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${blue("OS")}: ${osInfo}\n` +
                                `${blue("CPU")}: ${cpuModel}\n` +
                                `${blue("Cores")}: ${cpuCores}\n` +
                                `${blue("Load")}: ${loadAvg}\n` +
                                `${blue("Memory")}: ${freeMemory}/${totalMemory} GB free\n` +
                                `${blue("Node.js")}: ${nodeVersion}\n` +
                                "```"
                        }
                    ]
                }
            ]
        })
    } catch (error) {
        erx(error as any)
        xcf(interaction)
    }
}
