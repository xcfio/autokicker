import { ModalSubmitInteraction } from "discord.js"
import { cfg_threshold } from "./cfg-threshold"
import { cfg_warning_add } from "./cfg-warning-add"

export default new Map<string, (arg: ModalSubmitInteraction) => any>([
    ["cfg-threshold", cfg_threshold],
    ["cfg-warning-add", cfg_warning_add]
])
