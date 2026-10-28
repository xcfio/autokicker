import { ModalSubmitInteraction } from "discord.js"
import { db, message, erx, xcf } from "../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function cfg_threshold(interaction: ModalSubmitInteraction) {
    try {
        const month = parseInt(interaction.fields.getTextInputValue("month") ?? "0", 10) || 0
        const days = parseInt(interaction.fields.getTextInputValue("days") ?? "0", 10) || 0

        const totalMinutes = (month * 30 + days) * 24 * 60

        if (totalMinutes <= 0) {
            return await interaction.reply(message.error("Please enter a valid threshold."))
        }

        await db
            .update(table.guild)
            .set({ threshold: totalMinutes })
            .where(eq(table.guild.id, interaction.guildId ?? ""))

        return await interaction.reply(
            message.success(`Inactivity threshold set to **${month} month(s) and ${days} day(s)**.`)
        )
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
