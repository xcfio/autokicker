import { CronJob } from "../../utils"
import { schedule } from "node-cron"
import { Client } from "discord.js"
import { command } from "./command"
import { status } from "./status"
import { seed } from "./seed"

export default async function ready(client: Client<true>) {
    console.log(`${client.user.tag} is online`)
    schedule("0 * * * *", CronJob)
    await command(client)
    await status(client)
    await seed(client)
}
