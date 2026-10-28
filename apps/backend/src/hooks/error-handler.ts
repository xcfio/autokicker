import { errors, isHttpError } from "fastify-utils"
import { FastifyError } from "@fastify/error"

export default function error_handler(fastify: Fastify) {
    fastify.setErrorHandler((error, request, reply) => {
        if (isHttpError(error)) {
            return reply.status(error.status).send(error.toJSON())
        }

        if (error instanceof FastifyError) {
            return reply
                .status(error.statusCode ?? 500)
                .send(errors.byStatus(error.statusCode ?? 500, error.message).toJSON())
        }

        const internalError = errors.server.internal(error)
        request.log.error(internalError)
        return reply.status(500).send(internalError.toJSON())
    })
}
