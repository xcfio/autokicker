import { ComponentType, StringSelectMenuInteraction } from "discord.js"
import { embed } from "../../../function"

const messageFormatHelp = `
**Message Formatting Guide** 🔧

Use variables by enclosing them in double curly braces: \`{{variable.subvariable}}\`

**Available Variables:**

📌 **User Variables** (\`user.\`):
• \`{{user.name}}\` - Display name
• \`{{user.username}}\` - Discord username
• \`{{user.nick}}\` - Nickname (if set)
• \`{{user.id}}\` - User ID
• \`{{user.mention}}\` - User mention
• \`{{user.avatar}}\` - Avatar hash
• \`{{user.createdAt}}\` - Account creation date
• \`{{user.joinedAt}}\` - Server join date

🏠 **Server Variables** (\`guild.\`):
• \`{{guild.name}}\` - Server name
• \`{{guild.id}}\` - Server ID
• \`{{guild.icon}}\` - Server icon hash
• \`{{guild.ownerId}}\` - Owner's user ID
• \`{{guild.memberCount}}\` - Total member count
• \`{{guild.createdAt}}\` - Server creation date

#️ **Channel Variables** (\`channel.\`):
• \`{{channel.name}}\` - Channel name
• \`{{channel.id}}\` - Channel ID
• \`{{channel.mention}}\` - Channel mention
• \`{{channel.createdAt}}\` - Channel creation date
• \`{{channel.lastMessageId}}\` - ID of last message

📊 **Level/XP Variables** (\`info.\`):
• \`{{info.level}}\` - Current level
• \`{{info.xp}}\` - Current XP
• \`{{info.timestamp}}\` - Current Unix timestamp
• \`{{info.date}}\` - Current day of month
• \`{{info.month}}\` - Current month
• \`{{info.year}}\` - Current year
• \`{{info.time}}\` - Full UTC time

**Example Usage:**
\`\`\`
{{user.mention}} just hit level {{info.level}}! 
Congratulations in the {{channel.mention}} channel! 
Total server members: {{guild.memberCount}}
\`\`\`

**Tips:**
• Wrap variables in \`{{}}\`
• Use dot notation for nested properties
• Unsupported variables will remain unchanged
• Variables only work for Custom Message
`

export async function customize_settings(interaction: StringSelectMenuInteraction) {
    await interaction.update({
        embeds: embed({
            title: "Settings Configuration",
            description:
                "Use the options below to configure your profile's settings.\n\n" +
                "**Current Settings Overview:**\n" +
                "• Custom Message: {enabled/disabled}\n\n" +
                "**Level-up Message Formatting**\n" +
                messageFormatHelp,
            footer: {
                text: `Select an option from the menu to continue configuring. Type "revert" to restore default settings.`
            }
        }),
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        custom_id: "settings",
                        placeholder: "Select an option to configure",
                        type: ComponentType.StringSelect,
                        options: [
                            {
                                label: "Edit Level-up Message",
                                description: "Customize the level-up notification",
                                value: "message"
                            },
                            {
                                label: "Return To Main Menu",
                                description: "Go back to main configuration",
                                value: "return"
                            }
                        ]
                    }
                ]
            }
        ]
    })
}
