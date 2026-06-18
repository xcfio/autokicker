import { ComponentType, MessageFlags, StringSelectMenuInteraction } from "discord.js"
import { component, db, Emoji, erx, xcf } from "../../../utils"
import { table } from "@repo/database"
import { eq } from "drizzle-orm"
import { blue } from "colorette"
import { duration } from "@repo/utils"

export async function status(interaction: StringSelectMenuInteraction) {
    try {
        await interaction.deferUpdate()
        if (!interaction.inCachedGuild()) return void xcf(interaction)

        const [guild] = await db.select().from(table.guild).where(eq(table.guild.id, interaction.guildId))
        const whitelistCount = (
            await db.select().from(table.whitelist).where(eq(table.whitelist.guildId, interaction.guildId))
        ).length

        const enabled = guild?.enabled ?? false
        const threshold = Temporal.Duration.from({ minutes: guild?.threshold ?? 43200 })
        const action = guild?.action ?? "kick"
        const logChannels = guild?.logChannel ?? []
        const kickMessage = guild?.kickMessage ?? "Default"
        const warningStages = guild?.warningStages ?? []

        await interaction.editReply({
            flags: [MessageFlags.IsComponentsV2],
            components: [
                {
                    type: ComponentType.Container,
                    components: [
                        {
                            type: ComponentType.TextDisplay,
                            content: `## ${Emoji("list")} Configuration Status`
                        },
                        { type: ComponentType.Separator },
                        {
                            type: ComponentType.TextDisplay,
                            content: `### ${Emoji("autokicker")} AutoKick Settings`
                        },
                        { type: ComponentType.Separator },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${blue("Status")}: ${enabled ? "Enabled" : "Disabled"}\n` +
                                `${blue("Threshold")}: ${duration(threshold)}\n` +
                                `${blue("Action")}: ${action}\n` +
                                `${blue("Log Channels")}: ${logChannels.length ? logChannels.map((c: string) => `#${c}`).join(", ") : "None"}\n` +
                                `${blue("Kick Message")}: ${kickMessage === "Default" ? "Default" : kickMessage.length > 50 ? kickMessage.slice(0, 50) + "..." : kickMessage}\n` +
                                "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: `### ${Emoji("shield")} Whitelist`
                        },
                        { type: ComponentType.Separator },
                        {
                            type: ComponentType.TextDisplay,
                            content: "```ansi\n" + `${blue("Entries")}: ${whitelistCount}\n` + "```"
                        },
                        {
                            type: ComponentType.TextDisplay,
                            content: `### ${Emoji("exclamation")} Warning Stages`
                        },
                        { type: ComponentType.Separator },
                        {
                            type: ComponentType.TextDisplay,
                            content:
                                "```ansi\n" +
                                `${blue("Stages")}:\n${
                                    warningStages.length
                                        ? warningStages
                                              .sort((a: number, b: number) => b - a)
                                              .map((minutes) => `- ${duration(Temporal.Duration.from({ minutes }))}`)
                                              .join("\n")
                                        : "None"
                                }\n` +
                                "```"
                        },
                        component.cfg()
                    ]
                }
            ]
        })
    } catch (error) {
        erx(error as Error)
        void xcf(interaction)
    }
}
