import { boolean, check, pgTable, timestamp, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm/sql"

export const user = pgTable("users", {
    id: text("id").primaryKey().notNull().unique(),
    email: text("email"),
    access_token: text("access_token"),
    refresh_token: text("refresh_token"),
    consent: boolean("consent"),
    createdAt: timestamp("created_at", { withTimezone: false })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
        .notNull()
        .$onUpdateFn(() => new Date())
})
