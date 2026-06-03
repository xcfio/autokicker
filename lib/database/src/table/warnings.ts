import { integer, pgTable, timestamp, uuid, varchar, uniqueIndex } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { DateAndTime } from "../utility"

export const warnings = pgTable(
    "warnings",
    {
        id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
        guildId: varchar("guild_id", { length: 20 }).notNull(),
        userId: varchar("user_id", { length: 20 }).notNull(),
        hoursBefore: integer("hours_before").notNull(),
        sentAt: timestamp("sent_at", { mode: "string", withTimezone: false }).notNull(),
        ...DateAndTime()
    },
    (table) => [
        uniqueIndex("member_warnings_sent_guild_user_hours_index").on(table.guildId, table.userId, table.hoursBefore)
    ]
)
