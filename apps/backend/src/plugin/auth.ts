import { FastifyInstance } from "fastify"
import Auth from "@fastify/auth"

export default async function auth(fastify: FastifyInstance) {
    await fastify.register(Auth)
}
