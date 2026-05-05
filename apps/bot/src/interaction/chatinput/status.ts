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
import { Errors, xcf } from "../../function"
import * as colorette from "colorette"
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

        // prettier-ignore
        const color = colorette[["black", "blue", "cyan", "green", "magenta"][Math.floor(Math.random() * 5)] as keyof typeof colorette] as (str: string) => string

        await interaction.editReply({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: "## 📊 Status Information"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### 🤖 Bot Status"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${color("Ping")}: ${ping}ms\n` +
                                `${color("API Latency")}: ${apiLatency}ms\n` +
                                `${color("Uptime")}: ${uptimeString}\n` +
                                `${color("Memory")}: ${memoryUsage} MB\n` +
                                `${color("Servers")}: ${totalGuilds}\n` +
                                `${color("Users Cached")}: ${totalUsers}\n` +
                                `${color("Discord.js")}: v${version}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "\n### 🏠 Server Information"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${color("Guild")}: ${guild.name} (${guild.id})\n` +
                                `${color("Owner")}: ${owner?.user.username} (${owner?.id})\n` +
                                `${color("Created")}: ${guild.createdAt.toLocaleDateString()}\n` +
                                `${color("Region")}: ${guild.preferredLocale}\n` +
                                `${color("Verification")}: ${guild.verificationLevel}\n` +
                                `${color("Boost")}: ${boostTierText} (${boostCount} boosts)\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### 👥 Member Stats"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${color("Total")}: ${memberCount}\n` +
                                `${color("Humans")}: ${humanCount}\n` +
                                `${color("Bots")}: ${botCount}\n` +
                                `${color("Online")}: ${member.online}\n` +
                                `${color("Idle")}: ${member.idle}\n` +
                                `${color("DND")}: ${member.dnd}\n` +
                                `${color("Total Online")}: ${member.total}\n` +
                                `${color("Offline")}: ${member.offline}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### 📂 Channel Stats"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${color("Total")}: ${totalChannels}\n` +
                                `${color("Text")}: ${textChannels}\n` +
                                `${color("Voice")}: ${voiceChannels}\n` +
                                `${color("Categories")}: ${categoryChannels}\n` +
                                `${color("Forums")}: ${forumChannels}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### 🎮 Server Assets"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${color("Roles")}: ${roleCount}\n` +
                                `${color("Emojis")}: ${emojiCount}\n` +
                                `${color("Stickers")}: ${stickerCount}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: "### 💻 System Info"
                        },
                        {
                            type: ComponentType.Separator
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${color("OS")}: ${osInfo}\n` +
                                `${color("CPU")}: ${cpuModel}\n` +
                                `${color("Cores")}: ${cpuCores}\n` +
                                `${color("Load")}: ${loadAvg}\n` +
                                `${color("Memory")}: ${freeMemory}/${totalMemory} GB free\n` +
                                `${color("Node.js")}: ${nodeVersion}\n` +
                                "```"
                        }
                    ]
                }
            ]
        })
    } catch (error) {
        Errors(error as any)
        xcf(interaction)
    }
}
