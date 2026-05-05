import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    InteractionContextType,
    RepliableInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    User
} from "discord.js"
import { RankCardBuilder } from "canvacord"
import { calculator, ColorFormatter, Errors, xcf } from "../../function"
import { db, table } from "../../database"
import config from "../../config"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "level",
    description: "See level",
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "user",
            description: "User you want to see level",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    if (!interaction.inCachedGuild()) return xcf(interaction)

    // prettier-ignore
    level_reply(interaction, await interaction.client.users.fetch(interaction.options.getUser("user")?.id ?? interaction.user.id, { force: true }))
}

const images: Array<Buffer> = []
const type = new Set(["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/bmp", "image/tiff"])

export async function level_reply(interaction: RepliableInteraction, user: User | null) {
    try {
        if (!user) return interaction.followUp("404 - Unknown User")

        const array = await db.select().from(table.level)
        const cfg = (await db.select().from(table.card)).shift()
        const data = array.find((query) => query.id === user.id) ?? { id: user.id, message: 0n, level: 0n, xp: 0n }

        const image = await (async () => {
            if (cfg?.background) {
                const response = await fetch(cfg.background).catch(() => null)
                const content_type = response?.headers.get("content-type") ?? ""
                if (response?.ok && type.has(content_type)) return Buffer.from(await response.arrayBuffer())
            }

            if (!images.length) {
                for (const url of typeof config.image === "string" ? [config.image] : config.image) {
                    const response = await fetch(url).catch(() => null)
                    if (response) images.push(Buffer.from(await response.arrayBuffer()))
                }
            }

            const index = Math.floor(Math.random() * images.length)
            return images[index]
        })()

        // prettier-ignore
        array.sort((a, b) => Number(a.level === b.level ? (b.xp ?? 0n) - (a.xp ?? 0n) : (b.level ?? 0n) - (a.level ?? 0n)))
        const card = new RankCardBuilder()

        card.setDisplayName(user.displayName ?? "unknown")
        card.setAvatar(user.avatarURL() ?? user.displayAvatarURL())
        card.setUsername(user.discriminator === "0" ? `@${user.username}` : user.tag)

        card.setLevel(Number(data.level ?? 0n))
        card.setRank(array.findIndex((lvl) => lvl.id === user.id) + 1)

        card.setCurrentXP(Number(data.xp ?? 0n))
        card.setRequiredXP(Number(calculator(data.level ?? 0n)))
        image && card.setBackground(image)

        card.setOverlay(cfg?.overlay ?? 70)
        card.setStyles({
            username: {
                name: {
                    style: {
                        color: (ColorFormatter(cfg?.name) ?? "#ffffff") as any
                    }
                },
                handle: {
                    style: {
                        color: (ColorFormatter(cfg?.username) ?? "#6c9ae0") as any
                    }
                }
            },
            progressbar: {
                thumb: {
                    style: {
                        backgroundColor: (ColorFormatter(cfg?.progressbar_fill) ??
                            user.hexAccentColor ??
                            "#5865f2") as any
                    }
                },
                track: {
                    style: {
                        backgroundColor: (ColorFormatter(cfg?.progressbar_empty) ?? "#474750") as any
                    }
                }
            },
            statistics: {
                level: {
                    text: {
                        style: {
                            color: (ColorFormatter(cfg?.statistics_text) ?? "#3b87f7") as any
                        }
                    },
                    value: {
                        style: {
                            color: (ColorFormatter(cfg?.statistics_value) ?? "#ffffff") as any
                        }
                    }
                },
                xp: {
                    text: {
                        style: {
                            color: (ColorFormatter(cfg?.statistics_text) ?? "#3b87f7") as any
                        }
                    },
                    value: {
                        style: {
                            color: (ColorFormatter(cfg?.statistics_value) ?? "#ffffff") as any
                        }
                    }
                },
                rank: {
                    text: {
                        style: {
                            color: (ColorFormatter(cfg?.statistics_text) ?? "#3b87f7") as any
                        }
                    },
                    value: {
                        style: {
                            color: (ColorFormatter(cfg?.statistics_value) ?? "#ffffff") as any
                        }
                    }
                }
            }
        })

        await interaction.followUp({
            files: [
                {
                    name: `rank-card-${user.id}-${new Date().toISOString()}.png`,
                    attachment: await card.build()
                }
            ]
        })
    } catch (error: any) {
        xcf(interaction)
        Errors(error)
    }
}
