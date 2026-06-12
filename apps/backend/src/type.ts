import {
    FastifyInstance,
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    FastifyBaseLogger
} from "fastify"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { AuthenticatedSocket, Payload } from "@repo/schema"
import { OAuth2Namespace } from "@fastify/oauth2"

declare module "fastify" {
    interface FastifyInstance {
        discord: OAuth2Namespace
        authentication: (request: FastifyRequest, reply: FastifyReply) => void
        io: AuthenticatedSocket
    }
    interface FastifyRequest {
        payload: Payload
    }
}

declare global {
    type Fastify = FastifyInstance<
        RawServerDefault,
        RawRequestDefaultExpression,
        RawReplyDefaultExpression,
        FastifyBaseLogger,
        TypeBoxTypeProvider
    >

    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

export type Env = {
    NODE_ENV: "development" | "production" | "test"
    DATABASE_URL: string
    FRONTEND_URL: string
    PORT: string

    CLIENT_ID: string
    CLIENT_SECRET: string
    CLIENT_TOKEN: string
    ERROR_LOG_CHANNEL: string

    COOKIE_SECRET: string
    JWT_SECRET: string
    HMAC_SECRET: string
}
