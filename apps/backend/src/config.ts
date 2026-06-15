import { env } from "@repo/utils"
import { Env } from "./type"

const config = {
    environment: env<Env, "NODE_ENV">("NODE_ENV"),
    url: env<Env>("DATABASE_URL"),
    origin: env<Env>("FRONTEND_URL", false) ?? "http://localhost:7700",
    port: env<Env>("PORT"),
    discord: {
        id: env<Env>("CLIENT_ID"),
        secret: env<Env>("CLIENT_SECRET"),
        token: env<Env>("CLIENT_TOKEN"),
        error_log: env<Env>("ERROR_LOG_CHANNEL")
    },
    secret: {
        cookie: env<Env>("COOKIE_SECRET"),
        jwt: env<Env>("JWT_SECRET"),
        hmac: env<Env>("HMAC_SECRET")
    },
    io: {
        username: env<Env>("IO_USERNAME"),
        password: env<Env>("IO_PASSWORD")
    }
} as const

export default config
