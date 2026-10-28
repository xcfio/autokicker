import { FastifyRequest, FastifyReply } from "fastify"
import { errors, isValidRFC9457Json } from "fastify-utils"
import { Payload } from "@repo/schema"
import { Value } from "typebox/value"

export default function authentication(fastify: Fastify) {
    fastify.decorate("authentication", async function (request: FastifyRequest, reply: FastifyReply) {
        let payload: unknown
        try {
            payload = await request.jwtVerify()
        } catch (error) {
            reply.clearCookie("auth", { path: "/", signed: true, sameSite: "strict" })
            if (isValidRFC9457Json(error)) {
                throw error
            }
            if (Error.isError(error)) {
                throw errors.client.authentication("Authentication failed")
            }
            console.trace(error)
            throw errors.server.internal("Internal Server Error")
        }

        if (!Value.Check(Payload, payload)) {
            reply.clearCookie("auth", { path: "/", signed: true, sameSite: "strict" })
            throw errors.client.authentication("Invalid authentication token structure")
        }

        request.payload = payload
    })
}
