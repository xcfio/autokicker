import { AnyThreadChannel } from "discord.js"
import { suggestion } from "./suggestion"
import { help } from "./help"

export default async function threadCreate(thread: AnyThreadChannel, newly_created_status: boolean) {
    help(thread, newly_created_status)
    suggestion(thread, newly_created_status)
}
