import { env } from "@repo/utils"

const config = {
    token: env("token"),
    database_url: env("database_url")
}

export default config
