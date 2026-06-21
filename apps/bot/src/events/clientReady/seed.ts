import { Client, Guild, GuildMember, User } from "discord.js"
import { table } from "@repo/database"
import { db } from "../../utils"

export async function seed(client: Client<true>) {
    for (const user of client.users.cache.values()) await SeedUser(user)
    for (const guild of client.guilds.cache.values()) {
        await SeedGuild(guild)
        for (const member of guild.members.cache.values()) await SeedMember(member)
    }
}

async function SeedUser(user: User) {
    if (user.bot) return
    await db.insert(table.user).values({ id: user.id }).onConflictDoNothing()
}

async function SeedGuild(guild: Guild) {
    await db.insert(table.guild).values({ id: guild.id }).onConflictDoNothing()
}

async function SeedMember(member: GuildMember) {
    if (member.user.bot) return
    await db
        .insert(table.activity)
        .values({
            guildId: member.guild.id,
            userId: member.id,
            lastActiveAt: Temporal.Now.instant().toString(),
            lastAction: "seed"
        })
        .onConflictDoNothing()
}
