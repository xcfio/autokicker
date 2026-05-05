import { ModalSubmitInteraction } from "discord.js"
import { embed, Errors, ObjectString, xcf } from "../../../function"
import { db, table } from "../../../database"

export async function card_overlay(interaction: ModalSubmitInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return xcf(interaction)

        const overlay = (() => {
            const StringField = interaction.fields.getTextInputValue("overlay")

            if (StringField === "revert") return null
            const NumberField = parseInt(StringField)

            if (isNaN(NumberField)) return null
            if (NumberField < 0) return null
            if (NumberField > 100) return null

            return NumberField
        })()

        const data: typeof table.card.$inferInsert = { id: interaction.user.id, overlay }
        const stringObj = ObjectString({ ...data, id: undefined }, false, ", ")

        await db.insert(table.card).values(data).onConflictDoUpdate({ target: table.card.id, set: data })
        await interaction.message?.edit({ embeds: embed(`Successfully updated ${stringObj}`) })
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}
