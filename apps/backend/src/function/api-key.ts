import { createHmac, randomInt, timingSafeEqual } from "node:crypto"

const orderArray = [
    ["c", "e"],
    ["e", "c"]
] as const

export const key = {
    gen: () => {
        const time = Temporal.Now.instant()
        const order = orderArray[randomInt(orderArray.length)]
        const hmac = createHmac("sha256", process.env.API_SECRET).update(time.epochNanoseconds.toString()).digest("hex")

        const obj = {
            c: time.epochNanoseconds.toString(36).padStart(12, "0"),
            e: BigInt("0x" + hmac)
                .toString(36)
                .padStart(50, "0")
        }

        return `f2${order.join("")}${order.map((x) => obj[x]).join("")}`
    },
    verify: (key: string) => {
        if (key.length !== 66) return false
        if (!key.startsWith("f2")) return false

        const order = key.slice(2, 4) as "ce" | "ec"
        if (order !== "ce" && order !== "ec") return false

        const body = key.slice(4)

        const c: string = order === "ce" ? body.slice(0, 12) : body.slice(50)
        const e: string = order === "ce" ? body.slice(12) : body.slice(0, 50)

        if (c.length !== 12 || e.length !== 50) return false

        try {
            const epochNano = [...c].reduce((acc, char) => acc * 36n + BigInt(parseInt(char, 36)), 0n)
            const now = Temporal.Now.instant().epochNanoseconds
            const diffMs = Number((now - epochNano) / 1_000_000n)

            if (diffMs < 0 || diffMs > 120_000) return false
            const hmac = createHmac("sha256", process.env.API_SECRET).update(epochNano.toString()).digest("hex")

            const expected = BigInt("0x" + hmac)
                .toString(36)
                .padStart(50, "0")

            return timingSafeEqual(Buffer.from(e), Buffer.from(expected))
        } catch {
            return false
        }
    }
}
