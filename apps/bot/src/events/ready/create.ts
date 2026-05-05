import { Client } from "discord.js"
import { db, table } from "../../database"

export async function create(client: Client<true>) {
    try {
        for (const [id] of client.users.cache) {
            await db.insert(table.user).values({ id }).onConflictDoNothing()
        }
    } catch (error) {
        console.log(error)
    }
}
