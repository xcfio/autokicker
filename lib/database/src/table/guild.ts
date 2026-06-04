import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const action = pgEnum("action_type", ["kick", "ban"])

export const guild = pgTable("guilds", {
    id: varchar("id", { length: 20 }).primaryKey().notNull().unique(),
    enabled: boolean("enabled").notNull().default(false),
    thresholdHours: integer("threshold_hours").notNull().default(720),
    action: action("action").notNull().default("kick"),
    logChannel: varchar("log_channel", { length: 20 }).array().notNull().default([]),
    kickMessage: text("kick_message"),
    warningStages: integer("warning_stages").array().notNull().default([]),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
        .notNull()
        .$defaultFn(() => Temporal.Now.instant().toString()),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
        .notNull()
        .$onUpdateFn(() => Temporal.Now.instant().toString())
})
