import { FastifyInstance } from "fastify"
import JWT from "@fastify/jwt"
import config from "../config"

export default async function jwt(fastify: FastifyInstance) {
    await fastify.register(JWT, { cookie: { cookieName: "auth", signed: true }, secret: config.secret.jwt })
}
