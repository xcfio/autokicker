import { Client, GatewayIntentBits, Partials } from "discord.js"
import Fastify from "fastify"
import events from "./events"
import config from "./config"

export const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildPresences,
        GatewayIntentBits.GuildWebhooks,
        GatewayIntentBits.GuildModeration,
        GatewayIntentBits.GuildMessageTyping,
        GatewayIntentBits.GuildMessageReactions,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildInvites
    ],
    partials: [
        Partials.Channel,
        Partials.GuildMember,
        Partials.GuildScheduledEvent,
        Partials.Message,
        Partials.Reaction,
        Partials.ThreadMember,
        Partials.User
    ],
    allowedMentions: {
        repliedUser: true,
        parse: ["everyone", "roles", "users"]
    }
})

client.login(config.token)
process.on("uncaughtException", (err: Error, origin: string) => error("Uncaught Exception", err, origin))
process.on("unhandledRejection", (reason: Error, origin: string) => error("Unhandled Rejection", reason, origin))
process.on("uncaughtExceptionMonitor", (err: Error, origin: string) => error("Uncaught Exception", err, origin))
events.forEach((func, name) => (typeof func === "function" ? client.on(name, (...arg) => func(...arg, client)) : null))

function error(type: string, error: Error, origin: any) {
    if (error.message === "getaddrinfo ENOTFOUND discord.com") return console.log(error.stack)
    if (error.message === "getaddrinfo EAI_AGAIN discord.com") return console.log(error.stack)
    console.log(error, type, origin)
}

try {
    const fastify = Fastify()

    fastify.get("/status", (_, reply) => reply.code(200).send("OK"))
    fastify.get("/", () => process.uptime())

    fastify.listen({ host: "0.0.0.0", port: 8700 }, (error, address) => {
        console.log(error ?? `Server listening on: ${address}`)
    })
} catch (error) {
    console.log(error)
}
