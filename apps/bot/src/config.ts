import { env } from "@repo/utils"
import { Env } from "./type"

const config = {
    environment: env<Env, "NODE_ENV">("NODE_ENV"),
    dbUrl: env<Env>("DATABASE_URL"),
    frontend: env<Env>("FRONTEND_URL"),

    secret: env<Env>("SECRET"),
    token: env<Env>("TOKEN")
}

export default config
