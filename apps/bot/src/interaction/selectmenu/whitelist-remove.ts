import { StringSelectMenuInteraction } from "discord.js"
import { db, message, erx, xcf } from "../../utils"
import { return_handler } from "./return"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function whitelist_remove(interaction: StringSelectMenuInteraction) {
    try {
        const value = interaction.values[0]
        if (value === "return") return return_handler(interaction)

        const [entry] = await db.select().from(table.whitelist).where(eq(table.whitelist.id, value))

        if (!entry) {
            return interaction.update(message.error("Whitelist entry does not exist."))
        }

        await db.delete(table.whitelist).where(eq(table.whitelist.id, value))

        const prefix = entry.whitelistType === "user" ? "@" : entry.whitelistType === "role" ? "&" : "#"
        return interaction.update(
            message.success(`Whitelist entry removed: **${entry.whitelistType}: ${prefix}${entry.whitelistId}**.`)
        )
    } catch (error) {
        erx(error as Error)
        xcf(interaction)
    }
}
