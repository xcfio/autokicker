import { AnySelectMenuInteraction as SelectMenuInteraction } from "discord.js"
import { suggestion } from "./suggestion"
import { settings } from "./settings"
import { config } from "./config"
import { card } from "./card"

export default new Map<string, (arg: SelectMenuInteraction) => any>([
    ["suggestion", suggestion],
    ["settings", settings],
    ["card", card],
    ["config", config]
] as Array<[string, (arg: any) => any]>)
