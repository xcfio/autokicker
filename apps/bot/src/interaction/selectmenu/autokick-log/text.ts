import { StringSelectMenuInteraction } from "discord.js"
import { db, erx, xcf, message } from "../../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function autokick_log_text(interaction: StringSelectMenuInteraction, channelId: string) {
    try {
        if (!interaction.inCachedGuild()) return void xcf(interaction)

        const [guildData] = await db.select().from(table.guild).where(eq(table.guild.id, interaction.guildId))

        const channels = guildData?.log ?? []

        if (!channels.includes(channelId)) {
            return await interaction.update(message.error("Log channel is not configured."))
        }

        const newLogs = channels.filter((id) => id !== channelId)

        await db.update(table.guild).set({ log: newLogs }).where(eq(table.guild.id, interaction.guildId))

        return await interaction.update(message.success(`Removed log channel: <#${channelId}>.`))
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
