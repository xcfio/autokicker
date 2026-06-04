import { AnySelectMenuInteraction as SelectMenuInteraction } from "discord.js"
import { cfg } from "./cfg"

export default new Map<string, (arg: SelectMenuInteraction) => any>([["config", cfg]] as Array<
    [string, (arg: any) => any]
>)
