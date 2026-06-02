import { boolean, check, pgTable, text, timestamp } from "drizzle-orm/pg-core"
import { DateAndTime, Snowflake } from "../utility"
import { sql } from "drizzle-orm/sql"

export const user = pgTable(
    "users",
    {
        id: Snowflake("id"),
        email: text("email").notNull().unique(),
        consent: boolean("consent"),
        access_token: text("access_token"),
        refresh_token: text("refresh_token"),
        expire_at: timestamp("expire_at", { mode: "string", withTimezone: false }),
        ...DateAndTime()
    },
    (table) => [
        check("email_format_check", sql`${table.email} ~ '^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$'`)
    ]
)
