import { boolean, check, pgTable, text, timestamp, varchar } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm/sql"

export const user = pgTable(
    "users",
    {
        id: varchar("id", { length: 20 }).primaryKey().notNull().unique(),
        email: text("email").unique(),
        consent: boolean("consent").notNull().default(true),
        access_token: text("access_token"),
        refresh_token: text("refresh_token"),
        expire_at: timestamp("expire_at", { mode: "string", withTimezone: false }),
        createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
            .notNull()
            .$defaultFn(() => Temporal.Now.instant().toString()),
        updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
            .notNull()
            .$onUpdateFn(() => Temporal.Now.instant().toString())
    },
    (table) => [
        check("email_format_check", sql`${table.email} ~ '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$'`)
    ]
)
