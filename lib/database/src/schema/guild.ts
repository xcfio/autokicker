import { pgTable, text, timestamp, check } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm/sql"

export const guild = pgTable(
    "guilds",
    {
        id: text("id").primaryKey().notNull().unique(),
        premium: timestamp("premium", { withTimezone: false }),
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
