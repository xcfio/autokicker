import { errors } from "fastify-utils"
import RateLimit from "@fastify/rate-limit"

export default async function rl(fastify: Fastify) {
    await fastify.register(RateLimit, {
        max: 10,
        timeWindow: 20000,
        allowList: ["127.0.0.1"],
        keyGenerator: (req) => {
            const forwarded = req.headers["x-forwarded-for"]
            return typeof forwarded === "string" ? forwarded.split(",")[0].trim() : req.ip
        },
        errorResponseBuilder: (_, context) =>
            errors.client.rateLimit(`Rate limit exceeded, retry in ${context.after}`, Math.ceil(context.ttl / 1000))
    })
}
