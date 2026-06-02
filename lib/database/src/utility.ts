import { PgColumn, timestamp, varchar } from "drizzle-orm/pg-core"

export const Snowflake = (name: string, pc = true, req = true, unq = true, ref?: PgColumn) => {
    let vc = varchar(name, { length: 20 })
    if (pc) vc = vc.primaryKey()
    if (req) vc = vc.notNull()
    if (unq) vc = vc.unique()
    if (ref) vc = vc.references(() => ref)
    return vc
}

export const DateAndTime = () => ({
    createdAt: timestamp("created_at", { mode: "string", withTimezone: false })
        .notNull()
        .$defaultFn(() => Temporal.Now.instant().toString()),
    updatedAt: timestamp("updated_at", { mode: "string", withTimezone: false })
        .notNull()
        .$onUpdateFn(() => Temporal.Now.instant().toString())
})
