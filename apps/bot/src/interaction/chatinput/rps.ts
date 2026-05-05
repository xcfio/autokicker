import {
    ChatInputCommandInteraction,
    ButtonStyle,
    ButtonInteraction,
    ComponentType,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    InteractionContextType
} from "discord.js"
import { embed } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "rps",
    description: "Play Rock-paper-scissors",
    contexts: [InteractionContextType.Guild]
}

const set = new Set()
const options = ["Rock", "Paper", "Scissors"] as const
const emoji = new Map<(typeof options)[number], string>([
    ["Rock", "🪨"],
    ["Paper", "📄"],
    ["Scissors", "✂"]
])

export async function run(interaction: ChatInputCommandInteraction) {
    if (set.has(interaction.user)) {
        return interaction.reply("403 - Oh no...... You're already in a rps game! Finish that one first.")
    } else {
        set.add(interaction.user)
        setTimeout(async () => set.delete(interaction.user.id), 600_000)
    }

    const response = await interaction.reply({
        embeds: embed({
            title: options.join(", "),
            description: `Choose your weapon <t:${Math.round((Date.now() + 20000) / 1000)}:R>`,
            footer: { text: "Choose Rock, Paper or Scissors | Time: 20 Second" }
        }),
        components: [
            {
                type: ComponentType.ActionRow,
                components: options.map((weapon) => ({
                    label: weapon,
                    custom_id: `rps-${weapon}`,
                    style: ButtonStyle.Primary,
                    type: ComponentType.Button,
                    emoji: {
                        name: emoji.get(weapon)
                    }
                }))
            }
        ]
    })

    const collector = response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 20000 })

    collector.on("collect", (int: ButtonInteraction) => {
        Collector(int)
        collector.stop()
    })

    collector.on("end", async (collected) => {
        if (collected.size === 0) {
            set.delete(interaction.user)
            await response.edit({ embeds: embed("Time Up......."), components: [] })
        }
    })
}

function Collector(interaction: ButtonInteraction) {
    if (interaction.user.id !== interaction.message.interactionMetadata?.user.id) {
        return interaction.reply("403 - Oh no...... that is not your interaction")
    }

    const BotChoice = options[Math.floor(Math.random() * options.length)]
    const UserChoice = (interaction.customId.split(/-/).pop() ?? "Unknown") as (typeof options)[number] | "Unknown"

    interaction.update({
        embeds: embed({
            description: `I chose: ${BotChoice}\nYou chose: ${UserChoice}`,
            footer: { text: GetResult(BotChoice, UserChoice) }
        }),
        components: []
    })

    set.delete(interaction.user)
}

function GetResult(BotChoice: (typeof options)[number] | "Unknown", UserChoice: (typeof options)[number] | "Unknown") {
    if (BotChoice === UserChoice) return "It's a tie!"
    if (UserChoice === "Rock" && BotChoice === "Scissors") return "You win!"
    if (UserChoice === "Paper" && BotChoice === "Rock") return "You win!"
    if (UserChoice === "Scissors" && BotChoice === "Paper") return "You win!"
    if (BotChoice === "Rock" && UserChoice === "Scissors") return "I win!"
    if (BotChoice === "Paper" && UserChoice === "Rock") return "I win!"
    if (BotChoice === "Scissors" && UserChoice === "Paper") return "I win!"
    return "Unknown result"
}
