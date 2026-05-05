import { Socket } from "socket.io"
import { Static } from "typebox"

export interface ClientToServerEvents {}

export interface ServerToClientEvents {}

export interface AuthenticatedSocket extends Socket<ClientToServerEvents, ServerToClientEvents> {}
