import { UserSelectMenuInteraction } from "discord.js"
import { message, erx, xcf, db } from "../../../utils"
import { Snowflake } from "@repo/schema"
import { table } from "@repo/database"
import { Value } from "typebox/value"
import { eq } from "drizzle-orm"
import { Type } from "typebox"

export async function whitelist_add_user(interaction: UserSelectMenuInteraction<"cached">) {
    try {
        const users = interaction.values

        const exist = await db.select().from(table.whitelist).where(eq(table.whitelist.guildId, interaction.guildId))
        const err = [...Value.Errors(Type.Array(Snowflake, { minItems: 1, maxItems: 3 }), users)]

        if (err.length) {
            return await interaction.update(message.error(`Invalid user ID: \`${JSON.stringify(err)}\``))
        }

        if (exist.length + users.length > 3) {
            return await interaction.update(
                message.error(
                    `Cannot add more than **3** whitelisted. Current whitelisted: **${exist.length}** and you tried to add **${users.length}**`
                )
            )
        }

        for (const user of users) {
            if (!interaction.guild?.members.cache.has(user)) {
                return await interaction.update(message.error(`User **${user}** does not exist in this server.`))
            }
        }

        await db.insert(table.whitelist).values(
            users.map((user) => ({
                guildId: interaction.guildId,
                type: "user" as const,
                entry: user
            }))
        )

        return await interaction.update(
            message.success(`Selected users ${users.map((x) => `<@${x}>`).join(", ")} to whitelist.`)
        )
    } catch (error) {
        erx(error as Error)
        await xcf(interaction)
    }
}
