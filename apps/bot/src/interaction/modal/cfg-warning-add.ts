import { ModalSubmitInteraction } from "discord.js"
import { db, message, erx, xcf } from "../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"
import { sql } from "drizzle-orm"

export async function cfg_warning_add(interaction: ModalSubmitInteraction) {
    try {
        const days = parseInt(interaction.fields.getTextInputValue("days") ?? "0", 10) || 0

        if (days <= 0) {
            return await interaction.reply(message.error("Please enter a valid number of days."))
        }

        const minutes = days * 24 * 60

        await db
            .update(table.guild)
            .set({ stages: sql`${table.guild.stages} || ARRAY[${minutes}]::integer[]` })
            .where(eq(table.guild.id, interaction.guildId ?? ""))

        return await interaction.reply(message.success(`Warning stage added: **${days} day(s)** before kick.`))
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
