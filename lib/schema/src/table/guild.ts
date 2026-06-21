import { Nullable, Snowflake } from "../types"
import { Type } from "typebox"

export const ActionType = Type.Union([Type.Literal("kick"), Type.Literal("ban")], {
    description: "Action to perform on inactive members"
})

export const Guild = Type.Object({
    id: Snowflake,
    enabled: Type.Boolean({
        default: false,
        description: "Whether autokicker is enabled for this guild"
    }),
    threshold: Type.Integer({
        default: Temporal.Duration.from({ days: 30 }).total("minutes"),
        description: "Inactivity threshold in minutes",
        examples: [Temporal.Duration.from({ days: 30 }).total("minutes")],
        minimum: Temporal.Duration.from({ minutes: 1 }).total("minutes"),
        maximum: Temporal.Duration.from({ years: 1 }).total({
            unit: "minutes",
            relativeTo: Temporal.Now.plainDateISO()
        })
    }),
    action: ActionType,
    log: Type.Array(Snowflake, {
        default: [],
        description: "Channel IDs to send log messages to",
        minItems: 0,
        maxItems: 3
    }),
    message: Nullable(
        Type.String({
            description: "Custom message sent to kicked members",
            examples: [null],
            minLength: 1,
            maxLength: 2000
        })
    ),
    stages: Type.Array(
        Type.Integer({
            description: "Minutes before threshold to send warning",
            minimum: Temporal.Duration.from({ minutes: 1 }).total("minutes"),
            maximum: Temporal.Duration.from({ years: 1 }).total({
                unit: "minutes",
                relativeTo: Temporal.Now.plainDateISO()
            }),
            examples: [
                Temporal.Duration.from({ days: 7 }).total("minutes"),
                Temporal.Duration.from({ days: 1 }).total("minutes")
            ]
        }),
        {
            default: [],
            description: "Warning stage intervals in minutes",
            examples: [
                [
                    Temporal.Duration.from({ days: 7 }).total("minutes"),
                    Temporal.Duration.from({ days: 1 }).total("minutes")
                ]
            ],
            minItems: 0,
            maxItems: 10
        }
    ),
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

export const PublicGuild = Type.Pick(Guild, ["id", "enabled", "threshold", "action"])
