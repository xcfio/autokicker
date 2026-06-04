import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"
import config from "../config"

export const db = drizzle({ client: postgres(config.dbUrl) })
