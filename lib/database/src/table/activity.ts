import { pgTable, timestamp, uuid, varchar, uniqueIndex, pgEnum } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { guild } from "./guild"
import { user } from "./user"

export const ActivityType = pgEnum("activity_type", ["message", "voice", "reaction", "seed"])

export const activity = pgTable(
    "activity",
    {
        id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
        guildId: varchar("guild_id", { length: 20 })
            .notNull()
            .references(() => guild.guildId, { onUpdate: "cascade" }),
        userId: varchar("user_id", { length: 20 })
            .notNull()
            .references(() => user.userId, { onUpdate: "cascade" }),
        lastActiveAt: timestamp("last_active_at", { mode: "string", withTimezone: false }).notNull(),
        lastAction: ActivityType("last_action").notNull().default("seed"),
        createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
            .notNull()
            .$defaultFn(() => Temporal.Now.instant().toString()),
        updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
            .notNull()
            .$onUpdateFn(() => Temporal.Now.instant().toString())
    },
    (table) => [uniqueIndex("activity_guild_user_index").on(table.guildId, table.userId)]
)
