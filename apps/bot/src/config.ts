import { env } from "@repo/utils"
import { Env } from "./type"

const config = {
    environment: env<Env, "NODE_ENV">("NODE_ENV"),
    url: env<Env>("DATABASE_URL"),
    origin: env<Env>("FRONTEND_URL", false) ?? "http://localhost:7700",
    api: env<Env>("API_URL", false) ?? "http://localhost:7200",
    port: Number(env<Env>("PORT", false) ?? 7000),

    secret: env<Env>("SECRET"),
    token: env<Env>("TOKEN")
}

export default config
