import { ModalSubmitInteraction } from "discord.js"
import { embed, Errors, xcf } from "../../../function"
import { db, table } from "../../../database"

export async function settings_message(interaction: ModalSubmitInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inGuild()) return xcf(interaction)

        const message = interaction.fields.getTextInputValue("message")
        const data: typeof table.settings.$inferInsert = {
            id: interaction.user.id,
            level_message: message === "off" ? "" : message === "revert" ? null : message
        }

        const [query] = await db
            .insert(table.settings)
            .values(data)
            .onConflictDoUpdate({
                target: [table.level.id],
                set: data
            })
            .returning()

        let msg = query.level_message
        if (msg === "") msg = "off"
        if (msg === null) msg = "default"

        await interaction.message?.edit({ embeds: embed(`Settings updated:\n• Level up message: ${msg}\n`) })
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}
