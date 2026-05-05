import { pgTable, varchar, text, integer, check } from "drizzle-orm/pg-core"
import { sql } from "drizzle-orm"
import { user } from "./user"

export const card = pgTable(
    "card",
    {
        id: varchar("id", { length: 20 })
            .primaryKey()
            .references(() => user.id, { onDelete: "cascade" }),
        background: text("background"),
        overlay: integer("overlay"),
        name: integer("name"),
        username: integer("username"),
        progressbar_fill: integer("progressbar_fill"),
        progressbar_empty: integer("progressbar_empty"),
        statistics_text: integer("statistics_text"),
        statistics_value: integer("statistics_value")
    },
    (table) => [
        check("overlay_check", sql`${table.overlay} between 0 and 100`),
        check("name_check", sql`${table.name} between 0 and 16777215`),
        check("username_check", sql`${table.username} between 0 and 16777215`),
        check("progressbar_fill_check", sql`${table.progressbar_fill} between 0 and 16777215`),
        check("progressbar_empty_check", sql`${table.progressbar_empty} between 0 and 16777215`),
        check("statistics_text_check", sql`${table.statistics_text} between 0 and 16777215`),
        check("statistics_value_check", sql`${table.statistics_value} between 0 and 16777215`)
    ]
)
