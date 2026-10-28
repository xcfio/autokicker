import error_handler from "./error-handler"
import error_logger from "./error-logger"

export default function Hooks(fastify: Fastify) {
    error_handler(fastify)
    error_logger(fastify)
}
