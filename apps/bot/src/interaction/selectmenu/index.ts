import { AnySelectMenuInteraction as SelectMenuInteraction } from "discord.js"
import { whitelist_remove } from "./whitelist-remove"
import { autokick_action } from "./autokick-action"
import { warning_remove } from "./warning-remove"
import { whitelist_add } from "./whitelist-add"
import { autokick_log } from "./autokick-log"
import { cfg_whitelist } from "./whitelist"
import { cfg_warnings } from "./warnings"
import { cfg_autokick } from "./autokick"
import { return_handler } from "./return"
import { cfg } from "./cfg"

export default new Map<string, (arg: SelectMenuInteraction) => any>([
    ["whitelist-remove", whitelist_remove],
    ["autokick-action", autokick_action],
    ["warning-remove", warning_remove],
    ["cfg-whitelist", cfg_whitelist],
    ["whitelist-add", whitelist_add],
    ["cfg-autokick", cfg_autokick],
    ["cfg-warnings", cfg_warnings],
    ["autokick-log", autokick_log],
    ["return", return_handler],
    ["config", cfg]
] as Array<[string, (arg: any) => any]>)
