import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { db, Emoji, erx, xcf } from "../../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function autokick_log_remove(interaction: StringSelectMenuInteraction) {
    try {
        if (!interaction.inCachedGuild()) return void xcf(interaction)

        const [guildData] = await db.select().from(table.guild).where(eq(table.guild.id, interaction.guildId))

        const channels = guildData?.log ?? []

        const options = [
            ...channels.map((channelId) => {
                const channelName = interaction.guild.channels.cache.get(channelId)?.name ?? channelId
                return {
                    label: channelName,
                    description: `Channel ID: ${channelId}`,
                    value: `remove-${channelId}`
                }
            }),
            {
                label: "Return",
                description: "Return to previous menu",
                value: "return"
            }
        ]

        await interaction.update({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("exclamation")} Log Channels - Remove`
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: channels.length
                                ? "Select a log channel below to remove."
                                : "No log channels configured."
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    custom_id: "autokick-log",
                                    placeholder: "Select log channel to remove",
                                    type: ComponentType.StringSelect,
                                    options
                                }
                            ]
                        }
                    ]
                }
            ]
        })
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
