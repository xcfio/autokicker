import { ComponentType, StringSelectMenuInteraction } from "discord.js"
import { db, Emoji, erx, xcf } from "../../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function whitelist_remove(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return void xcf(interaction)

        const whitelist = await db
            .select()
            .from(table.whitelist)
            .where(eq(table.whitelist.guildId, interaction.guildId))

        await interaction.update({
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("exclamation")} Whitelist Stages - Remove`
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: whitelist.length ? `Select a whitelist to remove.` : `No whitelist configured.`
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    custom_id: "whitelist-remove",
                                    placeholder: "Select a whitelist to remove",
                                    type: ComponentType.StringSelect,
                                    options: [
                                        ...whitelist.slice(0, 24).map((entry) => {
                                            let label = entry.entry
                                            switch (entry.type) {
                                                case "channel": {
                                                    label =
                                                        interaction.guild.channels.cache.get(entry.entry)?.name ??
                                                        `#${entry.entry}`
                                                    break
                                                }
                                                case "user": {
                                                    label =
                                                        interaction.client.users.cache.get(entry.entry)?.username ??
                                                        `@${entry.entry}`
                                                    break
                                                }
                                                case "role": {
                                                    label =
                                                        interaction.guild.roles.cache.get(entry.entry)?.name ??
                                                        `&${entry.entry}`
                                                    break
                                                }
                                            }

                                            return {
                                                label,
                                                description: `${entry.type} - ${entry.entry}`,
                                                value: entry.id
                                            }
                                        }),
                                        {
                                            label: "Return",
                                            description: "Return to previous menu",
                                            value: "return"
                                        }
                                    ]
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
