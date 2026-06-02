import { Message } from "discord.js"
import { trackActivity } from "../../function/tracker"

export default async function messageCreate(message: Message) {
    if (message.author.bot || !message.guild) return
    await trackActivity(message.guild.id, message.author.id, "message")
}
