import { ContextCommandObject } from "../../type"
import * as user_info from "./user-info.ts"

const commands = new Map<string, ContextCommandObject>()
commands.set(user_info.data.name, user_info as any)

export default commands
