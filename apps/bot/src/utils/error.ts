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

export function erx(error: Error) {
    console.log(error)
}

export async function xcf(interaction: RepliableInteraction, error?: Error) {
    if (interaction.replied) return
    const msg: InteractionReplyOptions & MessageCreateOptions = {
        flags: [MessageFlags.IsComponentsV2],
        components: [
            {
                type: ComponentType.Container,
                components: [
                    {
                        type: ComponentType.TextDisplay,
                        content: "# ❌ Something went wrong"
                    },
                    {
                        type: ComponentType.TextDisplay,
                        content:
                            "An unexpected error occurred while processing your request. Please use the `/bug` command to report this issue to our developers."
                    }
                ]
            }
        ]
    }

    try {
        if (error instanceof DiscordAPIError && ignore.has(Number(error.code))) {
            if (isSendable(interaction.channel)) return await interaction.channel.send(msg)
        } else {
            // oxlint-disable-next-line typescript/no-unsafe-assignment
            msg.flags = [...(msg.flags as Array<InteractionReplyOptions["flags"]>), MessageFlags.Ephemeral] as any
            return await (interaction.deferred ? interaction.followUp(msg) : interaction.reply(msg))
        }
    } catch (error) {
        erx(error as Error)
        if (isSendable(interaction.channel)) return interaction.channel.send(msg)
    }
}
