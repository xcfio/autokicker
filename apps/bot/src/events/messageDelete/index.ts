import { Message, OmitPartialGroupDMChannel, PartialMessage } from "discord.js"
import { append } from "../../function"

export default async function msg_delete_log(message: OmitPartialGroupDMChannel<Message | PartialMessage>) {
    if (message.author?.bot || !message.content) return

    const row = {
        message: {
            id: message.id,
            content: message.content
        },
        user: {
            id: message.author?.id,
            username: message.author?.username
        },
        channel: {
            id: message.channelId,
            name: "name" in message.channel ? message.channel.name : null
        }
    }

    append("msg-delete", row)
}
