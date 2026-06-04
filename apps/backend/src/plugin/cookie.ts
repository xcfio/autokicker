import { FastifyInstance } from "fastify"
import Cookie from "@fastify/cookie"

export default async function cookie(fastify: FastifyInstance) {
    await fastify.register(Cookie, { secret: process.env.COOKIE_SECRET })
}
