import { DiscordAPIError, MessageFlags, RepliableInteraction } from "discord.js"
import { isSendable } from "./logic"

const ignore = new Set([10008, 10062, 50027])

export function ex(error: any) {
    console.log(error)
}

export async function cx(interaction: RepliableInteraction, error?: Error) {
    const msg: any = {
        content: "500 - An unknown error happened. Run `/bug` to report this issue",
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
        ex(error)
        msg.flags = undefined
        if (isSendable(interaction.channel)) return await interaction.channel.send(msg)
    }
}
