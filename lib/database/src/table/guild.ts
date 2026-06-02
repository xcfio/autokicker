import { boolean, integer, pgTable, text, uuid, varchar } from "drizzle-orm/pg-core"
import { DateAndTime } from "../utility"
import { actionEnum } from "./enums"
import { randomUUIDv7 } from "node:crypto"

export const guild = pgTable("guilds_config", {
    id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
    guildId: varchar("guild_id", { length: 20 }).notNull().unique(),
    enabled: boolean("enabled").notNull().default(false),
    threshold_hours: integer("threshold_hours").notNull().default(720),
    action: actionEnum().notNull().default("kick"),
    log_channel_id: varchar("log_channel_id", { length: 20 }),
    kick_message: text("kick_message"),
    ...DateAndTime()
})

