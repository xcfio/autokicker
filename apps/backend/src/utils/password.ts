import { createHmac } from "node:crypto"
import config from "../config"

export function HmacPassword(password: string): string {
    return createHmac("sha512", config.secret.hmac).update(password).digest("hex")
}
