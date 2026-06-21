import { ChatInputCommandObject } from "../../type"
import * as config from "./config.ts"
import * as ping from "./ping.ts"
import * as status from "./status.ts"

const commands = new Map<string, ChatInputCommandObject>()
commands.set(config.data.name, config as any)
commands.set(ping.data.name, ping as any)
commands.set(status.data.name, status as any)

export default commands
