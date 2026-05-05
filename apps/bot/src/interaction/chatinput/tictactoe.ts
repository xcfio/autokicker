import {
    APIActionRowComponent,
    APIButtonComponent,
    ApplicationCommandOptionType,
    ButtonStyle,
    ChatInputCommandInteraction,
    ComponentType,
    InteractionContextType,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { Placeholder, TicTacToeBoard } from "ttt-ts"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "tic-tac-toe",
    description: "Play Tic Tac Toe",
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "strict",
            description: "Is this game will be hard? (default: true)",
            type: ApplicationCommandOptionType.Boolean,
            required: false
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
        content: "Choose a box to continue",
        components: TicTacToeComponent(Placeholder, (interaction.options.getBoolean("strict") ?? true) ? "y" : "n")
    })
}

export function TicTacToeComponent(board: TicTacToeBoard, type: "y" | "n", disabled?: boolean) {
    const customId = TicTacToeGridCoordinatesGenerator(`ttt-${type}`, 3, 3) as Generator<string>
    return board.map((col) => ({
        type: ComponentType.ActionRow,
        components: col.map((row) => {
            switch (row) {
                case "x":
                    return {
                        label: "X",
                        disabled: disabled ?? true,
                        style: ButtonStyle.Danger,
                        type: ComponentType.Button,
                        custom_id: customId.next().value
                    }

                case "o":
                    return {
                        label: "O",
                        disabled: disabled ?? true,
                        style: ButtonStyle.Primary,
                        type: ComponentType.Button,
                        custom_id: customId.next().value
                    }

                default:
                    return {
                        label: "/",
                        disabled: disabled ?? false,
                        style: ButtonStyle.Secondary,
                        type: ComponentType.Button,
                        custom_id: customId.next().value
                    }
            }
        })
    })) as Array<APIActionRowComponent<APIButtonComponent>>
}

function* TicTacToeGridCoordinatesGenerator(text: string, row: number, col: number) {
    for (let r = 0; r < row; r++) for (let c = 0; c < col; c++) yield `${text}-${r}-${c}`
}
