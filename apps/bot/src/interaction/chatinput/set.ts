import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    InteractionContextType,
    PermissionFlagsBits,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { embed } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "set",
    description: "set data",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "user",
            description: "User you want to edit",
            type: ApplicationCommandOptionType.User,
            required: true
        },
        {
            name: "type",
            description: "Type of data",
            type: ApplicationCommandOptionType.String,
            required: true,
            choices: [
                {
                    name: "Balance",
                    value: "balance"
                },
                {
                    name: "Message",
                    value: "message"
                },
                {
                    name: "Level",
                    value: "level"
                },
                {
                    name: "XP",
                    value: "xp"
                },
                {
                    name: "Level Up Message",
                    value: "level-up"
                }
            ]
        },
        {
            name: "input",
            description: "Input of type",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
        embeds: embed(
            "This command is currently under development. Please check back later or contact support for more information."
        ),
        ephemeral: true
    })
}
