import { db, message, erx, xcf } from "../../utils"
import { StringSelectMenuInteraction } from "discord.js"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"
import { duration } from "@repo/utils"

export async function warning_remove(interaction: StringSelectMenuInteraction) {
    try {
        const value = interaction.values[0]
        if (value === "return") {
            return // Handle it
        }

        const minutes = Number(value)
        const [guild] = await db.select().from(table.guild).where(eq(table.guild.id, interaction.guildId!))
        const stages = guild?.warningStages ?? []

        if (!stages.includes(minutes)) {
            return interaction.reply(
                message.error(`Warning stage **${duration(Temporal.Duration.from({ minutes }))}** does not exist.`)
            )
        }

        const warningStages = stages.filter((t: number) => t !== minutes)
        await db.update(table.guild).set({ warningStages }).where(eq(table.guild.id, interaction.guildId!))

        return interaction.reply(
            message.success(`Warning stage removed: **${duration(Temporal.Duration.from({ minutes }))}**.`)
        )
    } catch (error) {
        erx(error as Error)
        xcf(interaction)
    }
}
