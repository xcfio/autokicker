import { Client } from "discord.js"
import { command } from "./command"
import { status } from "./status"
import { create } from "./create"
import { canvacord } from "./canvacord"
import { CommandImport } from "./import"

export default async function run(client: Client<true>) {
    console.log(`${client.user.tag} is online`)
    await CommandImport(client)
    await canvacord(client)
    await command(client)
    await status(client)
    await create(client)
}
