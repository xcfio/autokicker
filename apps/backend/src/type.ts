/* eslint-disable @typescript-eslint/naming-convention */

import { Payload } from "@repo/schema"
import { OAuth2Namespace } from "@fastify/oauth2"
import { fastify, io } from "./"

declare module "fastify" {
    interface FastifyInstance {
        io: SocketIO
        discord: OAuth2Namespace
        authentication: (request: FastifyRequest, reply: FastifyReply) => void
    }
    interface FastifyRequest {
        payload: Payload
    }
}

declare global {
    type Fastify = typeof fastify
    type SocketIO = typeof io

    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

export type Env = {
    NODE_ENV: "development" | "production" | "test"
    DATABASE_URL: string
    FRONTEND_URL: string
    DISCORD_URL: string
    PORT: string

    CLIENT_ID: string
    CLIENT_SECRET: string
    CLIENT_TOKEN: string
    ERROR_LOG_CHANNEL: string

    COOKIE_SECRET: string
    JWT_SECRET: string
    HMAC_SECRET: string

    IO_USERNAME: string
    IO_PASSWORD: string
}
