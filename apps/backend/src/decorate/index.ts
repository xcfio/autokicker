import authentication from "./auth"

export default async function Decorate(fastify: Fastify) {
    await authentication(fastify)
}
