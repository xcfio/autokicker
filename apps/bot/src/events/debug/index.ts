import { existsSync, rmSync } from "fs"
import { append } from "../../function"

export default function debug(message: string) {
    try {
        append("debug", { message })
    } catch (error: any) {
        if (existsSync("log/debug.json")) rmSync("log/debug.json", { recursive: true, force: true })
        console.log(error?.message)
    }
}
