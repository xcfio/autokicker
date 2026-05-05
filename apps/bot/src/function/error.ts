import { APIEmbed, ChannelType, DiscordAPIError, MessageFlags, RepliableInteraction, WebhookClient } from "discord.js"
import { inspect } from "node:util"
import { append } from "./append"
import { client } from "../index"
import { embed } from "./embed"
import { isSendable } from "./logic"
import config from "../config"

export function Errors(error: NonNullable<Error>, type = "Uncaught Exception", origin?: any) {
    if (error instanceof DiscordAPIError) {
        console.log(inspect({ ...error.rawError, ...error.requestBody }, { depth: 10, colors: true }))
        console.log(error.stack)

        append("api-error", { ...error.rawError, stack: error.stack ? error.stack.split("    ") : null })
        let text

        // prettier-ignore
        for (let depth = 10; !text || text.length > 4096; depth--) {
            if (depth > 0) {
                text = `\`\`\`js\n${inspect(error.rawError, false, 10)}\n${inspect(error.requestBody, false, depth)}`.concat(`\n\`\`\``)
                text = text + "```js\n" + (error.stack ?? "null") + "\n```"
            } else {
                text = "Error is too large to send"
            }
        }

        reply({ title: `Discord API Error (${error.code})`, description: text, timestamp: new Date().toISOString() })
    } else {
        console.trace(error, origin)
        append("error", { message: error.message, stack: error.stack ? error.stack.split("    ") : null })
        reply({ title: type, description: "```js\n" + error.stack + "\n```", timestamp: new Date().toISOString() })
    }
}

async function reply(embeds: APIEmbed) {
    if (client.isReady()) {
        const channel = client.channels.cache.get(config.channel.error)
        if (channel && channel.type === ChannelType.GuildText) {
            try {
                return await channel.send({ embeds: embed(embeds) })
            } catch (error) {
                return console.log(error)
            }
        }
    }

    const webhook = new WebhookClient({ url: config.url })
    try {
        return await webhook.send({ embeds: embed(embeds) })
    } catch (error) {
        return console.log(error)
    }
}

const ignore = new Set([10008, 10062, 50027])
export async function xcf(interaction: RepliableInteraction, error?: Error) {
    const msg: any = {
        embeds: embed("500 - An unknown error happened. Run `/bug` to report this issue"),
        flags: MessageFlags.Ephemeral
    }
    if (interaction.replied) return

    try {
        if (error instanceof DiscordAPIError && ignore.has(Number(error.code))) {
            msg.flags = undefined
            if (isSendable(interaction.channel)) return await interaction.channel.send(msg)
        } else {
            return await (interaction.deferred ? interaction.followUp(msg) : interaction.reply(msg))
        }
    } catch (error) {
        Errors(error as Error)
        msg.flags = undefined
        if (isSendable(interaction.channel)) return await interaction.channel.send(msg)
    }
}
