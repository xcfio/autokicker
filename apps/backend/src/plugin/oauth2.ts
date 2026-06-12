import OAuth2 from "@fastify/oauth2"
import config from "../config"

export default async function oauth2(fastify: Fastify) {
    await fastify.register(OAuth2, {
        name: "discord",
        scope: ["email", "guilds", "guilds.join", "guilds.members.read", "identify"],
        startRedirectPath: "/auth/discord",
        discovery: { issuer: "https://discord.com" },
        credentials: { client: { id: config.discord.id, secret: config.discord.secret } },
        callbackUri: (req) => `${req.protocol}://${req.hostname}${req.port ? `:${req.port}` : ""}/auth/discord/callback`
    })
}
