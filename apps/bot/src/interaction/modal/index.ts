import { ModalSubmitInteraction } from "discord.js"
import { card_background, card_name, card_progressbar, card_statistics, card_overlay } from "./card"
import { settings_message } from "./settings"

export default new Map<string, (arg: ModalSubmitInteraction) => any>([
    ["card-background", card_background],
    ["card-name", card_name],
    ["card-overlay", card_overlay],
    ["card-progressbar", card_progressbar],
    ["card-statistics", card_statistics],
    ["settings-message", settings_message]
])
