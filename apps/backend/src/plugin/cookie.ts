import Cookie from "@fastify/cookie"
import config from "../config"

export default async function cookie(fastify: Fastify) {
    await fastify.register(Cookie, { secret: config.secret.cookie })
}
