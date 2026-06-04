import { Socket } from "socket.io"

export interface ClientToServerEvents {}

export interface ServerToClientEvents {}

export interface AuthenticatedSocket extends Socket<ClientToServerEvents, ServerToClientEvents> {}
