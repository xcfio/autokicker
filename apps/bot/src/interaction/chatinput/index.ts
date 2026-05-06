import { ChatInputCommandObject } from "../../type"
import * as test from "./test.ts"

const commands = new Map<string, ChatInputCommandObject>()
commands.set(test.data.name, test as any)

export default commands
