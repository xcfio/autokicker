import { boolean, integer, pgEnum, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core"
import { DateAndTime } from "../utility"
import { randomUUIDv7 } from "node:crypto"

export const action = pgEnum("action_type", ["kick", "ban"])

export const guild = pgTable("guilds", {
    id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
    guildId: varchar("guild_id", { length: 20 }).notNull().unique(),
    enabled: boolean("enabled").notNull().default(false),
    thresholdHours: integer("threshold_hours").notNull().default(720),
    action: action("action").notNull().default("kick"),
    logChannel: varchar("log_channel", { length: 20 }).array().notNull().default([]),
    kickMessage: text("kick_message"),
    warningStages: integer("warning_stages").array().notNull().default([]),
    ...DateAndTime()
})
