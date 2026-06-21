// oxlint-disable
import { TSchema, TSchemaOptions, Type } from "typebox"
// @ts-ignore - Type is not available yet
import { randomUUIDv7 } from "node:crypto"

const num = "\\d+(?:[.,]\\d+)?"

const ISO8601DurationPattern =
    `^P(?!$)` +
    `(?:${num}Y)?` +
    `(?:${num}M)?` +
    `(?:${num}W)?` +
    `(?:${num}D)?` +
    `(?:T(?=\\d)` +
    `(?:${num}H)?` +
    `(?:${num}M)?` +
    `(?:${num}S)?` +
    `)?$`

export const ISO8601Duration = Type.String({
    pattern: ISO8601DurationPattern,
    title: "ISO 8601 Duration",
    description: "e.g. P3Y6M4DT12H30M5S",
    examples: ["P7Y2M4DT15H45M30S", "P2Y2M10DT2H30M"]
})

export const Nullable = <T extends TSchema>(schema: T, options?: TSchemaOptions) => {
    return Type.Union([Type.Null(), schema], options)
}

export const Snowflake = Type.String({
    examples: ["1477127592724140195"],
    pattern: "^[0-9]{17,19}$",
    minLength: 17,
    maxLength: 19
})

export const UUID = Type.String({
    examples: [randomUUIDv7()],
    pattern: "^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$"
})
