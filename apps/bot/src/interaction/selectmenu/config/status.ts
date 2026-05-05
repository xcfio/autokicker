import { APIEmbedField, StringSelectMenuInteraction } from "discord.js"
import { ColorFormatter, embed, Errors, xcf } from "../../../function"
import { db, table } from "../../../database"
import { eq } from "drizzle-orm"

export async function status(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inGuild()) return xcf(interaction)

        const [settings] = await db
            .select()
            .from(table.settings)
            .where(eq(table.settings.id, interaction.user.id))
            .execute()
        const [card] = await db.select().from(table.card).where(eq(table.card.id, interaction.user.id)).execute()

        const statusEmbed = {
            title: "User Configuration Status",
            fields: [] as Array<APIEmbedField>
        }

        if (card) {
            statusEmbed.fields.push({
                name: "Card Configuration",
                value: [
                    `Background: ${card.background ?? "Default"}`,
                    `Overlay: ${card.overlay ?? "Default"}`,
                    `Name Color: ${ColorFormatter(card.name) ?? "Default"}`,
                    `Username Color: ${ColorFormatter(card.username) ?? "Default"}`,
                    `Progressbar Fill: ${ColorFormatter(card.progressbar_fill) ?? "Default"}`,
                    `Progressbar Empty: ${ColorFormatter(card.progressbar_empty) ?? "Default"}`,
                    `Statistics Text: ${ColorFormatter(card.statistics_text) ?? "Default"}`,
                    `Statistics Value: ${ColorFormatter(card.statistics_value) ?? "Default"}`
                ].join("\n")
            })
        } else {
            statusEmbed.fields.push({
                name: "Card Configuration",
                value: "No configuration"
            })
        }

        if (settings) {
            let msg = settings.level_message === null ? "None" : settings.level_message.toString()
            msg = msg === "" ? (msg = "Off") : msg.length > 50 ? msg.slice(0, 50).concat("...") : msg

            statusEmbed.fields.push({
                name: "Settings Configuration",
                value: `Custom Message: ${msg}`
            })
        } else {
            statusEmbed.fields.push({
                name: "Settings Configuration",
                value: "No configuration"
            })
        }

        await interaction.update({ embeds: embed(statusEmbed) })
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}
