import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
import { guild } from "./guild"
import { user } from "./user"
import { v7 } from "uuid"

export const member = pgTable("members", {
    id: uuid("id")
        .primaryKey()
        .$defaultFn(() => v7()),
    user: text("user")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    guild: text("guild")
        .notNull()
        .references(() => guild.id, { onDelete: "cascade" })
})
