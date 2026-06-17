import { ValidationErrorHandler as schemaErrorFormatter } from "fastify-utils"
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "@repo/schema"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { instrument } from "@socket.io/admin-ui"
import { logger, xcf } from "./utils"
import { Server } from "socket.io"
import Decorate from "./decorate"
import Plugin from "./plugin"
import Routes from "./routes"
import Socket from "./socket"
import Fastify from "fastify"
import Hooks from "./hooks"
import * as _ from "./type"
import config from "./config"

export const fastify = Fastify({
    logger,
    trustProxy: true,
    ajv: { customOptions: { multipleOfPrecision: 2 } },
    schemaErrorFormatter
}).withTypeProvider<TypeBoxTypeProvider>()

export const io = new Server<
    ClientToServerEvents,
    ServerToClientEvents,
    InterServerEvents,
    { fastify: typeof fastify }
>(fastify.server, { cookie: true, cors: { origin: [config.origin, "https://admin.socket.io"], credentials: true } })
instrument(io, { auth: { ...config.io, type: "basic" }, mode: "development" })

export async function main() {
    fastify.io = io
    await Plugin(fastify)
    Decorate(fastify)
    Routes(fastify)
    Hooks(fastify)
    Socket(io)

    await fastify.listen({ host: "0.0.0.0", port: config.port })
    console.log(`Server listening at http://localhost:${config.port}`)
}

process.on("uncaughtException", (err: Error, origin: string) => xcf(err, "Uncaught Exception", origin, false))
process.on("unhandledRejection", (reason: Error, origin: string) => xcf(reason, "Unhandled Rejection", origin, false))
process.on("uncaughtExceptionMonitor", (err: Error, origin: string) => xcf(err, "Uncaught Exception", origin, false))
main()
