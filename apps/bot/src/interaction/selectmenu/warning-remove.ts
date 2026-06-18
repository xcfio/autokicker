import { StringSelectMenuInteraction } from "discord.js"
import { db, message, erx, xcf } from "../../utils"
import { return_handler } from "./return"
import { table } from "@repo/database"
import { duration } from "@repo/utils"
import { eq } from "drizzle-orm"

export async function warning_remove(interaction: StringSelectMenuInteraction) {
    try {
        const value = interaction.values[0]
        if (value === "return") return await return_handler(interaction)

        const minutes = Number(value)
        const [guild] = await db
            .select()
            .from(table.guild)
            .where(eq(table.guild.id, interaction.guildId ?? ""))
        const stages = guild?.warningStages ?? []

        if (!stages.includes(minutes)) {
            return await interaction.update(
                message.error(`Warning stage **${duration(Temporal.Duration.from({ minutes }))}** does not exist.`)
            )
        }

        const warningStages = stages.filter((t: number) => t !== minutes)
        await db
            .update(table.guild)
            .set({ warningStages })
            .where(eq(table.guild.id, interaction.guildId ?? ""))

        return await interaction.update(
            message.success(`Warning stage removed: **${duration(Temporal.Duration.from({ minutes }))}**.`)
        )
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
