import { ChatInputCommandObject } from "../../type"
import * as config from "./config.ts"
import * as ping from "./ping.ts"
import * as status from "./status.ts"

const commands = new Map<string, ChatInputCommandObject>()
commands.set(config.data.name, config)
commands.set(ping.data.name, ping)
commands.set(status.data.name, status)

export default commands
