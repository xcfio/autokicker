import { GuildMember, GuildTextBasedChannel, Message, OmitPartialGroupDMChannel } from "discord.js"
import { calculator, isSendable } from "../../function"
import { db, table } from "../../database"
import { LRUCache } from "lru-cache"
import { eq } from "drizzle-orm"

const cooldown = new Set<string>()
const user = new LRUCache<string, typeof table.level.$inferSelect>({ max: 100, ttl: 300_000 })
const settings = new LRUCache<string, typeof table.settings.$inferSelect>({ max: 100, ttl: 300_000 })

export async function level(message: OmitPartialGroupDMChannel<Message>) {
    if (!message.inGuild() || !message.member || message.author.bot) return
    if (cooldown.has(message.author.id)) return
    cooldown.add(message.author.id)

    const data = await (async () => {
        const data = user.get(message.author.id)
        if (data) return data

        let query = (await db.select().from(table.level).where(eq(table.level.id, message.author.id)))[0]
        if (!query) query = (await db.insert(table.level).values({ id: message.author.id }).returning())[0]

        user.set(message.author.id, query)
        return query
    })()

    const cfg = await (async () => {
        const data = settings.get(message.author.id)
        if (data !== undefined) return data

        const [query] = await db.select().from(table.settings).where(eq(table.settings.id, message.author.id))
        settings.set(message.author.id, query ?? null)
        return query
    })()

    const xp = (data.xp ?? 0n) + BigInt(Math.round(Math.random() * 5 + 5))
    const level = calculator(data.level ?? 0n) <= xp ? (data.level ?? 0n) + 1n : data.level
    const [query] = await db.update(table.level).set({ level, xp }).where(eq(table.level.id, data.id)).returning()

    if ((data.level ?? 0n) < (query?.level ?? 0n) && cfg?.level_message !== "" && isSendable(message.channel)) {
        message.channel.send({
            content: formatter({
                channel: message.channel,
                member: message.member,
                info: query,
                string: `${
                    cfg?.level_message ??
                    `🎉 Congratulations, {{user.mention}}! You've just reached **Level {{info.level}}**! 🎯 Keep chatting and connecting with others to level up even more! 🚀`
                }`
            })
        })
    }

    user.set(message.author.id, query)
    setTimeout(() => cooldown.delete(data.id), 20000)
}

function formatter(options: IsolationOptions) {
    const { string, channel: nonIsolatedChannel, member: nonIsolatedUser, info: nonIsolatedInfo } = options
    if (!/.*{{[a-z_][a-z0-9_.]*}}.*/gi.test(string)) return string
    // @ts-ignore
    options = null

    const channel = {
        createdAt: () => nonIsolatedChannel.createdAt?.toUTCString(),
        id: nonIsolatedChannel.id,
        lastMessageId: nonIsolatedChannel.lastMessageId,
        mention: () => `<#${nonIsolatedChannel.id}>`,
        name: nonIsolatedChannel.name
    }

    const guild = {
        createdAt: () => nonIsolatedChannel.guild.createdAt.toUTCString(),
        icon: nonIsolatedChannel.guild.icon,
        id: nonIsolatedChannel.guild.id,
        memberCount: nonIsolatedChannel.guild.memberCount,
        name: nonIsolatedChannel.guild.name,
        ownerId: nonIsolatedChannel.guild.ownerId
    }

    const info = {
        date: () => new Date().getUTCDate(),
        level: () => nonIsolatedInfo.level?.toString() ?? "null",
        month: () => new Date().getUTCMonth(),
        time: () => new Date().toUTCString(),
        timestamp: () => Math.round(new Date().getTime() / 1000),
        xp: () => nonIsolatedInfo.xp?.toString() ?? "null",
        year: () => new Date().getUTCFullYear()
    }

    const user = {
        avatar: nonIsolatedUser.avatar,
        createdAt: () => nonIsolatedUser.user.createdAt.toUTCString(),
        id: nonIsolatedUser.id,
        joinedAt: () => nonIsolatedUser.joinedAt?.toUTCString(),
        mention: () => `<@${nonIsolatedUser.id}>`,
        name: nonIsolatedUser.displayName,
        nick: nonIsolatedUser.nickname,
        username: nonIsolatedUser.user.username
    }

    return string.replace(/{{([a-z_][a-z0-9_.]*)}}/gi, (_, match: string) => {
        try {
            if (/.*(nonIsolatedChannel|nonIsolatedUser|nonIsolatedInfo).*/g.test(match)) return `{{${match}}}`

            const keys = match.split(".")
            let value = { user, channel, guild, info } as any

            for (const key of keys) value = typeof value[key] === "function" ? value[key]() : (value?.[key] ?? null)
            return value !== null ? value : `{{${match}}}`
        } catch (error) {
            console.trace(error)
            return `{{${match ?? null}}}`
        }
    })
}

type IsolationOptions = {
    string: string
    member: GuildMember
    channel: GuildTextBasedChannel
    info: typeof table.level.$inferSelect
}
