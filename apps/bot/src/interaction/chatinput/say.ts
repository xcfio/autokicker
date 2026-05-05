import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    InteractionContextType,
    MessageFlags,
    MessageMentionOptions,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { isSendable } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "say",
    description: "Say something in here",
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "message",
            description: "Massage that you want to say",
            type: ApplicationCommandOptionType.String,
            required: true
        },
        {
            name: "type",
            description: "Can I message send separately ?",
            type: ApplicationCommandOptionType.Boolean
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    const content = interaction.options.getString("message", true)
    const type = interaction.options.getBoolean("type")

    if (!interaction.inGuild()) return interaction.reply("404 - Unknown Guild")
    const allowedMentions: MessageMentionOptions = { repliedUser: false, users: [], roles: [], parse: [] }
    if (!type || !interaction.channel) return interaction.reply({ content, allowedMentions })

    if (isSendable(interaction.channel)) {
        interaction.channel.send({ content, allowedMentions })
    } else {
        interaction.reply({ content: "I don't have permission to do this", flags: MessageFlags.Ephemeral })
    }

    interaction.reply({ content: `Successfully said: "${content}"`, flags: MessageFlags.Ephemeral, allowedMentions })
}
