import { ClientToServerEvents, InterServerEvents, ServerToClientEvents } from "@repo/schema"
import { TypeBoxTypeProvider } from "@fastify/type-provider-typebox"
import { schemaErrorFormatter } from "fastify-utils"
import { instrument } from "@socket.io/admin-ui"
import { Server } from "socket.io"
import Decorate from "./decorate"
import { logger } from "./utils"
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

export async function build() {
    fastify.io = io
    await Plugin(fastify)
    Decorate(fastify)
    Routes(fastify)
    Hooks(fastify)
    Socket(io)

    return fastify
}

export async function main() {
    const fastify = await build()
    await fastify.listen({ host: "0.0.0.0", port: config.port })
    console.log(`Server listening at http://localhost:${config.port}`)
}

process.on("uncaughtException", (err: Error, org: string) => xcf(err, "Uncaught Exception", org, false))
process.on("unhandledRejection", (res: Error, org: string) => xcf(res, "Unhandled Rejection", org, false))
process.on("uncaughtExceptionMonitor", (err: Error, org: string) => xcf(err, "Uncaught Exception", org, false))

// oxlint-disable-next-line no-unused-expressions
config.environment !== "test" && void main()

function xcf(...arg: any) {
    console.log(arg)
}
