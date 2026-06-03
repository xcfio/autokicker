import { Client } from "discord.js"
import { db } from "../../database"
import { table } from "@repo/database"

export async function seedGuildMembers(client: Client<true>) {
    for (const [, guild] of client.guilds.cache) {
        const members = await guild.members.fetch().catch(() => null)
        if (!members) continue

        for (const member of members.values()) {
            if (member.user.bot) continue

            await db
                .insert(table.activity)
                .values({
                    guildId: guild.id,
                    userId: member.id,
                    lastActiveAt: Temporal.Now.instant().toString(),
                    lastAction: "seed"
                })
                .onConflictDoNothing()
        }
    }
    console.log("Seeded member activity for all guilds")
}
