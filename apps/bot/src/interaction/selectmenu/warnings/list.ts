import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { db, Emoji, erx, warnings_component, xcf } from "../../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function warning_list(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return xcf(interaction)

        const [guild] = await db.select().from(table.guild).where(eq(table.guild.id, interaction.guildId))
        const stages = guild?.warningStages ?? []

        const list = stages.length
            ? stages
                  .sort((a: number, b: number) => b - a)
                  .map((h: number) => `${h} minutes before kick`)
                  .join("\n")
            : "No warning stages configured."

        await interaction.editReply({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("exclamation")} Warning Stages`
                        },
                        { type: ComponentType.Separator },
                        {
                            type: ComponentType.TextDisplay,
                            content: "```\n" + list + "\n```"
                        },
                        warnings_component()
                    ]
                }
            ]
        })
    } catch (error) {
        erx(error as Error)
        xcf(interaction)
    }
}
