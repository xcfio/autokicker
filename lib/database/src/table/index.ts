import { whitelist } from "./whitelist"
import { warnings } from "./warnings"
import { activity } from "./activity"
import { guild } from "./guild"
import { user } from "./user"

export const table = {
    whitelist,
    activity,
    warnings,
    guild,
    user
} as const
