import { integer, pgTable, timestamp, uuid, varchar, uniqueIndex } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { guild } from "./guild"
import { user } from "./user"

export const warnings = pgTable(
    "warnings",
    {
        id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
        guildId: varchar("guild_id", { length: 20 })
            .notNull()
            .references(() => guild.id, { onDelete: "cascade" }),
        userId: varchar("user_id", { length: 20 })
            .notNull()
            .references(() => user.id, { onDelete: "cascade" }),
        before: integer("before").notNull(),
        sentAt: timestamp("sent_at", { mode: "string", withTimezone: false }).notNull(),
        createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
            .notNull()
            .$defaultFn(() => Temporal.Now.instant().toString()),
        updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
            .notNull()
            .$onUpdateFn(() => Temporal.Now.instant().toString())
    },
    (table) => [
        uniqueIndex("member_warnings_sent_guild_user_hours_index").on(table.guildId, table.userId, table.before)
    ]
)
