import { ComponentType, StringSelectMenuInteraction } from "discord.js"
import { db, Emoji, erx, xcf } from "../../../utils"
import { duration } from "@repo/utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function warning_remove(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return void xcf(interaction)

        const [guild] = await db.select().from(table.guild).where(eq(table.guild.id, interaction.guildId))
        const stages = (guild?.stages ?? [])
            .sort((a: number, b: number) => b - a)
            .map((minutes) => Temporal.Duration.from({ minutes }))

        await interaction.update({
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("exclamation")} Warning Stages - Remove`
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: stages.length
                                ? `Select a warning stage to remove.`
                                : `No warning stages configured.`
                        },
                        {
                            type: ComponentType.ActionRow,
                            components: [
                                {
                                    custom_id: "warning-remove",
                                    placeholder: "Select a warning stage to remove",
                                    type: ComponentType.StringSelect,
                                    options: [
                                        ...stages.map((h) => ({
                                            label: duration(h),
                                            description: `${duration(h)} before action`,
                                            value: `${h.total("minutes")}`
                                        })),
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
