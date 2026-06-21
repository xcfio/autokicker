import { MessageReaction, User } from "discord.js"
import { trackActivity } from "../../utils"

export default async function messageReactionAdd(reaction: MessageReaction, user: User) {
    if (user.bot || !reaction.message.guild) return
    await trackActivity(reaction.message.guild.id, user.id, "reaction")
}
