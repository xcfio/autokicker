import {
    ApplicationCommandOptionType,
    ApplicationCommandType,
    CommandInteractionOption,
    ComponentType,
    Interaction,
    InteractionType
} from "discord.js"
import { JWT } from "google-auth-library"
import { append, Time } from "../../function"
import config from "../../config"

export async function interaction_log(interaction: Interaction) {
    if (interaction.isAutocomplete()) return
    const options = getOptions(interaction)

    const row = {
        time: interaction.createdTimestamp,
        type:
            interaction.type === InteractionType.MessageComponent
                ? (ComponentType[interaction.componentType] as keyof typeof ComponentType)
                : interaction.type === InteractionType.ApplicationCommand
                  ? (ApplicationCommandType[interaction.commandType] as keyof typeof ApplicationCommandType)
                  : ("Modal" as any),
        interaction: {
            id: interaction.id,
            name: "commandName" in interaction ? interaction.commandName : undefined,
            customId: "customId" in interaction ? interaction.customId : undefined,
            options: options.length ? options : undefined
        },
        user: { id: interaction.user.id, username: interaction.user.username },
        // @ts-ignore
        channel: interaction.channelId ? { id: interaction.channelId, name: interaction.channel?.name } : undefined,
        guild: interaction.guildId ? { id: interaction.guildId, name: interaction.guild?.name } : undefined
    }

    const obj = { ...row, time: Time(row.time) }
    append("command", row)
    log(obj)
}

export default async function Sheet(sheet: string) {
    const { GoogleSpreadsheet } = await import("google-spreadsheet")
    const doc = new GoogleSpreadsheet(config.sheet, new JWT({ credentials: JSON.parse(config.api.google) }))

    try {
        await doc.loadInfo().catch((error) => console.trace(error))
        return doc.sheetsByTitle[sheet] ?? null
    } catch (error) {
        console.trace(error)
        return null
    }
}

async function log(row: InteractionRow) {
    try {
        if (row.type === "ChatInput" || row.type === "User" || row.type === "Message") {
            const logObj: Record<"Time" | "Guild" | "User" | "Channel" | "Type" | "Name" | "ID" | "JSON", string> = {
                Channel: row.channel?.id ?? "N/A",
                Guild: row.guild?.id ?? "N/A",
                ID: row.interaction.id,
                Name: row.interaction.name ?? "N/A",
                Time: row.time,
                Type: row.type,
                User: row.user.id,
                JSON: JSON.stringify(row)
            }

            const type: sheetType = row.type === "User" || row.type === "Message" ? "Context" : "Command"
            const sheet = await Sheet(type)

            if (!sheet) throw new Error("Sheet is missing")
            sheet.addRow(logObj)
        } else {
            const logObj: Record<"Time" | "Guild" | "User" | "Channel" | "Type" | "CustomID" | "ID" | "JSON", string> =
                {
                    Channel: row.channel?.id ?? "N/A",
                    Guild: row.guild?.id ?? "N/A",
                    ID: row.interaction.id,
                    CustomID: row.interaction.customId ?? "N/A",
                    Time: row.time,
                    Type: row.type === "SelectMenu" ? "StringSelect" : row.type,
                    User: row.user.id,
                    JSON: JSON.stringify(row)
                }

            const type: sheetType = row.type.includes("Select") ? "SelectMenu" : (row.type as any)
            const sheet = await Sheet(type)

            if (!sheet) throw new Error("Sheet is missing")
            sheet.addRow(logObj)
        }
    } catch (error) {
        console.trace(error)
    }
}

function getOptions(interaction: Interaction) {
    const optionsArray = []

    if (interaction.isChatInputCommand() && interaction.options.data.length) {
        optionsArray.push(...parseChatInputOptions(interaction.options.data))
    }

    if (interaction.isContextMenuCommand()) {
        optionsArray.push(...interaction.options.data.map((opt) => ({ name: opt.name, value: opt.value })))
    }

    if (interaction.isAnySelectMenu()) {
        optionsArray.push(...interaction.values)
    }

    if (interaction.isModalSubmit()) {
        optionsArray.push(
            ...interaction.fields.fields.map((field) => ({
                custom_id: field.customId,
                value:
                    field.type === ComponentType.TextInput
                        ? { type: ComponentType[field.type], value: field.value }
                        : "values" in field
                          ? { type: ComponentType[field.type], name: field.customId, value: field.values }
                          : { type: ComponentType[field.type], name: field.customId, value: field.value }
            }))
        )
    }

    return optionsArray
}

function parseChatInputOptions(options: Readonly<Array<CommandInteractionOption>>) {
    return options.map((option) => {
        if (option.type === ApplicationCommandOptionType.SubcommandGroup) {
            return {
                type: ApplicationCommandOptionType[option.type],
                name: option.name,
                options: parseSubCommandGroupOptions(option.options ?? [])
            }
        } else if (option.type === ApplicationCommandOptionType.Subcommand) {
            return {
                type: ApplicationCommandOptionType[option.type],
                name: option.name,
                options: parseSubCommandOptions(option.options ?? [])
            }
        } else {
            return parseOption(option)
        }
    })
}

function parseSubCommandGroupOptions(options: Readonly<Array<CommandInteractionOption>>) {
    return options.map((option) => {
        if (option.type === ApplicationCommandOptionType.Subcommand) {
            return {
                type: ApplicationCommandOptionType[option.type],
                name: option.name,
                options: parseSubCommandOptions(option.options ?? [])
            }
        }
        return parseOption(option)
    })
}

function parseSubCommandOptions(options: Readonly<Array<CommandInteractionOption>>) {
    return options.map((option) => parseOption(option))
}

function parseOption(option: Readonly<CommandInteractionOption>) {
    return {
        type: ApplicationCommandOptionType[option.type],
        name: option.name,
        value: option.value
    }
}

type sheetType = "Command" | "Context" | "Button" | "Modal" | "SelectMenu"
type InteractionRow = {
    time: string
    type: keyof typeof ComponentType | keyof typeof ApplicationCommandType | "null"
    interaction: {
        id: string
        name?: string
        customId?: string
        options?: any[]
    }
    user: {
        id: string
        username: string
    }
    channel?: {
        id: string
        name?: string
    }
    guild?: {
        id: string
        name?: string
    }
}
