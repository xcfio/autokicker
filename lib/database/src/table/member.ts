import { pgTable, uuid, text, timestamp } from "drizzle-orm/pg-core"
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
        .references(() => guild.id, { onDelete: "cascade" }),
    lastActive: timestamp("last_active", { withTimezone: false }),
    createdAt: timestamp("created_at", { withTimezone: false })
        .notNull()
        .$defaultFn(() => new Date()),
    updatedAt: timestamp("updated_at", { withTimezone: false })
        .notNull()
        .$onUpdateFn(() => new Date())
})
