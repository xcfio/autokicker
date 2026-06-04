import { FastifyInstance } from "fastify"
import fastifyIO from "fastify-socket"

export default async function socket(fastify: FastifyInstance) {
    await fastify.register(fastifyIO, {
        cookie: true,
        cors: {
            origin: process.env.FRONTEND_URL || "http://localhost:7700",
            credentials: true
        }
    })
}
