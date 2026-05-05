import {
    ApplicationCommandType,
    MessageContextMenuCommandInteraction,
    MessageFlags,
    RESTPostAPIContextMenuApplicationCommandsJSONBody
} from "discord.js"
import { inspect } from "node:util"
import { embed } from "../../function"

export const data: RESTPostAPIContextMenuApplicationCommandsJSONBody = {
    name: "Inspect",
    type: ApplicationCommandType.Message
}

export async function run(interaction: MessageContextMenuCommandInteraction) {
    const obj = {
        activity: interaction.targetMessage.activity,
        applicationId: interaction.targetMessage.applicationId,
        attachments: interaction.targetMessage.attachments,
        author: interaction.targetMessage.author,
        bulkDeletable: interaction.targetMessage.bulkDeletable,
        channelId: interaction.targetMessage.channelId,
        components: interaction.targetMessage.components,
        content: interaction.targetMessage.content.length < 1000 ? interaction.targetMessage.content : null,
        createdAt: interaction.targetMessage.createdAt,
        createdTimestamp: interaction.targetMessage.createdTimestamp,
        crosspostable: interaction.targetMessage.crosspostable,
        deletable: interaction.targetMessage.deletable,
        editable: interaction.targetMessage.editable,
        editedAt: interaction.targetMessage.editedAt,
        editedTimestamp: interaction.targetMessage.editedTimestamp,
        embeds: interaction.targetMessage.embeds,
        flags: interaction.targetMessage.flags,
        groupActivityApplication: interaction.targetMessage.groupActivityApplication,
        guildId: interaction.targetMessage.guildId,
        hasThread: interaction.targetMessage.hasThread,
        id: interaction.targetMessage.id,
        interaction: interaction.targetMessage.interactionMetadata,
        mentions: interaction.targetMessage.mentions,
        nonce: interaction.targetMessage.nonce,
        partial: interaction.targetMessage.partial,
        pinnable: interaction.targetMessage.pinnable,
        pinned: interaction.targetMessage.pinned,
        poll: interaction.targetMessage.poll,
        position: interaction.targetMessage.position,
        reference: interaction.targetMessage.reference,
        resolved: interaction.targetMessage.resolved,
        roleSubscriptionData: interaction.targetMessage.roleSubscriptionData,
        stickers: interaction.targetMessage.stickers,
        system: interaction.targetMessage.system,
        thread: interaction.targetMessage.thread,
        tts: interaction.targetMessage.tts,
        type: interaction.targetMessage.type,
        url: interaction.targetMessage.url,
        webhookId: interaction.targetMessage.webhookId
    }

    interaction.reply({ embeds: embed(`\`\`\`js\n${inspect(obj, false, 10)}\n\`\`\``), flags: MessageFlags.Ephemeral })
}
