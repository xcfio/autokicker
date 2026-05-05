import {
    ChatInputCommandInteraction,
    InteractionContextType,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { LeaderboardBuilder } from "canvacord"
import { db, table } from "../../database"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "leaderboard",
    description: "See level leaderboard",
    contexts: [InteractionContextType.Guild]
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    if (!interaction.inCachedGuild()) return

    const counter = count()
    const users = (await db.select().from(table.level))
        .sort((a, b) => Number(b.xp ?? 0n) - Number(a.xp ?? 0n) || Number(b.level ?? 0n) - Number(a.level ?? 0n))
        .slice(0, 10)

    const leaderboard = new LeaderboardBuilder()
    leaderboard.setVariant("horizontal")

    leaderboard.setHeader({
        title: interaction.guild.name,
        image: interaction.guild.iconURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png",
        subtitle: `${interaction.guild.members.cache.size} members`
    })

    leaderboard.setPlayers(
        users
            .sort((x, y) => Number((y.xp ?? 0n) - (x.xp ?? 0n)))
            .map((data) => {
                const user = interaction.client.users.cache.get(data.id)
                return {
                    avatar: user?.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png",
                    username: user?.username ?? "Unknown",
                    displayName: user?.displayName ?? "Unknown",
                    level: Number(data.level),
                    xp: Number(data.xp),
                    rank: counter.next().value as number
                }
            })
    )

    await interaction.followUp({
        files: [
            {
                name: `leaderboard-${interaction.guildId}-${new Date().toISOString()}.png`,
                attachment: await leaderboard.build()
            }
        ]
    })
}

function* count() {
    for (let i = 1; ; i++) yield i
}
