import {
    ApplicationCommandType,
    InteractionContextType,
    RESTPostAPIContextMenuApplicationCommandsJSONBody,
    UserContextMenuCommandInteraction
} from "discord.js"
import { level_reply } from "../chatinput/level"
import { xcf } from "../../function"

export const data: RESTPostAPIContextMenuApplicationCommandsJSONBody = {
    name: "Level",
    type: ApplicationCommandType.User,
    contexts: [InteractionContextType.Guild]
}

export async function run(interaction: UserContextMenuCommandInteraction) {
    await interaction.deferReply()
    if (!interaction.inCachedGuild()) return xcf(interaction)
    level_reply(interaction, interaction.targetUser)
}
