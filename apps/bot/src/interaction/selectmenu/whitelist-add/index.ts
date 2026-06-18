import { AnySelectMenuInteraction } from "discord.js"
import { message, isInvalid } from "../../../utils"
import { whitelist_add_type } from "./type"
import { whitelist_add_user } from "./user"
import { whitelist_add_role } from "./role"
import { whitelist_add_channel } from "./channel"

export function whitelist_add(interaction: AnySelectMenuInteraction<"cached">) {
    const invalid = isInvalid(interaction)
    if (invalid) return interaction.reply(message.error(invalid))

    switch (true) {
        case interaction.isStringSelectMenu(): {
            return whitelist_add_type(interaction)
        }

        case interaction.isChannelSelectMenu(): {
            return whitelist_add_channel(interaction)
        }

        case interaction.isRoleSelectMenu(): {
            return whitelist_add_role(interaction)
        }

        case interaction.isUserSelectMenu(): {
            return whitelist_add_user(interaction)
        }

        default: {
            return interaction.reply(message.error("Invalid option"))
        }
    }
}
