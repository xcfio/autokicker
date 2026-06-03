import { db } from "../database"
import { table } from "@repo/database"

export async function trackActivity(guildId: string, userId: string, action: "message" | "voice" | "reaction") {
    const now = Temporal.Now.instant().toString()

    await db
        .insert(table.activity)
        .values({
            guildId: guildId,
            userId: userId,
            lastActiveAt: now,
            lastAction: action
        })
        .onConflictDoUpdate({
            target: [table.activity.guildId, table.activity.userId],
            set: {
                lastActiveAt: now,
                lastAction: action
            }
        })
}
