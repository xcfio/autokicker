import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

const uri = process.env.DATABASE_URI
if (!uri) throw new Error("DATABASE_URI environment variable is not set")

export const db = drizzle({ client: postgres(uri) })
