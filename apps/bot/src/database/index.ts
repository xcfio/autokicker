import { drizzle } from "drizzle-orm/postgres-js"
import config from "../config"
import postgres from "postgres"

export const db = drizzle({ client: postgres(config.uri) })

export const table = {} as const
