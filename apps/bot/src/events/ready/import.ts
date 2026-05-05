import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { basename, Client } from "discord.js"
import config from "../../config"

export async function CommandImport(_arg: Client) {
    if (config.environment === "development") {
        fixImport("src/interaction/chatinput")
        fixImport("src/interaction/context")
    }
}

function fixImport(directory: string) {
    if (config.environment !== "development") return
    const append: Array<string> = []
    const list: Array<string> = []

    const Content = readFileSync(`${directory}/index.ts`, "utf8")
    const base = Content.split("\n")
        .filter((line) => !line.startsWith("import * as"))
        .filter((line) => line !== "\r" && line !== "")

    const fixFn = base.slice(base.findIndex((x) => x.startsWith("export default commands")))
    append.push(base.shift() as string)

    const commands = readdirSync(directory).filter((name) => name !== "index.ts")
    for (let i = 0; i < commands.length; i++) {
        const name = `cmd${i}`
        list.push(name)
        append.push(`import * as ${name} from "./${basename(commands[i])}"\r`)
    }

    append.push("\r")
    append.push(base.shift() as string)

    for (const cmd of list) append.push(`commands.set(${cmd}.data.name, ${cmd} as any)\r`)
    append.push("\r")

    const AppendContent = [append, fixFn].flat().join("\n")
    if (AppendContent !== Content) writeFileSync(`${directory}/index.ts`, AppendContent, "utf8")
}
