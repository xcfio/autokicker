import { pgTable, varchar } from "drizzle-orm/pg-core"

export const user = pgTable("user", {
    id: varchar("id", { length: 20 }).primaryKey().notNull().unique(),
    email: varchar("email", { length: 100 }),
    access_token: varchar("access_token", { length: 200 }),
    refresh_token: varchar("refresh_token", { length: 200 })
})
