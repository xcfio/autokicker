import { ModalSubmitInteraction } from "discord.js"
import { embed, Errors, HexToColor, ObjectString, xcf } from "../../../function"
import { db, table } from "../../../database"

export async function card_progressbar(interaction: ModalSubmitInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return xcf(interaction)

        const progressbar_fill = interaction.fields.getTextInputValue("fill")
        const progressbar_empty = interaction.fields.getTextInputValue("empty")

        if (!progressbar_fill && !progressbar_empty) {
            return await interaction.message?.edit({ embeds: embed(`Invalid inputs. Please input at least one field`) })
        }

        const data: typeof table.card.$inferInsert = { id: interaction.user.id }

        // prettier-ignore
        if (progressbar_fill) data.progressbar_fill = progressbar_fill === "revert" ? null : HexToColor(progressbar_fill)
        // prettier-ignore
        if (progressbar_empty) data.progressbar_empty = progressbar_empty === "revert" ? null : HexToColor(progressbar_empty)

        const stringObj = ObjectString({ ...data, id: undefined }, true, ", ")
        await db.insert(table.card).values(data).onConflictDoUpdate({ target: table.card.id, set: data })
        await interaction.message?.edit({ embeds: embed(`Successfully updated ${stringObj}`) })
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}
