import { ClientEvents } from "discord.js"
import guildMemberRemove from "./guildMemberRemove"
import interactionCreate from "./interactionCreate"
import guildMemberAdd from "./guildMemberAdd"
import messageUpdate from "./messageUpdate"
import messageCreate from "./messageCreate"
import messageDelete from "./messageDelete"
import threadCreate from "./threadCreate"
import guildCreate from "./guildCreate"
import debug from "./debug"
import ready from "./ready"

export default new Map<keyof ClientEvents, (...arg: any) => any>([
    ["debug", debug],
    ["guildCreate", guildCreate],
    ["guildMemberAdd", guildMemberAdd],
    ["guildMemberRemove", guildMemberRemove],
    ["interactionCreate", interactionCreate],
    ["messageCreate", messageCreate],
    ["messageDelete", messageDelete],
    ["messageUpdate", messageUpdate],
    ["ready", ready],
    ["threadCreate", threadCreate]
])
