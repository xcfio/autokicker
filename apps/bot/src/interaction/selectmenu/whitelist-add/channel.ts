import { ChannelSelectMenuInteraction } from "discord.js"
import { message, erx, xcf, db } from "../../../utils"
import { Snowflake } from "@repo/schema"
import { table } from "@repo/database"
import { Value } from "typebox/value"
import { eq } from "drizzle-orm"
import { Type } from "typebox"

export async function whitelist_add_channel(interaction: ChannelSelectMenuInteraction<"cached">) {
    try {
        const channels = interaction.values

        const exist = await db.select().from(table.whitelist).where(eq(table.whitelist.guildId, interaction.guildId))
        const err = [...Value.Errors(Type.Array(Snowflake, { minItems: 1, maxItems: 3 }), channels)]

        if (err.length) {
            return await interaction.update(message.error(`Invalid channel ID: \`${JSON.stringify(err)}\``))
        }

        if (exist.length + channels.length > 3) {
            return await interaction.update(
                message.error(
                    `Cannot add more than **3** whitelisted. Current whitelisted: **${exist.length}** and you tried to add **${channels.length}**`
                )
            )
        }

        for (const channel of channels) {
            if (!interaction.guild?.channels.cache.has(channel)) {
                return await interaction.update(message.error(`Channel **${channel}** does not exist in this server.`))
            }
        }

        await db.insert(table.whitelist).values(
            channels.map((channel) => ({
                guildId: interaction.guildId,
                type: "channel" as const,
                entry: channel
            }))
        )

        return await interaction.update(
            message.success(`Selected channels ${channels.map((x) => `<#${x}>`).join(", ")} to whitelist.`)
        )
    } catch (error) {
        erx(error as Error)
        await xcf(interaction)
    }
}
