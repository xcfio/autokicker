import { FastifyInstance } from "fastify"
import Cookie from "@fastify/cookie"
import config from "../config"

export default async function cookie(fastify: FastifyInstance) {
    await fastify.register(Cookie, { secret: config.secret.cookie })
}
