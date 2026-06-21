import { Snowflake, UUID } from "../types"
import { Type } from "typebox"

export const Warning = Type.Object({
    id: UUID,
    guildId: Snowflake,
    userId: Snowflake,
    before: Type.Integer({
        description: "Minutes before threshold this warning was sent",
        minimum: Temporal.Duration.from({ minutes: 1 }).total("minutes"),
        maximum: Temporal.Duration.from({ years: 1 }).total({
            unit: "minutes",
            relativeTo: Temporal.Now.plainDateISO()
        }),
        examples: [Temporal.Duration.from({ days: 7 }).total("minutes")]
    }),
    sentAt: Type.String({
        format: "date-time",
        description: "Timestamp when warning was sent",
        examples: [Temporal.Now.instant().toString()]
    }),
    createdAt: Type.String({
        format: "date-time",
        description: "Record creation timestamp",
        examples: [Temporal.Now.instant().toString()]
    }),
    updatedAt: Type.String({
        format: "date-time",
        description: "Last update timestamp",
        examples: [Temporal.Now.instant().toString()]
    })
})

export const PublicWarning = Type.Pick(Warning, ["id", "guildId", "userId", "before", "sentAt"])
