import { FastifyInstance } from "fastify"
import authentication from "./auth"

export default async function Decorate(fastify: FastifyInstance) {
    await authentication(fastify)
}
