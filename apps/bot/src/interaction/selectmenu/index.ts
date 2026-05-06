import { AnySelectMenuInteraction as SelectMenuInteraction } from "discord.js"

export default new Map<string, (arg: SelectMenuInteraction) => any>([] as Array<[string, (arg: any) => any]>)
