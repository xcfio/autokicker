import { ClientEvents } from "discord.js"

export default new Map<keyof ClientEvents, (...arg: any) => any>([])
