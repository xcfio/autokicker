import fastifyIO from "fastify-socket"
import config from "../config"

export default async function socket(fastify: Fastify) {
    await fastify.register(fastifyIO, { cookie: true, cors: { origin: config.origin, credentials: true } })
}
