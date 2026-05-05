import { ButtonStyle, ComponentType, Guild, SendableChannels } from "discord.js"
import { isSendable } from "../../function"

export default async function CreateMessage(guild: Guild) {
    const channel = guild.systemChannel
    if (isSendable(channel)) return SendMessage(guild, channel)

    const channels = await guild.channels.fetch()
    for (const channel of channels.values()) {
        if (isSendable(channel)) return SendMessage(guild, channel)
    }
}

async function SendMessage(guild: Guild, channel: SendableChannels) {
    await channel.send({
        content: "Oh no... this is a custom bot made only for xcfio server",
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Want to use this type of bot? Invite xcf now",
                        url: "https://discord.com/oauth2/authorize?client_id=1211535069492154398",
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        emoji: {
                            id: "1228671731112214558"
                        }
                    }
                ]
            }
        ]
    })

    await guild.leave()
}
