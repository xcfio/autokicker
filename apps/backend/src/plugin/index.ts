import { FastifyInstance } from "fastify"
import config from "../config"
import socket from "./socket-io"
import swagger from "./swagger"
import cookie from "./cookie"
import rl from "./rate-limit"
import scalar from "./scalar"
import oauth2 from "./oauth2"
import cors from "./cors"
import auth from "./auth"
import jwt from "./jwt"

export default async function Plugin(fastify: FastifyInstance) {
    if (config.environment === "development") {
        await swagger(fastify)
        await scalar(fastify)
    }

    await cookie(fastify)
    await auth(fastify)
    await oauth2(fastify)
    await rl(fastify)
    await socket(fastify)
    await jwt(fastify)
    await cors(fastify)
}
