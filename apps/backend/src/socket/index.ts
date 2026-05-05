import { AuthenticatedSocket, Payload } from "@repo/schema"
import { main } from "../"

export default (fastify: Awaited<ReturnType<typeof main>>) => async (socket: Required<AuthenticatedSocket>) => {
    try {
    } catch (error) {
        console.error(`Socket ${socket.id} authentication failed:`, error)

        socket.disconnect(true)
        return
    }
}
