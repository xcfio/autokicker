import { Type, Static } from "typebox"
import { Snowflake } from "./utility"

export type Payload = Static<typeof Payload>
export const Payload = Type.Object({
    id: Snowflake,
    iat: Type.Number(),
    exp: Type.Number()
})

export type ErrorSchema = Static<typeof ErrorSchema>
export const ErrorSchema = Type.Object({
    statusCode: Type.Integer({ description: "HTTP status code of the error" }),
    code: Type.String({ description: "Application-specific error code" }),
    error: Type.String({ description: "Error type or category" }),
    message: Type.String({ description: "Human-readable error message" })
})

export function ErrorResponse(statusCode: number, description?: string) {
    return Type.Object(
        {
            statusCode: Type.Literal(statusCode, { description: "HTTP status code of the error" }),
            code: Type.String({ description: "Application-specific error code" }),
            error: Type.String({ description: "Error type or category" }),
            message: Type.String({ description: "Human-readable error message" })
        },
        {
            $id: "ErrorResponse",
            description: description ?? "Standard error response format for API endpoints"
        }
    )
}
