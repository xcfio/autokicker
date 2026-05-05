import { ButtonComponentData, ButtonInteraction, ComponentType, MessageFlags } from "discord.js"
import { TicTacToeComponent } from "../chatinput/tictactoe"
import { Status, TicTacToeBoard, TicTacToe } from "ttt-ts"
import { xcf } from "../../function"

const BOT_SYMBOL = "x"
export async function TicTacToeButton(interaction: ButtonInteraction) {
    const boardPos = interaction.customId.split("-")
    const col = parseInt(boardPos.pop() ?? "")
    const row = parseInt(boardPos.pop() ?? "")
    const type = boardPos.pop() as "y" | "n"

    const ComponentBoard = interaction.message.components.map((row) => {
        if (row.type !== ComponentType.ActionRow) return xcf(interaction)
        const obj = row.components as Array<ButtonComponentData>
        return obj.map((button) => (button.label === "/" ? null : button.label?.toLowerCase()))
    }) as TicTacToeBoard

    if (ComponentBoard[row][col] !== null) {
        return await interaction.reply({
            content: "This cell is already taken. Try again.",
            flags: MessageFlags.Ephemeral
        })
    }

    ComponentBoard[row][col] = BOT_SYMBOL === "x" ? "o" : "x"
    const { status, board, placement } = TicTacToe(ComponentBoard, BOT_SYMBOL, type === "y")

    if (status === Status.Continue) {
        return await interaction.update({
            components: TicTacToeComponent(board, type),
            content:
                `You Selected Row: ${row + 1}, Col: ${col + 1}\n` +
                `Bot Selected Row: ${placement.row + 1}, Col: ${placement.col + 1}`
        })
    }

    if (status === Status.Draw) {
        return await interaction.update({
            content: "It's a draw!",
            components: TicTacToeComponent(board, type, true)
        })
    }

    if (status === Status.X || status === Status.O) {
        return await interaction.update({
            content: `${status === (BOT_SYMBOL === "x" ? Status.X : Status.O) ? "Bot" : "You"} wins!`,
            components: TicTacToeComponent(board, type, true)
        })
    }
}
