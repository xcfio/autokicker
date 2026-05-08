import { TSchema, TSchemaOptions, Type } from "typebox"
// @ts-ignore
import { randomUUIDv7 } from "node:crypto"

export const Nullable = <T extends TSchema>(schema: T, options?: TSchemaOptions) => {
    return Type.Union([Type.Null(), schema], options)
}

export const UUID = Type.String({
    examples: [randomUUIDv7()],
    pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
})

export const Date = Type.String({ format: "date-time" })
