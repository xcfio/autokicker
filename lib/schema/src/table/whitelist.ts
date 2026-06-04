import { Snowflake, UUID } from "../types"
import { Type } from "typebox"

export const WhitelistType = Type.Union([Type.Literal("user"), Type.Literal("role"), Type.Literal("channel")], {
    description: "Type of entity being whitelisted"
})

export const Whitelist = Type.Object({
    id: UUID,
    guildId: Snowflake,
    whitelistType: WhitelistType,
    whitelistId: Snowflake,
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

export const PublicWhitelist = Type.Pick(Whitelist, ["id", "guildId", "whitelistType", "whitelistId"])
