import { Client } from "discord.js"
import { command } from "./command"
import { status } from "./status"
import { create } from "./create"

export default async function ready(client: Client<true>) {
    console.log(`${client.user.tag} is online`)
    await command(client)
    await status(client)
    await create(client)
}
