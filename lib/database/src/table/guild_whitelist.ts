import { pgTable, uuid, varchar, uniqueIndex } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { DateAndTime } from "../utility"
import { guild } from "./guild"

export const guildWhitelist = pgTable("guild_whitelist", {
    id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
    guild_id: varchar("guild_id", { length: 20 })
        .notNull()
        .references(() => guild.guildId, { onDelete: "cascade" }),
    role_id: varchar("role_id", { length: 20 }).notNull(),
    ...DateAndTime()
}, (table) => [
    uniqueIndex("guild_whitelist_guild_role_index").on(table.guild_id, table.role_id)
])

