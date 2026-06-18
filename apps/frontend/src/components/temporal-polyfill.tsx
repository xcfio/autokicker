// oxlint-disable

"use client"

import { Temporal, toTemporalInstant } from "temporal-polyfill"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { toast } from "sonner"

if (typeof globalThis.Temporal === "undefined") {
    // @ts-expect-error - Polyfill Temporal
    globalThis.Temporal = Temporal
    // @ts-expect-error - Polyfill Temporal
    globalThis.Temporal.polyfilled = true
}

if (typeof Date.prototype.toTemporalInstant !== "function") {
    // @ts-expect-error - Polyfill Temporal
    Date.prototype.toTemporalInstant = toTemporalInstant
}

export function TemporalPolyfill() {
    const router = useRouter()

    useEffect(() => {
        if ("polyfilled" in globalThis.Temporal) {
            console.warn("[Temporal] Native support not detected. Polyfill loaded via temporal-polyfill.")
            toast.warning("Temporal API not supported", {
                description: "Your browser doesn't support the Temporal API. Some features may not work as expected.",
                dismissible: true,
                duration: 5000,
                action: {
                    label: "See Compatible Browsers",
                    onClick: () => {
                        router.push(
                            "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Temporal#browser_compatibility"
                        )
                    }
                }
            })
        } else {
            console.info("[Temporal] Running on native Temporal API.")
        }
    }, [])
    return null
}
