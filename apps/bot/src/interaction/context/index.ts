import { ContextCommandObject } from "../../type"
import * as cmd0 from "./inspect.ts"
import * as cmd1 from "./level.ts"
import * as cmd2 from "./user-Info.ts"

const commands = new Map<string, ContextCommandObject>()
commands.set(cmd0.data.name, cmd0 as any)
commands.set(cmd1.data.name, cmd1 as any)
commands.set(cmd2.data.name, cmd2 as any)

export default commands
