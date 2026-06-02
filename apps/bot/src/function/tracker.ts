import { db } from "../database"
import { table } from "@repo/database"
import { and, eq } from "drizzle-orm"

export async function trackActivity(guildId: string, userId: string, action: "message" | "voice" | "reaction") {
    const now = Temporal.Now.instant().toString()

    await db
        .insert(table.memberActivity)
        .values({
            guild_id: guildId,
            user_id: userId,
            last_active_at: now,
            last_action: action
        })
        .onConflictDoUpdate({
            target: [table.memberActivity.guild_id, table.memberActivity.user_id],
            set: {
                last_active_at: now,
                last_action: action
            }
        })

    // Reset all sent warnings — member is active again
    await db
        .delete(table.memberWarningsSent)
        .where(
            and(
                eq(table.memberWarningsSent.guild_id, guildId),
                eq(table.memberWarningsSent.user_id, userId)
            )
        )
}
