import { ChatInputCommandInteraction, RESTPostAPIChatInputApplicationCommandsJSONBody } from "discord.js"
import { uptime } from "coolcake"
import { ex, cx } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "test",
    description: "Test bot status"
}

export async function run(interaction: ChatInputCommandInteraction) {
    try {
        await interaction.deferReply()
        const ping = (await interaction.fetchReply())?.createdTimestamp - interaction.createdTimestamp

        await interaction.followUp({
            content: `Client: ${ping}ms\nWebsocket: ${interaction.client.ws.ping}ms\nUptime: ${uptime(true)}\n`
        })
    } catch (error: any) {
        ex(error)
        cx(interaction)
    }
}
