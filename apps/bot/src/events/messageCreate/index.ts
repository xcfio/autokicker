import { Message, OmitPartialGroupDMChannel } from "discord.js"
import { automod } from "./automod"
import { crosspost } from "./crosspost"
import { level } from "./level"
import { msg_create_log as log } from "./log"

export default async function MessageCreate(message: OmitPartialGroupDMChannel<Message>) {
    automod(message)
    crosspost(message)
    level(message)
    log(message)
}
