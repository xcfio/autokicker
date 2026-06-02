import { boolean, check, pgTable, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core"
import { DateAndTime } from "../utility"
import { sql } from "drizzle-orm/sql"
import { randomUUIDv7 } from "node:crypto"

export const user = pgTable(
    "users",
    {
        id: uuid("id").primaryKey().notNull().unique().$defaultFn(randomUUIDv7),
        userId: varchar("user_id", { length: 20 }).notNull().unique(),
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
