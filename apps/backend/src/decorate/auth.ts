import { FastifyRequest, FastifyReply } from "fastify"
import { CreateError, isFastifyError } from "fastify-utils"
import { Payload } from "@repo/schema"
import Value from "typebox/value"

export default function authentication(fastify: Fastify) {
    fastify.decorate("authentication", async function (request: FastifyRequest, reply: FastifyReply) {
        try {
            const user = await request.jwtVerify()

            if (!Value.Check(Payload, user)) {
                reply.clearCookie("auth", { path: "/", signed: true, sameSite: "strict" })
                throw CreateError(401, "INVALID_TOKEN_PAYLOAD", "Invalid authentication token structure")
            }

            request.payload = user
        } catch (error) {
            if (isFastifyError(error) || Error.isError(error)) {
                reply.clearCookie("auth", { path: "/", signed: true, sameSite: "strict" })
                throw CreateError(401, "AUTHENTICATION_FAILED", "Authentication failed")
            } else {
                console.trace(error)
                reply.clearCookie("auth", { path: "/", signed: true, sameSite: "strict" })
                throw CreateError(500, "INTERNAL_SERVER_ERROR", "Internal Server Error")
            }
        }
    })
}
