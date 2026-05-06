import { ClientEvents } from "discord.js"
import ready from "./clientReady"
import interactionCreate from "./interactionCreate"

export default new Map<keyof ClientEvents, (...arg: any) => any>([
    ["clientReady", ready],
    ["interactionCreate", interactionCreate]
])
