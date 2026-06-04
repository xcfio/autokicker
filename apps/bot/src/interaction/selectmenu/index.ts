import { AnySelectMenuInteraction as SelectMenuInteraction } from "discord.js"
import { cfg_warnings } from "./warnings"
import { cfg } from "./cfg"

export default new Map<string, (arg: SelectMenuInteraction) => any>([
    ["config", cfg],
    // ["cfg-autokick", cfg_autokick],
    // ["cfg-whitelist", cfg_whitelist],
    ["cfg-warnings", cfg_warnings]
] as Array<[string, (arg: any) => any]>)
