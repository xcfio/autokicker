// import { ButtonStyle, ChannelType, ComponentType, Message } from "discord.js"
// import config from "../../config"

// TODO need to refactor
export async function automod(message: any) {
    // const regex = /[\x20-\x7E\uD83C-\uDBFF\uDC00-\uDFFF\s]+/
    // if (!regex.test(message.content)) return
    // const channel = message.client.channels.cache.get(config["moderator-only"])
    // if (!channel || channel.type !== ChannelType.GuildText) return
    // await channel.send({
    //     embeds: [
    //         {
    //             color: 0x5865f2,
    //             title: "AutoMod: Unknown language",
    //             description: message.content,
    //             footer: {
    //                 text: "Action: Not taken"
    //             },
    //             fields: [
    //                 {
    //                     name: "Information",
    //                     value: `Author: <@${message.author.id}> [${message.author.id}](https://discord.com/users/${message.author.id}) \nMessage Channel: <#${message.channelId}> [${message.channelId}](https://discord.com/channels/${message.guildId}/${message.channelId}) \nMessage ID: [${message.id}](${message.url}) \nReason: Unknown language Detected`
    //                 }
    //             ]
    //         }
    //     ],
    //     components: [
    //         {
    //             type: ComponentType.ActionRow,
    //             components: [
    //                 {
    //                     label: "Delete",
    //                     custom_id: "automod-delete",
    //                     style: ButtonStyle.Danger,
    //                     type: ComponentType.Button
    //                 },
    //                 {
    //                     label: "Ignore",
    //                     custom_id: "automod-ignore",
    //                     style: ButtonStyle.Success,
    //                     type: ComponentType.Button
    //                 }
    //             ]
    //         }
    //     ]
    // })
}
