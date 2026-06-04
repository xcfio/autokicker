import { AllowedMentionsTypes } from "discord-api-types/v10"
import { SnowTransfer } from "snowtransfer"
import config from "../config"

export const client = new SnowTransfer(config.discord.token, {
    allowed_mentions: {
        replied_user: true,
        parse: [AllowedMentionsTypes.Everyone, AllowedMentionsTypes.Role, AllowedMentionsTypes.User]
    }
})
