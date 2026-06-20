import { AnySelectMenuInteraction, ComponentType } from "discord.js"
import { message, isInvalid } from "../../../utils"
import { autokick_log_channel } from "./channel"
import { autokick_log_remove } from "./remove"
import { autokick_log_text } from "./text"
import { return_handler } from "../return"
import { autokick_log_add } from "./add"

export function autokick_log(interaction: AnySelectMenuInteraction) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(message.error(invalid))

    switch (interaction.componentType) {
        case ComponentType.ChannelSelect: {
            return autokick_log_channel(interaction)
        }

        case ComponentType.StringSelect: {
            const stringInteraction = interaction
            const value = stringInteraction.values[0]

            switch (value) {
                case "add": {
                    return autokick_log_add(stringInteraction)
                }
                case "remove": {
                    return autokick_log_remove(stringInteraction)
                }
                case "return": {
                    return return_handler(stringInteraction)
                }
                default: {
                    if (!value.startsWith("remove-")) return interaction.reply(message.error("Invalid option"))
                    const channelId = value.substring("remove-".length)
                    return autokick_log_text(stringInteraction, channelId)
                }
            }
        }

        default: {
            return interaction.reply(message.error("Invalid SelectMenu type"))
        }
    }
}
