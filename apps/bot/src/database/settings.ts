import { pgTable, text, varchar } from "drizzle-orm/pg-core"
import { user } from "./user"

export const settings = pgTable("settings", {
    id: varchar("id", { length: 20 })
        .primaryKey()
        .notNull()
        .unique()
        .references(() => user.id, { onDelete: "cascade" }),
    level_message: text("level_message")
})
