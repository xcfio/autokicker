import { GuildMember } from "discord.js"
import { map } from "../guildMemberRemove"
import { db, table } from "../../database"

export default async function GuildMemberAdd(member: GuildMember) {
    await db.insert(table.user).values({ id: member.id }).onConflictDoNothing()
    const existed = map.get(member.id)
    if (existed) clearTimeout(existed)
}
