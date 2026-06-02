import { VoiceState } from "discord.js"
import { trackActivity } from "../../function/tracker"

export default async function voiceStateUpdate(_oldState: VoiceState, newState: VoiceState) {
    if (!newState.channel || newState.member?.user.bot) return
    if (!newState.guild) return
    await trackActivity(newState.guild.id, newState.member!.id, "voice")
}
