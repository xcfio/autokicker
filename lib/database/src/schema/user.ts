import { boolean, check, pgTable, timestamp, text } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm/sql"

export const user = pgTable(
    "users",
    {
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
    },
    (table) => [
        check(
            "id_is_valid_snowflake",
            sql`${table.id} > 0 AND ${table.id} >= 4194304 AND ${table.id} <= 9223372036854775807`
        )
    ]
)
