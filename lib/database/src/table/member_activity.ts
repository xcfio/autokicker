import { pgTable, timestamp, uuid, varchar, uniqueIndex, pgEnum } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { DateAndTime } from "../utility"

export const activity = pgEnum("activity_type", ["message", "voice", "reaction", "seed"])

export const memberActivity = pgTable(
    "member_activity",
    {
        id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
        guild_id: varchar("guild_id", { length: 20 }).notNull(),
        user_id: varchar("user_id", { length: 20 }).notNull(),
        last_active_at: timestamp("last_active_at", { mode: "string", withTimezone: false }).notNull(),
        last_action: activity("last_action"),
        ...DateAndTime()
    },
    (table) => [uniqueIndex("member_activity_guild_user_index").on(table.guild_id, table.user_id)]
)

