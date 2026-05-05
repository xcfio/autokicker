import { ModalSubmitInteraction } from "discord.js"
import { embed, Errors, HexToColor, ObjectString, xcf } from "../../../function"
import { db, table } from "../../../database"

export async function card_statistics(interaction: ModalSubmitInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return xcf(interaction)

        const statistics_text = interaction.fields.getTextInputValue("text")
        const statistics_value = interaction.fields.getTextInputValue("value")

        if (!statistics_text && !statistics_value) {
            return await interaction.message?.edit({ embeds: embed(`Invalid inputs. Please input at least one field`) })
        }

        const data: typeof table.card.$inferInsert = { id: interaction.user.id }

        // prettier-ignore
        if (statistics_value) data.statistics_value = statistics_value === "revert" ? null : HexToColor(statistics_value)
        // prettier-ignore
        if (statistics_text) data.statistics_text = statistics_text === "revert" ? null : HexToColor(statistics_text)

        const stringObj = ObjectString({ ...data, id: undefined }, true, ", ")
        await db.insert(table.card).values(data).onConflictDoUpdate({ target: table.card.id, set: data })
        await interaction.message?.edit({ embeds: embed(`Successfully updated ${stringObj}`) })
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}
