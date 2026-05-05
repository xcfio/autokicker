import { drizzle } from "drizzle-orm/postgres-js"
import { settings } from "./settings"
import { level } from "./level"
import { card } from "./card"
import { code } from "./code"
import { user } from "./user"
import config from "../config"
import postgres from "postgres"

export const db = drizzle({ client: postgres(config.uri) })

export const table = {
    card,
    code,
    level,
    settings,
    user
} as const
