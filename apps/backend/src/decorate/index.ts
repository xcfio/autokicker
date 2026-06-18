import authentication from "./auth"

export default function Decorate(fastify: Fastify) {
    authentication(fastify)
}
