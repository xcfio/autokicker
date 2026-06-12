export default function Routes(fastify: Fastify) {
    fastify.get("/status", { logLevel: "silent", config: { rateLimit: false } }, (_, reply) => reply.send("OK"))
    fastify.get("/license", () => `Search it up, it's MIT`)
    fastify.get("/terms", () => "ToS?? Forget about it")
}
