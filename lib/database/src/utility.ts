import { PgColumn, timestamp, varchar } from "drizzle-orm/pg-core"

export const DateAndTime = () => ({
    createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
        .notNull()
        .$defaultFn(() => Temporal.Now.instant().toString()),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
        .notNull()
        .$onUpdateFn(() => Temporal.Now.instant().toString())
})
