import { Type, Static } from "typebox"
import { UUID } from "./utility"

export type Payload = Static<typeof Payload>
export const Payload = Type.Object({
    id: UUID,
    iat: Type.Number(),
    exp: Type.Number()
})

export const ErrorSchema = Type.Object({
    statusCode: Type.Integer({ description: "HTTP status code of the error" }),
    error: Type.String({ description: "Error type or category" }),
    message: Type.String({ description: "Human-readable error message" })
})
