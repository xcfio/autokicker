import {
    ApplicationCommandType,
    InteractionContextType,
    MessageFlags,
    RESTPostAPIContextMenuApplicationCommandsJSONBody,
    UserContextMenuCommandInteraction
} from "discord.js"
import { cx } from "../../function"

export const data: RESTPostAPIContextMenuApplicationCommandsJSONBody = {
    name: "User Information",
    type: ApplicationCommandType.User,
    contexts: [InteractionContextType.Guild]
}

export async function run(interaction: UserContextMenuCommandInteraction) {
    if (!interaction.inGuild() || !interaction.inCachedGuild()) return cx(interaction)

    // prettier-ignore
    const roles = interaction.targetMember?.roles.cache.filter((role) => role.id !== interaction.guildId).map((role) => `<@&${role.id}>`).sort().join(", ") ?? "This user does not have any roles."

    interaction.reply({
        flags: MessageFlags.Ephemeral,
        embeds: [
            {
                author: {
                    name: interaction.targetMember?.displayName ?? "null",
                    icon_url: interaction.targetUser.displayAvatarURL()
                },
                thumbnail: {
                    url: interaction.targetUser.displayAvatarURL()
                },
                fields: [
                    {
                        name: "User Info",
                        value: `ID: ${interaction.targetUser.id} \nName: ${
                            interaction.targetMember
                                ? `${interaction.targetMember.nickname} (${interaction.targetUser.globalName})`
                                : interaction.targetUser.globalName
                        } Username: ${interaction.targetUser.username}\n`
                    },
                    {
                        name: "Account Created",
                        value: `<t:${(interaction.targetUser.createdAt.getTime() / 1000).toFixed()}:F> (<t:${(
                            interaction.targetUser.createdAt.getTime() / 1000
                        ).toFixed()}:R>)`
                    },
                    {
                        name: "Joined Server",
                        value: `<t:${((interaction.targetMember?.joinedAt?.getTime() ?? 0) / 1000).toFixed()}:F> (<t:${(
                            (interaction.targetMember?.joinedAt?.getTime() ?? 0) / 1000
                        ).toFixed()}:R>)`
                    },
                    {
                        name: "Roles",
                        value: roles
                    }
                ]
            }
        ]
    })
}
