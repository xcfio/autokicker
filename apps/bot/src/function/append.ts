import { existsSync, mkdirSync } from "node:fs"
import { appendJSON } from "coolice"
import { path, pathdir } from "../type"
import { Time } from "./formatter"

export function append(Path: (typeof path)[number], data: object) {
    const obj = { time: Time(), ...data }
    if (!existsSync(pathdir)) mkdirSync(pathdir)
    appendJSON(`${pathdir}/${Path}.json`, obj, { force: true })
}
