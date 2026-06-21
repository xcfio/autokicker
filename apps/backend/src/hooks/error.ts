import { isFastifyError, CreateError } from "fastify-utils"

export default function error(fastify: Fastify) {
    fastify.addHook("onError", (_, __, error) => {
        if (isFastifyError(error)) {
            throw error
        } else {
            console.trace(error)
            throw CreateError(500, "INTERNAL_SERVER_ERROR", "Internal Server Error")
        }
    })
}
