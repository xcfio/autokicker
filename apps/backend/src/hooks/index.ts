import error from "./error"

export default async function Hooks(fastify: Fastify) {
    await error(fastify)
}
