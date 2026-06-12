import Auth from "@fastify/auth"

export default async function auth(fastify: Fastify) {
    await fastify.register(Auth)
}
