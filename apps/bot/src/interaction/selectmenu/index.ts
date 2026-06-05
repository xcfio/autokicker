import { AnySelectMenuInteraction as SelectMenuInteraction } from "discord.js"
import { warning_remove } from "./warning-remove"
import { cfg_warnings } from "./warnings"
import { return_handler } from "./return"
import { cfg } from "./cfg"

export default new Map<string, (arg: SelectMenuInteraction) => any>([
    ["config", cfg],
    // ["cfg-autokick", cfg_autokick],
    // ["cfg-whitelist", cfg_whitelist],
    ["cfg-warnings", cfg_warnings],
    ["warning-remove", warning_remove],
    ["return", return_handler]
] as Array<[string, (arg: any) => any]>)
