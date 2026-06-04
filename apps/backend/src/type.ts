/* eslint-disable @typescript-eslint/naming-convention */
import { AuthenticatedSocket, Payload } from "@repo/schema"
import { OAuth2Namespace } from "@fastify/oauth2"

declare global {
    namespace NodeJS {
        interface ProcessEnv {
            NODE_ENV: "development" | "production" | "test"
            PORT: string

            TOKEN: string
            ERROR_LOG_CHANNEL: string

            COOKIE_SECRET: string
            JWT_SECRET: string
            HMAC_SECRET: string

            GOOGLE_CLIENT_ID: string
            GOOGLE_CLIENT_SECRET: string

            FACEBOOK_CLIENT_ID: string
            FACEBOOK_CLIENT_SECRET: string
        }
    }
}

declare module "fastify" {
    interface FastifyInstance {
        googleOAuth2: OAuth2Namespace
        facebookOAuth2: OAuth2Namespace
        authentication: (request: FastifyRequest, reply: FastifyReply) => void
        io: AuthenticatedSocket
    }
    interface FastifyRequest {
        payload: Payload
    }
}

export class FrontendError extends Error {
    constructor({ name, message, stack, cause }: { name: string; message: string; stack?: string; cause?: unknown }) {
        super()
        this.name = name
        this.message = message
        this.stack = stack
        this.cause = cause
    }

    toJSON() {
        const stack = this.stack?.split("\n") ?? []
        if (stack.length > 20) stack.length = 20
        return {
            name: this.name,
            messages: this.message,
            stack: stack,
            cause: this.cause
        }
    }
}
