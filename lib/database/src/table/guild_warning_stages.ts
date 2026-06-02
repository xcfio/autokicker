import { integer, pgTable, uuid, varchar, uniqueIndex } from "drizzle-orm/pg-core"
import { randomUUIDv7 } from "node:crypto"
import { DateAndTime } from "../utility"
import { guild } from "./guild"

export const guildWarningStages = pgTable("guild_warning_stages", {
    id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
    guild_id: varchar("guild_id", { length: 20 })
        .notNull()
        .references(() => guild.guildId, { onDelete: "cascade" }),
    hours_before: integer("hours_before").notNull(),
    ...DateAndTime()
}, (table) => [
    uniqueIndex("guild_warning_stages_guild_hours_index").on(table.guild_id, table.hours_before)
])

