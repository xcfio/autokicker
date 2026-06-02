import { ClientEvents } from "discord.js"
import ready from "./clientReady"
import interactionCreate from "./interactionCreate"
import messageCreate from "./messageCreate"
import voiceStateUpdate from "./voiceStateUpdate"
import messageReactionAdd from "./messageReactionAdd"

export default new Map<keyof ClientEvents, (...arg: any) => any>([
    ["clientReady", ready],
    ["interactionCreate", interactionCreate],
    ["messageCreate", messageCreate],
    ["voiceStateUpdate", voiceStateUpdate],
    ["messageReactionAdd", messageReactionAdd]
])
