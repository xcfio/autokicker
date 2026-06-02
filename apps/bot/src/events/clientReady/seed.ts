import { Client } from "discord.js"
import { db } from "../../database"
import { table } from "@repo/database"

export async function seedGuildMembers(client: Client<true>) {
    for (const [, guild] of client.guilds.cache) {
        const members = await guild.members.fetch().catch(() => null)
        if (!members) continue

        for (const [, member] of members) {
            if (member.user.bot) continue

            await db
                .insert(table.memberActivity)
                .values({
                    guild_id: guild.id,
                    user_id: member.id,
                    last_active_at: Temporal.Now.instant().toString(),
                    last_action: "seed"
                })
                .onConflictDoNothing()
        }
    }
    console.log("Seeded member activity for all guilds")
}
