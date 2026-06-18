import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { db, Emoji, erx, component, xcf } from "../../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"

export async function whitelist_list(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return void xcf(interaction)

        const entries = await db.select().from(table.whitelist).where(eq(table.whitelist.guildId, interaction.guildId))

        const list = entries.length
            ? entries
                  .map((e) => {
                      const prefix = e.type === "user" ? "@" : e.type === "role" ? "&" : "#"
                      return `${e.type}: ${prefix}${e.entry}`
                  })
                  .join("\n")
            : "No whitelist entries found."

        await interaction.editReply({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("shield")} Whitelist Entries`
                        },
                        { type: ComponentType.Separator },
                        {
                            type: ComponentType.TextDisplay,
                            content: "```\n" + list + "\n```"
                        },
                        component.whitelist()
                    ]
                }
            ]
        })
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
