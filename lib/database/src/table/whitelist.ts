import { pgTable, uuid, varchar, uniqueIndex, pgEnum } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { DateAndTime } from "../utility"
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
        ...DateAndTime()
    },
    (table) => [uniqueIndex("guild_whitelist_guild_role_index").on(table.guildId, table.whitelistId)]
)
