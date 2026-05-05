import { ButtonInteraction } from "discord.js"
import { TicTacToeButton } from "./tictactoe"

export default new Map<string, (arg: ButtonInteraction) => any>([["ttt", TicTacToeButton]])
