import {
    ChatInputCommandInteraction,
    InteractionContextType,
    PermissionFlagsBits,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { cfg_message, erx, xcf } from "../../utils"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "config",
    description: "Configure autokick settings for your server",
    default_member_permissions: PermissionFlagsBits.Administrator.toString(),
    contexts: [InteractionContextType.Guild]
}

export async function run(interaction: ChatInputCommandInteraction) {
    try {
        // await interaction.deferReply()
        await interaction.followUp(cfg_message())
    } catch (error) {
        erx(error as Error)
        xcf(interaction)
    }
}
