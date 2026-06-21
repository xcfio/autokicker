import { boolean, integer, pgEnum, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"

export const action = pgEnum("action_type", ["kick", "ban"])

export const guild = pgTable("guilds", {
    id: varchar("id", { length: 20 }).primaryKey().notNull().unique(),
    enabled: boolean("enabled").notNull().default(false),
    threshold: integer("threshold").notNull().default(43200),
    log: varchar("log", { length: 20 }).array().notNull().default([]),
    action: action("action").notNull().default("kick"),
    stages: integer("stages").array().notNull().default([]),
    message: text("message"),
    createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
        .notNull()
        .$defaultFn(() => Temporal.Now.instant().toString()),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
        .notNull()
        .$onUpdateFn(() => Temporal.Now.instant().toString())
})
