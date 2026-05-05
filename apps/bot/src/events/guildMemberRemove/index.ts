import { GuildMember } from "discord.js"
import { db, table } from "../../database"
import { eq } from "drizzle-orm"

export const map = new Map<string, NodeJS.Timeout>()
export default function GuildMemberRemove(member: GuildMember) {
    map.set(
        member.id,
        setTimeout(async () => {
            map.delete(member.id)
            await db.delete(table.user).where(eq(table.user.id, member.id))
        }, 7_200_000)
    )
}
