import { integer, pgTable, timestamp, uuid, varchar, uniqueIndex } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { DateAndTime } from "../utility"

export const memberWarningsSent = pgTable("member_warnings_sent", {
    id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
    guild_id: varchar("guild_id", { length: 20 }).notNull(),
    user_id: varchar("user_id", { length: 20 }).notNull(),
    hours_before: integer("hours_before").notNull(),
    sent_at: timestamp("sent_at", { mode: "string", withTimezone: false }).notNull(),
    ...DateAndTime()
}, (table) => [
    uniqueIndex("member_warnings_sent_guild_user_hours_index").on(table.guild_id, table.user_id, table.hours_before)
])

