import { FastifyInstance } from "fastify"
import OAuth2 from "@fastify/oauth2"

export default async function oauth2(fastify: FastifyInstance) {
    /*
    const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env
    if (GOOGLE_CLIENT_ID && GOOGLE_CLIENT_SECRET) {
        await fastify.register(OAuth2, {
            name: "googleOAuth2",
            scope: ["profile", "email"],
            startRedirectPath: "/auth/google",
            discovery: { issuer: "https://accounts.google.com" },
            callbackUri: (req) =>
                `${req.protocol}://${req.hostname}${req.port ? `:${req.port}` : ""}/auth/google/callback`,
            credentials: {
                client: {
                    id: GOOGLE_CLIENT_ID,
                    secret: GOOGLE_CLIENT_SECRET
                }
            }
        })
    } else {
        const missing = []
        if (!GOOGLE_CLIENT_ID) missing.push("GOOGLE_CLIENT_ID")
        if (!GOOGLE_CLIENT_SECRET) missing.push("GOOGLE_CLIENT_SECRET")
        fastify.log.warn(`Google OAuth2 not configured. Missing: ${missing.join(", ")}`)
    }
    */
}
