import { ModalSubmitInteraction } from "discord.js"
import { embed, Errors, HexToColor, ObjectString, xcf } from "../../../function"
import { db, table } from "../../../database"

export async function card_name(interaction: ModalSubmitInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return xcf(interaction)

        const name = interaction.fields.getTextInputValue("name")
        const username = interaction.fields.getTextInputValue("username")

        if (!name && !username) {
            return await interaction.message?.edit({ embeds: embed(`Invalid inputs. Please input at least one field`) })
        }

        const data: typeof table.card.$inferInsert = { id: interaction.user.id }
        if (name) data.name = name === "revert" ? null : HexToColor(name)
        if (username) data.username = username === "revert" ? null : HexToColor(username)

        const stringObj = ObjectString({ ...data, id: undefined }, true, ", ")
        await db.insert(table.card).values(data).onConflictDoUpdate({ target: table.card.id, set: data })
        await interaction.message?.edit({ embeds: embed(`Successfully updated ${stringObj}`) })
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}
