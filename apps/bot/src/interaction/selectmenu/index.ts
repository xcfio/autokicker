import { whitelist_add, whitelist_add_user, whitelist_add_role, whitelist_add_channel } from "./whitelist-add"
import { AnySelectMenuInteraction as SelectMenuInteraction } from "discord.js"
import { whitelist_remove } from "./whitelist-remove"
import { warning_remove } from "./warning-remove"
import { cfg_whitelist } from "./whitelist"
import { cfg_warnings } from "./warnings"
import { return_handler } from "./return"
import { cfg } from "./cfg"

export default new Map<string, (arg: SelectMenuInteraction) => any>([
    ["config", cfg],
    // ["cfg-autokick", cfg_autokick],
    ["cfg-whitelist", cfg_whitelist],
    ["cfg-warnings", cfg_warnings],
    ["whitelist-remove", whitelist_remove],
    ["warning-remove", warning_remove],
    ["whitelist-add-type", whitelist_add],
    ["whitelist-add-user", whitelist_add_user],
    ["whitelist-add-role", whitelist_add_role],
    ["whitelist-add-channel", whitelist_add_channel],
    ["return", return_handler]
] as Array<[string, (arg: any) => any]>)
