import { ModalSubmitInteraction } from "discord.js"
import autokickConfigModal from "./autokick-config"

export default new Map<string, (arg: ModalSubmitInteraction) => any>([
    ["autokick_config_modal", autokickConfigModal]
])
