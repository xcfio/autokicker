import {
    APIEmbed,
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    InteractionContextType,
    PermissionFlagsBits,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { inspect } from "node:util"
import { embed } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "eval",
    description: "Evaluates the given code",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "code",
            description: "The code to evaluate",
            type: ApplicationCommandOptionType.String,
            required: true
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

    // @ts-ignore
    const stop = async (code?: number) => {
        console.trace(`Stopped by ${interaction.user.username}(${interaction.user.id}) at`, new Date().toUTCString())
        await interaction.followUp("Stopped")
        process.exit(code)
    }

    try {
        const code: string = await eval(interaction.options.getString("code", true))
        const embeds: Array<APIEmbed> = embed({
            title: "Output",
            description: code
        })

        if (typeof code !== "string") {
            for (let depth = 11; depth > -2; depth--) {
                if (depth === 11) {
                    embeds[0].description = `\`\`\`js\n${inspect(code, { depth: Infinity, showHidden: true })}\n\`\`\``
                } else {
                    embeds[0].description = `\`\`\`js\n${inspect(code, { depth })}\n\`\`\``
                }
                embeds[0].description = embeds[0].description.replace(/<ref \*\d+>/g, "")
                if ((embeds[0].description?.length ?? 5000) <= 4096) break
                if (depth === -1) embeds[0].description = "Output is too large to send"
            }
        }

        await interaction.followUp({ embeds })
    } catch (error: any) {
        interaction.followUp({ embeds: embed(`\`\`\`js\n${error.stack ?? error}\n\`\`\``) })
    }
}
