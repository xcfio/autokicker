import { main } from "../"
import { table } from "@repo/database"
import { eq, and } from "drizzle-orm"
import { drizzle } from "drizzle-orm/postgres-js"
import postgres from "postgres"

export default function AutokickRoutes(fastify: Awaited<ReturnType<typeof main>>) {
    /*
    // Get guild config
    fastify.get("/api/autokick/:guildId", async (request, reply) => {
        const { guildId } = request.params as { guildId: string }

        const config = await db
            .select()
            .from(table.guild)
            .where(eq(table.guild.guildId, guildId))
            .then((rows) => rows[0])

        if (!config) return reply.code(404).send({ error: "Guild not configured" })
        return reply.send(config)
    })

    // Update guild config
    fastify.patch("/api/autokick/:guildId", async (request, reply) => {
        const { guildId } = request.params as { guildId: string }
        const body = request.body as Record<string, any>

        await db
            .insert(table.guild)
            .values({ guildId, ...body })
            .onConflictDoUpdate({
                target: [table.guild.guildId],
                set: body
            })

        return reply.send({ success: true })
    })

    // List whitelisted roles
    fastify.get("/api/autokick/:guildId/whitelist", async (request, reply) => {
        const { guildId } = request.params as { guildId: string }

        const roles = await db
            .select()
            .from(table.guildWhitelist)
            .where(eq(table.guildWhitelist.guild_id, guildId))

        return reply.send(roles)
    })

    // Add whitelisted role
    fastify.post("/api/autokick/:guildId/whitelist", async (request, reply) => {
        const { guildId } = request.params as { guildId: string }
        const { roleId } = request.body as { roleId: string }

        await db
            .insert(table.guildWhitelist)
            .values({ guild_id: guildId, role_id: roleId })
            .onConflictDoNothing()

        return reply.send({ success: true })
    })

    // Remove whitelisted role
    fastify.delete("/api/autokick/:guildId/whitelist/:roleId", async (request, reply) => {
        const { guildId, roleId } = request.params as { guildId: string; roleId: string }

        await db
            .delete(table.guildWhitelist)
            .where(
                and(
                    eq(table.guildWhitelist.guild_id, guildId),
                    eq(table.guildWhitelist.role_id, roleId)
                )
            )

        return reply.send({ success: true })
    })

    // List warning stages
    fastify.get("/api/autokick/:guildId/warnings", async (request, reply) => {
        const { guildId } = request.params as { guildId: string }

        const stages = await db
            .select()
            .from(table.guildWarningStages)
            .where(eq(table.guildWarningStages.guild_id, guildId))

        return reply.send(stages)
    })

    // Add warning stage
    fastify.post("/api/autokick/:guildId/warnings", async (request, reply) => {
        const { guildId } = request.params as { guildId: string }
        const { hours } = request.body as { hours: number }

        await db
            .insert(table.guildWarningStages)
            .values({ guild_id: guildId, hours_before: hours })
            .onConflictDoNothing()

        return reply.send({ success: true })
    })

    // Remove warning stage
    fastify.delete("/api/autokick/:guildId/warnings/:hours", async (request, reply) => {
        const { guildId, hours } = request.params as { guildId: string; hours: string }

        await db
            .delete(table.guildWarningStages)
            .where(
                and(
                    eq(table.guildWarningStages.guild_id, guildId),
                    eq(table.guildWarningStages.hours_before, parseInt(hours, 10))
                )
            )

        return reply.send({ success: true })
    })

    // List inactive members
    fastify.get("/api/autokick/:guildId/inactive", async (request, reply) => {
        const { guildId } = request.params as { guildId: string }

        const members = await db
            .select()
            .from(table.memberActivity)
            .where(eq(table.memberActivity.guild_id, guildId))

        return reply.send(members)
    })
    */
}
