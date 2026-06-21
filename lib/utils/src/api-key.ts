import { createHmac, randomInt, timingSafeEqual } from "node:crypto"

const orderArray = [
    ["c", "e"],
    ["e", "c"]
] as const

const hmac = (secret: string, ens: bigint) =>
    BigInt("0x" + createHmac("sha256", secret).update(ens.toString()).digest("hex"))
        .toString(36)
        .padStart(50, "0")

export const key = {
    gen: (secret: string) => {
        const time = Temporal.Now.instant()
        const order = orderArray[randomInt(orderArray.length)]

        const obj = { c: time.epochNanoseconds.toString(36).padStart(12, "0"), e: hmac(secret, time.epochNanoseconds) }
        return `f2${order.join("")}${order.map((x) => obj[x]).join("")}`
    },
    verify: (secret: string, key: string) => {
        if (key.length !== 66) return false
        if (!key.startsWith("f2")) return false

        const order = key.slice(2, 4) as "ce" | "ec"
        if (order !== "ce" && order !== "ec") return false

        const body = key.slice(4)

        const c: string = order === "ce" ? body.slice(0, 12) : body.slice(50)
        const e: string = order === "ce" ? body.slice(12) : body.slice(0, 50)

        if (c.length !== 12 || e.length !== 50) return false

        try {
            const epochNano = c.split("").reduce((acc, char) => acc * 36n + BigInt(parseInt(char, 36)), 0n)
            const now = Temporal.Now.instant().epochNanoseconds

            const diffMs = Number((now - epochNano) / 1_000_000n)
            if (diffMs < 0 || diffMs > 120_000) return false

            const expected = hmac(secret, epochNano)
            return timingSafeEqual(Buffer.from(e), Buffer.from(expected))
        } catch {
            return false
        }
    }
}
