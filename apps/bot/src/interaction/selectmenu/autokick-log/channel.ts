import { ChannelSelectMenuInteraction } from "discord.js"
import { db, message, erx, xcf } from "../../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function autokick_log_channel(interaction: ChannelSelectMenuInteraction) {
    try {
        if (!interaction.inCachedGuild()) return void xcf(interaction)

        const channels = interaction.values
        const [guildData] = await db.select().from(table.guild).where(eq(table.guild.id, interaction.guildId))
        const existingLogs = guildData?.log ?? []
        const uniqueNewChannels = channels.filter((c) => !existingLogs.includes(c))

        if (uniqueNewChannels.length === 0) {
            return await interaction.update(
                message.error("Selected channel(s) are already configured as log channels.")
            )
        }

        const newLogs = [...existingLogs, ...uniqueNewChannels]

        if (newLogs.length > 1) {
            return await interaction.update(
                message.error(
                    `Cannot have more than **1** log channels. Current: **${existingLogs.length}**, trying to add **${uniqueNewChannels.length}**.`
                )
            )
        }

        for (const channel of uniqueNewChannels) {
            if (!interaction.guild?.channels.cache.has(channel)) {
                return await interaction.update(message.error(`Channel <#${channel}> does not exist in this server.`))
            }
        }

        // Update database
        await db.update(table.guild).set({ log: newLogs }).where(eq(table.guild.id, interaction.guildId))

        return await interaction.update(
            message.success(`Added log channels: ${uniqueNewChannels.map((x) => `<#${x}>`).join(", ")}`)
        )
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
