import { Nullable, Snowflake } from "../types"
import { Type } from "typebox"

export const User = Type.Object({
    id: Snowflake,
    email: Nullable(
        Type.String({
            format: "email",
            pattern: "^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$",
            description: "Unique email address",
            examples: ["cool@xcfio.com"]
        })
    ),
    consent: Type.Boolean({ default: true }),
    accessToken: Nullable(
        Type.String({
            description: "OAuth access token",
            examples: [null]
        })
    ),
    refreshToken: Nullable(
        Type.String({
            description: "OAuth refresh token",
            examples: [null]
        })
    ),
    expireAt: Nullable(
        Type.String({
            format: "date-time",
            description: "OAuth token expiry",
            examples: [null]
        })
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

export const AuthenticatedUser = Type.Pick(User, ["id", "email", "consent"])
export const PublicUser = Type.Pick(User, ["id"])
