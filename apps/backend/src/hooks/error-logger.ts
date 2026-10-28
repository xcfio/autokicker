export default function error_logger(fastify: Fastify) {
    fastify.addHook("onError", (_, __, _error) => {
        // TODO: add logger
    })
}
