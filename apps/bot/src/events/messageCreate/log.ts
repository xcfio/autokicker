import { Message, OmitPartialGroupDMChannel } from "discord.js"
import { append } from "../../function"

export function msg_create_log(message: OmitPartialGroupDMChannel<Message>) {
    if (message.author.bot) return

    const row = {
        message: {
            id: message.id,
            content: message.content
        },
        user: {
            id: message.author.id,
            username: message.author.username
        },
        channel: {
            id: message.channelId,
            name: "name" in message.channel ? message.channel.name : null
        }
    }

    append("msg-create", row)
}
