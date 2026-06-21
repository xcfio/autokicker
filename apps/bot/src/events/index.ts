import messageReactionAdd from "./messageReactionAdd"
import interactionCreate from "./interactionCreate"
import voiceStateUpdate from "./voiceStateUpdate"
import messageCreate from "./messageCreate"
import ready from "./clientReady"
import { ClientEvents } from "discord.js"

export default new Map<keyof ClientEvents, (...arg: any) => any>([
    ["clientReady", ready],
    ["interactionCreate", interactionCreate],
    ["messageCreate", messageCreate],
    ["voiceStateUpdate", voiceStateUpdate],
    ["messageReactionAdd", messageReactionAdd]
])
