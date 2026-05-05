import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    GuildMember,
    InteractionContextType,
    PermissionsBitField,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { embed } from "../../function"
import _ from "lodash"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "whois",
    description: "Get user information.",
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "member",
            description: "User to get information for",
            type: ApplicationCommandOptionType.User,
            required: false
        }
    ]
}

const PermissionSet = new Set([
    "Administrator",
    "Manage Server",
    "Manage Roles",
    "Manage Channels",
    "Manage Messages",
    "Manage Webhooks",
    "Manage Nicknames",
    "Manage Emojis and Stickers",
    "Moderate Members",
    "Kick Members",
    "Ban Members",
    "Mention Everyone"
])

const ServerModerator = new Set(["Manage Messages", "Kick Members", "Ban Members", "Moderate Members"])

export async function run(interaction: ChatInputCommandInteraction) {
    const user = interaction.options.getUser("member") ?? interaction.user
    const member = interaction.options.getMember("member") ?? interaction.member

    const obj = {
        color: 0x000000,
        author: {
            name: user.globalName ?? user.displayName ?? user.username,
            icon_url: user.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        thumbnail: {
            url: user.displayAvatarURL() ?? "https://cdn.discordapp.com/embed/avatars/0.png"
        },
        fields: [
            {
                name: "User Info",
                value: `ID: \`${user.id}\`\nName: \`${user.globalName ?? user.displayName}\` (\`${user.username}\`)\n`
            },
            {
                name: "Account Created",
                value: `<t:${(user.createdAt.getTime() / 1000).toFixed()}:F> (<t:${(
                    user.createdAt.getTime() / 1000
                ).toFixed()}:R>)`
            }
        ]
    }

    if (member instanceof GuildMember) {
        if (member.roles.highest.color) obj.color = member.roles.highest.color
        obj.author.name = member.nickname ?? member.displayName
        const icon = member.avatarURL() ?? member.displayAvatarURL()

        if (icon) {
            obj.author.icon_url = icon
            obj.thumbnail.url = icon
        }

        const time = ((member.joinedAt?.getTime() ?? 0) / 1000).toFixed()
        obj.fields.push({ name: "Joined Server", value: `<t:${time}:F> (<t:${time}:R>)` })
    }

    if (member) {
        // prettier-ignore
        const roles = (Array.isArray(member.roles) ? member.roles : member.roles.cache.map((role) => role.id))?.filter((role) => role !== interaction.guildId).map((role) => `<@&${role}>`)
        if (roles.length) obj.fields.push({ name: "Roles", value: roles.join(", ") })

        const permissions = (() => {
            const permissions =
                typeof member.permissions === "string"
                    ? new PermissionsBitField(BigInt(member.permissions))
                    : member.permissions

            return permissions
                .toArray()
                .sort()
                .map((value) => _.startCase(value))
        })()

        if (permissions.find((value) => PermissionSet.has(value))) {
            obj.fields.push({
                name: "Key Permissions",
                value: permissions.filter((value) => PermissionSet.has(value)).join(", ")
            })
        }

        if (interaction.guild && interaction.guild.ownerId === user.id) {
            obj.fields.push({ name: "Acknowledgements", value: "Server Owner" })
        } else if (!interaction.guild && permissions.find((value) => value === "Administrator")) {
            obj.fields.push({ name: "Acknowledgements", value: "Server Admin/Owner" })
        } else if (permissions.find((value) => value === "Administrator")) {
            obj.fields.push({ name: "Acknowledgements", value: "Server Admin" })
        } else if (permissions.filter((value) => ServerModerator.has(value)).length === ServerModerator.size) {
            obj.fields.push({ name: "Acknowledgements", value: "Server Moderator" })
        }
    }

    // @ts-ignore
    if (!obj.color) delete obj.color
    await interaction.reply({ embeds: embed(obj) })
}
