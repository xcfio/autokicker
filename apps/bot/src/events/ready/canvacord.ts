import { Client } from "discord.js"
import { Font } from "canvacord"

export async function canvacord(_arg: Client) {
    Font.fromBuffer(
        Buffer.from(
            await (await fetch("https://utfs.io/f/yvWSBarFMIDgqxOIt2nAHWf17NmISgCow5qb094knUBFxZ36")).arrayBuffer()
        )
    )
}
