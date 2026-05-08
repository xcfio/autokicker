import {
    ComponentType,
    DiscordAPIError,
    InteractionReplyOptions,
    MessageCreateOptions,
    MessageFlags,
    RepliableInteraction
} from "discord.js"
import { isSendable } from "./logic"

const ignore = new Set([10008, 10062, 50027])

export function ex(error: any) {
    console.log(error)
}

export async function cx(interaction: RepliableInteraction, error?: Error) {
    if (interaction.replied) return
    const msg: InteractionReplyOptions & MessageCreateOptions = {
        flags: [MessageFlags.IsComponentsV2],
        components: [
            {
                type: ComponentType.Container,
                components: [
                    {
                        type: ComponentType.TextDisplay,
                        content: "# An unknown error occurred."
                    },
                    {
                        type: ComponentType.TextDisplay,
                        content: "An unknown error happened. Run `/bug` to report this issue"
                    }
                ]
            }
        ]
    }

    try {
        if (error instanceof DiscordAPIError && ignore.has(Number(error.code))) {
            if (isSendable(interaction.channel)) return await interaction.channel.send(msg)
        } else {
            msg.flags = [...(msg.flags as Array<InteractionReplyOptions["flags"]>), MessageFlags.Ephemeral] as any
            return await (interaction.deferred ? interaction.followUp(msg) : interaction.reply(msg))
        }
    } catch (error) {
        ex(error)
        if (isSendable(interaction.channel)) return await interaction.channel.send(msg)
    }
}
