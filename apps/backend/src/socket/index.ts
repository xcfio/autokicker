import { fastify } from "../"

export default function Plugin(io: SocketIO) {
    io.on("connection", (socket) => {
        socket.data.fastify = fastify
    })
}
