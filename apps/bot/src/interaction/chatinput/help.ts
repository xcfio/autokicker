import {
    ChatInputCommandInteraction,
    ApplicationCommand,
    GuildResolvable,
    ApplicationCommandType,
    ApplicationCommandOptionType,
    ApplicationCommandSubGroup,
    ApplicationCommandSubCommand,
    Collection,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    InteractionContextType
} from "discord.js"
import { embed } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "help",
    description: "Help to use this bot",
    contexts: [InteractionContextType.Guild]
}

let cachedCommands: string | null = null
export async function run(interaction: ChatInputCommandInteraction) {
    if (!cachedCommands) {
        cachedCommands = formatCommands(interaction.client.application.commands.cache)
    }

    await interaction.reply({
        embeds: embed({
            description: cachedCommands,
            author: {
                name: "Command List",
                icon_url: interaction.client.user.displayAvatarURL()
            }
        })
    })
}

function formatCommands(commands: Collection<string, ApplicationCommand<{ guild: GuildResolvable }>>) {
    const contextMenuCommands = []
    const chatInputCommands = []

    for (const command of commands.values()) {
        if (command.type === ApplicationCommandType.ChatInput) {
            chatInputCommands.push(formatChatInputCommand(command))
        } else {
            contextMenuCommands.push(`\`${command.name}\``)
        }
    }

    return [
        "### Context Menu Commands:",
        contextMenuCommands.length ? contextMenuCommands.join("\n") : "*No context menu commands available*",
        "### Chat Input Commands:",
        chatInputCommands.length ? chatInputCommands.join("\n") : "*No chat input commands available*"
    ].join("\n")
}

function formatChatInputCommand(command: ApplicationCommand<{ guild: GuildResolvable }>) {
    if (!command.options?.length) {
        return `\`${command.name}\` → ${command.description}`
    }

    const formattedOptions = []
    const regularOptions = []

    for (const option of command.options) {
        switch (option.type) {
            case ApplicationCommandOptionType.SubcommandGroup:
                formattedOptions.push(formatSubCommandGroup(option, command.name))
                break
            case ApplicationCommandOptionType.Subcommand:
                formattedOptions.push(formatSubCommand(option, command.name))
                break
            default:
                regularOptions.push(`(${option.required ? "" : "?"}${option.name})`)
        }
    }

    if (regularOptions.length) {
        formattedOptions.push(`\`${command.name} ${regularOptions.join(" ")}\` → ${command.description}`)
    }

    return formattedOptions.join("\n")
}

function formatSubCommandGroup(group: ApplicationCommandSubGroup, commandName: string): string {
    if (!group.options?.length) {
        return `\`${commandName} ${group.name}\` → ${group.description}`
    }

    return group.options
        .filter((option) => option.type === ApplicationCommandOptionType.Subcommand)
        .map((option) => formatSubCommand(option as ApplicationCommandSubCommand, `${commandName} ${group.name}`))
        .join("\n")
}

function formatSubCommand(command: ApplicationCommandSubCommand, prefix: string): string {
    const options = command.options?.map((opt) => `(${opt.required ? "" : "?"}${opt.name})`).join(" ") || ""
    return `\`${prefix} ${command.name}${options ? ` ${options}` : ""}\` → ${command.description}`
}
