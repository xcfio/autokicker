import { ChatInputCommandObject } from "../../type"
import * as cmd0 from "./bug.ts"
import * as cmd1 from "./build.ts"
import * as cmd2 from "./config.ts"
import * as cmd3 from "./eval.ts"
import * as cmd4 from "./export.ts"
import * as cmd5 from "./help.ts"
import * as cmd6 from "./leaderboard.ts"
import * as cmd7 from "./level.ts"
import * as cmd8 from "./rps.ts"
import * as cmd9 from "./say.ts"
import * as cmd10 from "./set.ts"
import * as cmd11 from "./status.ts"
import * as cmd12 from "./test.ts"
import * as cmd13 from "./tictactoe.ts"
import * as cmd14 from "./trivia.ts"
import * as cmd15 from "./weather.ts"
import * as cmd16 from "./whois.ts"

const commands = new Map<string, ChatInputCommandObject>()
commands.set(cmd0.data.name, cmd0 as any)
commands.set(cmd1.data.name, cmd1 as any)
commands.set(cmd2.data.name, cmd2 as any)
commands.set(cmd3.data.name, cmd3 as any)
commands.set(cmd4.data.name, cmd4 as any)
commands.set(cmd5.data.name, cmd5 as any)
commands.set(cmd6.data.name, cmd6 as any)
commands.set(cmd7.data.name, cmd7 as any)
commands.set(cmd8.data.name, cmd8 as any)
commands.set(cmd9.data.name, cmd9 as any)
commands.set(cmd10.data.name, cmd10 as any)
commands.set(cmd11.data.name, cmd11 as any)
commands.set(cmd12.data.name, cmd12 as any)
commands.set(cmd13.data.name, cmd13 as any)
commands.set(cmd14.data.name, cmd14 as any)
commands.set(cmd15.data.name, cmd15 as any)
commands.set(cmd16.data.name, cmd16 as any)

export default commands
