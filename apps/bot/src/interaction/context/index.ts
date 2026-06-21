import { ContextCommandObject } from "../../type"
import * as userInfo from "./user-info.ts"

const commands = new Map<string, ContextCommandObject>()
commands.set(userInfo.data.name, userInfo as any)

export default commands
