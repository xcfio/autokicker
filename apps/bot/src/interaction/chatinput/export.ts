import {
    ApplicationCommandOptionType,
    AttachmentPayload,
    ChatInputCommandInteraction,
    InteractionContextType,
    PermissionFlagsBits,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { existsSync, readFileSync } from "node:fs"
import { pathdir, path } from "../../type"
import { Errors, xcf } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "export",
    description: "Export bot usage",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "type",
            description: "Type of data",
            type: ApplicationCommandOptionType.String,
            choices: path.map((key) => ({ name: key, value: key })),
            required: false
        },
        {
            name: "ephemeral",
            description: "Ephemeral status",
            type: ApplicationCommandOptionType.Boolean,
            required: false
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: interaction.options.getBoolean("ephemeral") ?? false })

    if (interaction.inCachedGuild() && !interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
        return interaction.followUp("403 - Oh no.... I don't have permission to run this command")
    }

    const files: Array<AttachmentPayload> = []
    const type = interaction.options.getString("type") as (typeof path)[number] | null

    try {
        if (type && existsSync(`${pathdir}/${type}.json`)) {
            files.push({ name: `${type}.json`, attachment: readFileSync(`${pathdir}/${type}.json`) })
        } else {
            path.forEach((type) => {
                if (existsSync(`${pathdir}/${type}.json`)) {
                    files.push({ name: `${type}.json`, attachment: readFileSync(`${pathdir}/${type}.json`) })
                }
            })
        }

        if (files.length) {
            interaction.followUp({ files })
        } else {
            interaction.followUp("404 - File Not Found")
        }
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}
