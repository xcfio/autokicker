import { trackActivity } from "../../utils"
import { VoiceState } from "discord.js"

export default async function voiceStateUpdate(_oldState: VoiceState, newState: VoiceState) {
    if (!newState.guild || !newState.channel || !newState.member || newState.member.user.bot) return
    await trackActivity(newState.guild.id, newState.member.id, "voice")
}
