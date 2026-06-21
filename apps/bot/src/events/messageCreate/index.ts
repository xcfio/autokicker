import { trackActivity } from "../../utils"
import { Message } from "discord.js"

export default async function messageCreate(message: Message) {
    if (message.author.bot || !message.guild) return
    await trackActivity(message.guild.id, message.author.id, "message")
}
