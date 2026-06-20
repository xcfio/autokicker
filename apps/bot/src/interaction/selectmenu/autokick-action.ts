import { StringSelectMenuInteraction } from "discord.js"
import { db, message, erx, xcf } from "../../utils"
import { return_handler } from "./return"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function autokick_action(interaction: StringSelectMenuInteraction) {
    try {
        const action = interaction.values[0]
        if (action === "return") return await return_handler(interaction)

        if (action !== "kick" && action !== "ban") {
            return await interaction.update(message.error("Invalid action type."))
        }

        await db
            .update(table.guild)
            .set({ action })
            .where(eq(table.guild.id, interaction.guildId ?? ""))

        return await interaction.update(message.success(`Inactivity action set to: **${action}**`))
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
