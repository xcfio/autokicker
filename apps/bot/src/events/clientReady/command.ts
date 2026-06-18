import {
    Client,
    RESTPostAPIApplicationCommandsJSONBody,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { ChatInput, Context } from "../../interaction"
import { erx } from "../../utils"

export async function command(client: Client<true>) {
    const commands: Array<RESTPostAPIApplicationCommandsJSONBody> = []

    // prettier-ignore
    ChatInput.forEach((cmd) => (validator(cmd.data) ? commands.push(cmd.data) : console.log("Invalid Command", cmd.data)))
    // prettier-ignore
    Context.forEach((ctx) => (ctx.data && typeof ctx.data.name === "string" ? commands.push(ctx.data) : console.log("Invalid Command", ctx.data)))

    try {
        await client.application.commands.set(commands)
        console.log(`Successfully reloaded ${commands.length} application (/) commands.`)
    } catch (error: any) {
        erx(error)
    }
}

function validator(query: RESTPostAPIChatInputApplicationCommandsJSONBody) {
    if (!query) return false
    if (typeof query.name !== "string") return false
    if (typeof query.description !== "string") return false
    if (!/^[a-z\-_]{1,32}$/u.test(query.name)) return false

    if (query.options) {
        for (const option of query.options) {
            if (typeof option.name !== "string") return false
            if (typeof option.description !== "string") return false
        }
    }
    return true
}
