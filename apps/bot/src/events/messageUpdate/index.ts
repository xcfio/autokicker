import { Message, PartialMessage } from "discord.js"
import { append } from "../../function"

type msg = Message | PartialMessage
export default async function msg_update_log(oldmessage: msg, newmessage: msg) {
    if (newmessage.author?.bot) return

    const row = {
        message: {
            id: newmessage.id,
            content: {
                old: oldmessage.content,
                new: newmessage.content
            }
        },
        user: {
            id: newmessage.author?.id,
            username: newmessage.author?.username
        },
        channel: {
            id: newmessage.channelId,
            name: "name" in newmessage.channel ? newmessage.channel.name : null
        }
    }

    append("msg-edit", row)
}
