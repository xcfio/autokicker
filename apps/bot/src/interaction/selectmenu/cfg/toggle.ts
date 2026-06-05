import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { cfg_component, db, Emoji, erx, xcf } from "../../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function toggle(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return xcf(interaction)

        const [guild] = await db.select().from(table.guild).where(eq(table.guild.id, interaction.guildId))
        const newState = !(guild?.enabled ?? false)

        await db.update(table.guild).set({ enabled: newState }).where(eq(table.guild.id, interaction.guildId))

        const statusEmoji = newState ? Emoji("check") : Emoji("x")
        const statusText = newState ? "**enabled**" : "**disabled**"

        await interaction.editReply({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("gear")} Server Configuration`
                        },
                        { type: ComponentType.Separator },
                        {
                            type: ComponentType.TextDisplay,
                            content: `${statusEmoji} AutoKick has been ${statusText}.`
                        },
                        cfg_component()
                    ]
                }
            ]
        })
    } catch (error) {
        erx(error as Error)
        xcf(interaction)
    }
}
