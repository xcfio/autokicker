import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { ValidationErrorHandler } from "fastify-utils"
import { AuthenticatedSocket } from "@repo/schema"
import { log, xcf } from "./utils"
import Decorate from "./decorate"
import Plugin from "./plugin"
import Routes from "./routes"
import Socket from "./socket"
import Fastify from "fastify"
import Hooks from "./hooks"
import * as _ from "./type"
import config from "./config"

export let io: AuthenticatedSocket
export async function main() {
    const fastify = Fastify({
        logger: log(),
        trustProxy: true,
        ajv: { customOptions: { multipleOfPrecision: 2 } },
        schemaErrorFormatter: ValidationErrorHandler
    }).withTypeProvider<TypeBoxTypeProvider>()

    await Plugin(fastify)
    Decorate(fastify)
    Routes(fastify)
    Hooks(fastify)

    const port = Number(config.port ?? 7200)
    await fastify.listen({ host: "0.0.0.0", port })
    console.log(`Server listening at http://localhost:${port}`)

    // @ts-ignore
    fastify.io.on("connection", Socket(fastify))
    io = fastify.io

    return fastify
}

process.on("uncaughtException", (err: Error, origin: string) => xcf(err, "Uncaught Exception", origin, false))
process.on("unhandledRejection", (reason: Error, origin: string) => xcf(reason, "Unhandled Rejection", origin, false))
process.on("uncaughtExceptionMonitor", (err: Error, origin: string) => xcf(err, "Uncaught Exception", origin, false))
main()
