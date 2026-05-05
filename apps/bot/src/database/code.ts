import { pgTable, varchar, integer } from "drizzle-orm/pg-core"

export const code = pgTable("code", {
    code: varchar("code", { length: 36 }).primaryKey(),
    time: integer("time").notNull().default(1)
})
