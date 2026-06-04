import { FastifyInstance } from "fastify"
import Cors from "@fastify/cors"

export default async function cors(fastify: FastifyInstance) {
    await fastify.register(Cors, {
        credentials: true,
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        origin: (origin, cb) => cb(null, true)
    })
}
