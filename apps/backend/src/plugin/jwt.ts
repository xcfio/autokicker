import { FastifyInstance } from "fastify"
import JTW from "@fastify/jwt"

export default async function jwt(fastify: FastifyInstance) {
    await fastify.register(JTW, { cookie: { cookieName: "auth", signed: true }, secret: process.env.COOKIE_SECRET })
}
