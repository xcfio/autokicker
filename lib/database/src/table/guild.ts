import { boolean, integer, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core"
import { DateAndTime } from "../utility"
import { randomUUIDv7 } from "node:crypto"

export const action = pgEnum("action_type", ["kick", "ban"])

export const guild = pgTable("guilds_config", {
    id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
    guildId: varchar("guild_id", { length: 20 }).notNull().unique(),
    enabled: boolean("enabled").notNull().default(false),
    threshold_hours: integer("threshold_hours").notNull().default(720),
    action: action("action").notNull().default("kick"),
    log_channel_id: varchar("log_channel_id", { length: 20 }),
    kick_message: text("kick_message"),
    ...DateAndTime()
})

