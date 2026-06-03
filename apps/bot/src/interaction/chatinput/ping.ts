import {
    ChatInputCommandInteraction,
    ComponentType,
    MessageFlags,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { erx, xcf } from "../../utils"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "ping",
    description: "Get the bot's latency and uptime."
}

export async function run(interaction: ChatInputCommandInteraction) {
    try {
        await interaction.deferReply()
        const ping = (await interaction.fetchReply())?.createdTimestamp - interaction.createdTimestamp

        await interaction.followUp({
            flags: MessageFlags.IsComponentsV2,
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `Client: ${ping}ms\nWebsocket: ${interaction.client.ws.ping}ms`
                        }
                    ]
                }
            ]
        })
    } catch (error: any) {
        erx(error)
        xcf(interaction)
    }
}
