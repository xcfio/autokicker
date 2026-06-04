import { AuthenticatedSocket } from "@repo/schema"
import { FastifyInstance } from "fastify"

export default (_fastify: FastifyInstance) => async (socket: Required<AuthenticatedSocket>) => {
    try {
        // TODO: add socket
    } catch (error) {
        console.error(`Socket ${socket.id} authentication failed:`, error)
        socket.disconnect(true)
        return
    }
}
