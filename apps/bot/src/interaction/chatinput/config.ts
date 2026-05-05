import {
    ChatInputCommandInteraction,
    InteractionContextType,
    MessageFlags,
    PermissionFlagsBits,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { cfg_component, embed } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "config",
    description: "Configure your bot",
    contexts: [InteractionContextType.Guild],
    default_member_permissions: PermissionFlagsBits.Administrator.toString()
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
        embeds: embed({
            title: "User Configuration",
            description: "Select an option below to configure your profile settings."
        }),
        components: cfg_component()
    })

    await interaction.followUp({
        content: "This command is in beta. If you find any bugs, please report them by running the `/bug` command",
        flags: MessageFlags.Ephemeral
    })
}
