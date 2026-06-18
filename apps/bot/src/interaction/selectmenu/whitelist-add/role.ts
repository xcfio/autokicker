import { RoleSelectMenuInteraction } from "discord.js"
import { message, erx, xcf, db } from "../../../utils"
import { Whitelist } from "@repo/schema"
import { table } from "@repo/database"
import { Value } from "typebox/value"
import { eq } from "drizzle-orm"
import { Type } from "typebox"

export async function whitelist_add_role(interaction: RoleSelectMenuInteraction) {
    try {
        if (!interaction.inCachedGuild()) return void xcf(interaction)
        const roles = interaction.values

        const err = Value.Errors(Type.Array(Type.Index(Whitelist, ["entry"]), { minItems: 1, maxItems: 3 }), roles)
        if (err.length) {
            return await interaction.update(
                message.error(`Invalid role \`\`\`json\n${JSON.stringify(err, null, 4)}\n\`\`\``)
            )
        }

        const exist = await db.select().from(table.whitelist).where(eq(table.whitelist.guildId, interaction.guildId))
        if (exist.length + roles.length > 3) {
            return await interaction.update(
                message.error(
                    `Cannot add more than **3** whitelisted. Current whitelisted: **${exist.length}** and you tried to add **${roles.length}**`
                )
            )
        }

        for (const role of roles) {
            if (!interaction.guild?.roles.cache.has(role)) {
                return await interaction.update(message.error(`Role <@&${role}> does not exist in this server.`))
            }

            if (exist.some((v) => v.entry === role)) {
                return await interaction.update(message.error(`Role <@&${role}> is already whitelisted. (ID: ${role})`))
            }
        }

        await db.insert(table.whitelist).values(
            roles.map((role) => ({
                guildId: interaction.guildId,
                type: "role" as const,
                entry: role
            }))
        )

        return await interaction.update(
            message.success(`Selected roles ${roles.map((x) => `<@&${x}>`).join(", ")} to whitelist.`)
        )
    } catch (error) {
        erx(error as Error)
        await xcf(interaction)
    }
}
