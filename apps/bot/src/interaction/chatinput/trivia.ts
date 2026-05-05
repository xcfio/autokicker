import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    ButtonStyle,
    ButtonInteraction,
    APIEmbed,
    ComponentType,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    InteractionContextType
} from "discord.js"
import { embed, Errors, xcf } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "trivia",
    description: "Play Trivia",
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "difficulty",
            description: "Difficulty of Questions",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Any Difficulty",
                    value: ""
                },
                {
                    name: "Easy",
                    value: "&difficulty=easy"
                },
                {
                    name: "Medium",
                    value: "&difficulty=medium"
                },
                {
                    name: "Hard",
                    value: "&difficulty=hard"
                }
            ]
        },
        {
            name: "category",
            description: "Category of Questions",
            type: ApplicationCommandOptionType.String,
            choices: [
                {
                    name: "Any Category",
                    value: ""
                },
                {
                    name: "General Knowledge",
                    value: "&category=9"
                },
                {
                    name: "Entertainment: Books",
                    value: "&category=10"
                },
                {
                    name: "Entertainment: Film",
                    value: "&category=11"
                },
                {
                    name: "Entertainment: Music",
                    value: "&category=12"
                },
                {
                    name: "Entertainment: Musicals & Theatres",
                    value: "&category=13"
                },
                {
                    name: "Entertainment: Television",
                    value: "&category=14"
                },
                {
                    name: "Entertainment: Video Games",
                    value: "&category=15"
                },
                {
                    name: "Entertainment: Board Games",
                    value: "&category=16"
                },
                {
                    name: "Science & Nature",
                    value: "&category=17"
                },
                {
                    name: "Science: Computers",
                    value: "&category=18"
                },
                {
                    name: "Science: Mathematics",
                    value: "&category=19"
                },
                {
                    name: "Mythology",
                    value: "&category=20"
                },
                {
                    name: "Sports",
                    value: "&category=21"
                },
                {
                    name: "Geography",
                    value: "&category=22"
                },
                {
                    name: "History",
                    value: "&category=23"
                },
                {
                    name: "Politics",
                    value: "&category=24"
                },
                {
                    name: "Art",
                    value: "&category=25"
                },
                {
                    name: "Celebrities",
                    value: "&category=26"
                },
                {
                    name: "Animals",
                    value: "&category=27"
                },
                {
                    name: "Vehicles",
                    value: "&category=28"
                },
                {
                    name: "Entertainment: Comics",
                    value: "&category=29"
                },
                {
                    name: "Science: Gadgets",
                    value: "&category=30"
                },
                {
                    name: "Entertainment: Japanese Anime & Manga",
                    value: "&category=31"
                },
                {
                    name: "Entertainment: Cartoon & Animations",
                    value: "&category=32"
                }
            ]
        }
    ]
}

const map = new Map<string, number>()
let category: string, difficulty: string, token: string, obj: Array<result>

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply()
    if (map.has(interaction.user.id)) {
        return interaction.followUp("403 - Oh no...... You're already in a trivia game! Finish that one first.")
    } else {
        map.set(interaction.user.id, 0)
        setTimeout(async () => map.delete(interaction.user.id), 600_000)
    }

    category = interaction.options.getString("category") ?? ""
    difficulty = interaction.options.getString("difficulty") ?? ""
    token = ((await (await fetch("https://opentdb.com/api_token.php?command=request")).json()) as any).token ?? ""
    Reply(interaction)
}

async function Reply(interaction: ChatInputCommandInteraction | ButtonInteraction) {
    const result = await Fetch()
    if (!result) return xcf(interaction)

    const response = await interaction.followUp({
        embeds: embeds(result.category, result.question, "Choose True or False | Time: 20 Second"),
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "True",
                        custom_id: "trivia-true",
                        style: ButtonStyle.Success,
                        type: ComponentType.Button
                    },
                    {
                        label: "False",
                        custom_id: "trivia-false",
                        style: ButtonStyle.Danger,
                        type: ComponentType.Button
                    }
                ]
            }
        ]
    })

    const collector = response.createMessageComponentCollector({ time: 20000, componentType: ComponentType.Button })
    collector.on("collect", async (int) => {
        Collector(int, result, interaction.user.id)
        collector.stop()
    })

    collector.on("end", async (collected) => {
        if (collected.size === 0) {
            map.delete(interaction.user.id)
            response.edit({
                components: [],
                embeds: embeds(result.category, result.question, `Time Up...`, result.correct_answer, 0xfee75c)
            })
        }
    })
}

async function Collector(interaction: ButtonInteraction, result: result, user: string) {
    if (interaction.user.id !== user) return interaction.reply("403 - Oh no...... that is not your interaction")
    const UserAnswer = interaction.customId.split(/-/).pop() === "true" ? true : false
    const CorrectAnswer = result.correct_answer.toLowerCase() === "true" ? true : false
    const score = map.get(user) ?? 0

    if (UserAnswer === CorrectAnswer) {
        map.set(interaction.user.id, score + 1)
        interaction
            .update({
                components: [],
                embeds: embeds(
                    result.category,
                    result.question,
                    `Correct, Move to next question | Your score is ${score + 1}`,
                    "Answer: " + result.correct_answer,
                    0x57f287
                )
            })
            .then(() => Reply(interaction))
    } else {
        map.delete(user)
        interaction.update({
            components: [],
            embeds: embeds(
                result.category,
                result.question,
                `Incorrect | Your score is ${score}`,
                "Answer: " + result.correct_answer,
                0xfee75c
            )
        })
    }
}

function embeds(title: string, question: string, footer: string, ans?: string, color?: number): Array<APIEmbed> {
    const embedObj: APIEmbed = { footer: { text: footer } }

    embedObj.title = `Trivia: ${decode(title)}`
    embedObj.description = `Question: ${decode(question)}\n${
        ans ?? `Choose answer <t:${Math.round((Date.now() + 20000) / 1000)}:R>`
    }`

    if (color) embedObj.color = color
    return embed(embedObj)
}

function decode(string: string) {
    return string
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&rsquo;/g, "’")
        .replace(/&amp;/g, "&")
        .replace(/&#039;/g, "'")
}

async function Fetch(): Promise<result | null> {
    if (obj && obj.length) return obj.shift() ?? null
    let data

    try {
        data = await fetch(`https://opentdb.com/api.php?amount=5${category}${difficulty}&token=${token}&type=boolean`)
        if (!data) return null
        data = (await data.json()) as any
        if (data.response_code) return null
        obj = data.results
    } catch (error: any) {
        Errors(error)
        return null
    }

    return obj.shift() ?? null
}

interface result {
    category: string
    type: string
    difficulty: string
    question: string
    correct_answer: string
    incorrect_answers: Array<string>
}
