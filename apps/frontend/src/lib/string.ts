const reg = /^\d+\.\s*/u

export function SafeString(x: string) {
    return x.replace(reg, "").trim().replaceAll(" ", "-").toLowerCase()
}
