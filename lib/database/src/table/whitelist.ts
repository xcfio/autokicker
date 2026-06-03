import { pgTable, uuid, varchar, uniqueIndex, pgEnum, timestamp } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { guild } from "./guild"

export const WhitelistType = pgEnum("whitelist_type", ["user", "role", "channel"])

export const whitelist = pgTable(
    "whitelist",
    {
        id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
        guildId: varchar("guild_id", { length: 20 })
            .notNull()
            .references(() => guild.guildId, { onDelete: "cascade" }),
        whitelistType: WhitelistType("whitelist_type").notNull(),
        whitelistId: varchar("whitelist_id", { length: 20 }).notNull(),
        createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
            .notNull()
            .$defaultFn(() => Temporal.Now.instant().toString()),
        updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
            .notNull()
            .$onUpdateFn(() => Temporal.Now.instant().toString())
    },
    (table) => [uniqueIndex("guild_whitelist_guild_role_index").on(table.guildId, table.whitelistId)]
)
