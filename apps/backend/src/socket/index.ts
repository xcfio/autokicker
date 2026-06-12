import { AuthenticatedSocket } from "@repo/schema"

export default (_fastify: Fastify) => async (socket: Required<AuthenticatedSocket>) => {
    try {
        // TODO: add socket
    } catch (error) {
        console.error(`Socket ${socket.id} authentication failed:`, error)
        socket.disconnect(true)
        return
    }
}
