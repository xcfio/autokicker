import {
    ApplicationCommandOptionType,
    ChannelType,
    ChatInputCommandInteraction,
    InteractionContextType,
    MessageCreateOptions,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import config from "../../config"
import { embed, Errors, isSendable, xcf } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "bug",
    description: "Report a bug",
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "context",
            description: "Information about the bug",
            type: ApplicationCommandOptionType.String,
            min_length: 10,
            required: true
        },
        {
            name: "file",
            description: "Screenshot/Video of bug",
            type: ApplicationCommandOptionType.Attachment,
            required: false
        }
    ]
}

const embeds = (text: string) => ({ embeds: embed(text) })
const type = ["image/jpeg", "image/png", "video/mp4", "video/webm", "video/mpeg"]
export async function run(interaction: ChatInputCommandInteraction) {
    try {
        await interaction.deferReply()
        const file = interaction.options.getAttachment("file")

        const reply = embeds("Successfully received your bug request. We will fix it as soon as possible.")
        const msg: MessageCreateOptions = {
            embeds: embed({
                description:
                    `**Bug:** ${interaction.options.getString("context", true)}\n\n` +
                    `**User:** <@${interaction.user.id}> (${interaction.user.id})\n` +
                    `**Guild:** ${interaction.guild?.name ?? "DM"} (${interaction.guild?.id ?? "N/A"})\n`,
                timestamp: new Date().toISOString()
            })
        }

        const channel = interaction.client.channels.cache.get(config.channel.log)
        if (!channel || channel.type !== ChannelType.GuildText) return xcf(interaction)

        if (file) {
            // prettier-ignore
            if (!file.contentType || !type.includes(file.contentType)) return interaction.followUp({ content: `400 - Unknown file type: ${file.contentType}. We only accept ${type.map((text) => `\`${text}\``).join(", ")} file types.` })
            file.name = `${Date.now().toString(36)}.${file.name.split(".").pop() ?? "bug"}`
            msg.files = [file]
        }

        await channel.send(msg)
        await interaction.followUp(reply)
    } catch (error: any) {
        try {
            Errors(error)
            if (isSendable(interaction.channel)) {
                const reply = embeds("Successfully received your bug request. We will fix it as soon as possible.")
                await interaction.channel.send(reply)
            }
        } catch (error) {
            console.log(error)
        }
    }
}
