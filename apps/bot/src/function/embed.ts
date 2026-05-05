import { APIEmbed } from "discord.js"

export function embed(description: string): Array<APIEmbed>
export function embed(embed: APIEmbed): Array<APIEmbed>
export function embed(arg: APIEmbed | string) {
    const color = 0x5865f2
    return [typeof arg === "string" ? { color, description: arg } : { color, ...arg }]
}
