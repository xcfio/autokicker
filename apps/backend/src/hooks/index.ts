import { FastifyInstance } from "fastify"
import error from "./error"

export default async function Hooks(fastify: FastifyInstance) {
    await error(fastify)
}
