import { FastifyInstance } from "fastify"
import Swagger from "@fastify/swagger"

export default async function swagger(fastify: FastifyInstance) {
    await fastify.register(Swagger, {
        hideUntagged: true,
        openapi: {
            openapi: "3.1.1",
            info: {
                title: "API Documentation",
                version: "0.0.1"
            }
        }
    })
}
