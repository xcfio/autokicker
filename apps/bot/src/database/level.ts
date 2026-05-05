import { pgTable, varchar, bigint } from "drizzle-orm/pg-core"
import { user } from "./user"

export const level = pgTable("level", {
    id: varchar("id", { length: 20 })
        .primaryKey()
        .notNull()
        .unique()
        .references(() => user.id, { onDelete: "cascade" }),
    level: bigint("level", { mode: "bigint" }).default(0n),
    xp: bigint("xp", { mode: "bigint" }).default(0n)
})
