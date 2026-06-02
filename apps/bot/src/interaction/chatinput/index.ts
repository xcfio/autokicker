import { ChatInputCommandObject } from "../../type"
import * as ping from "./ping.ts"
import * as status from "./status.ts"
import * as autokick from "./autokick.ts"

const commands = new Map<string, ChatInputCommandObject>()
commands.set(ping.data.name, ping as any)
commands.set(status.data.name, status as any)
commands.set(autokick.data.name, autokick as any)

export default commands
