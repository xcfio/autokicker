import { MessageFlags, ModalSubmitInteraction } from "discord.js"
import { embed, Errors, xcf } from "../../../function"
import { db, table } from "../../../database"

export async function card_background(interaction: ModalSubmitInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return xcf(interaction)
        const url = interaction.fields.getTextInputValue("image")

        if (url === "revert") {
            await db
                .insert(table.card)
                .values({ id: interaction.user.id, background: null })
                .onConflictDoUpdate({ target: table.card.id, set: { background: null } })
            return await interaction.message?.edit({ embeds: embed(`Successfully removed card background`) })
        }

        const URLRegex = /^(https?:\/\/)?([a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(\/[^\s]*)?$/
        if (!URLRegex.test(url)) {
            return await interaction.message?.edit({ embeds: embed("Invalid URL. Please provide a valid image URL.") })
        }

        const response = await fetch(url)
        const type = response.headers.get("content-type")

        const validTypes = ["image/jpeg", "image/png", "image/webp", "image/svg+xml", "image/bmp", "image/tiff"]

        if (!validTypes.includes(type ?? "")) {
            return await interaction.message?.edit({
                embeds: embed({
                    description: `400 - Invalid \`content-type\`. Accepted types are: ${validTypes
                        .map((text) => `\`${text}\``)
                        .join(", ")}`
                })
            })
        }

        const [card] = await db
            .insert(table.card)
            .values({ id: interaction.user.id, background: url })
            .onConflictDoUpdate({ target: table.card.id, set: { background: url } })
            .returning()

        await interaction.message?.edit({ embeds: embed(`Successfully set card background to ${card.background}`) })
        await interaction.followUp({
            flags: MessageFlags.Ephemeral,
            content: "Image preview",
            files: [{ attachment: url }]
        })
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}
