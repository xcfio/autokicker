import { pgTable, uuid, text } from "drizzle-orm/pg-core"
import { guild } from "./guild"
import { user } from "./user"
// @ts-ignore
import { randomUUIDv7 } from "node:crypto"

export const member = pgTable("members", {
    id: uuid("id")
        .primaryKey()
        .$defaultFn(() => randomUUIDv7()),
    user: text("user")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    guild: text("guild")
        .notNull()
        .references(() => guild.id, { onDelete: "cascade" })
})
