import { FastifyInstance } from "fastify"
import fastifyIO from "fastify-socket"
import config from "../config"

export default async function socket(fastify: FastifyInstance) {
    await fastify.register(fastifyIO, { cookie: true, cors: { origin: config.origin, credentials: true } })
}
