import { Snowflake, UUID } from "../types"
import { Type } from "typebox"

export const ActivityType = Type.Union(
    [Type.Literal("message"), Type.Literal("voice"), Type.Literal("reaction"), Type.Literal("seed")],
    { description: "Type of activity that was last recorded" }
)

export const Activity = Type.Object({
    id: UUID,
    guildId: Snowflake,
    userId: Snowflake,
    lastActiveAt: Type.String({
        format: "date-time",
        description: "Timestamp of last recorded activity",
        examples: [Temporal.Now.instant().toString()]
    }),
    lastAction: ActivityType,
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

export const PublicActivity = Type.Pick(Activity, ["id", "guildId", "userId", "lastActiveAt", "lastAction"])
