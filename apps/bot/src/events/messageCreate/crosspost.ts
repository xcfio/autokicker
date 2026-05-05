import { Message } from "discord.js"

export function crosspost(message: Message) {
    if (message.crosspostable) message.crosspost()
    if (message.author.id !== "282286160494067712") return
    if (message.content.includes("SoftwareX Plus")) message.reply("<@&1029626581250998333>")
    if (message.content.includes("Floating Sandbox")) message.reply("<@&1075730730161807370>")
    if (message.content.includes("Vehicle Simulator")) message.reply("<@&1142383840581660682>")
}
