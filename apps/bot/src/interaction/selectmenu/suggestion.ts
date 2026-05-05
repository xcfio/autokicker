import { ChannelType, MessageFlags, PermissionFlagsBits, StringSelectMenuInteraction } from "discord.js"
import { embed, xcf } from "../../function"

export async function suggestion(interaction: StringSelectMenuInteraction) {
    await interaction.deferReply()
    if (!interaction.inCachedGuild() || !interaction.member.permissions.has(PermissionFlagsBits.ManageGuild)) {
        return interaction.followUp({
            content: "Oh no... you don't have permission to use this command",
            flags: MessageFlags.Ephemeral
        })
    }

    const { channel } = interaction
    if (!channel || channel.type !== ChannelType.PublicThread) return xcf(interaction)
    const approve = ["1237579745361657916"]
    const reject = ["1237580635724316744"]

    switch (interaction.values.shift()) {
        case "approve":
            channel.setAppliedTags(approve)
            interaction.followUp(`Suggestion is approved by <@${interaction.user.id}>`)
            interaction.message.edit({ embeds: embed(`Suggestion is approved by <@${interaction.user.id}>`) })
            break

        case "reject":
            channel.setAppliedTags(reject)
            interaction.followUp(`Suggestion is rejected <@${interaction.user.id}>`)
            interaction.message.edit({ embeds: embed(`Suggestion is rejected <@${interaction.user.id}>`) })
            break

        default:
            xcf(interaction)
            break
    }
}
