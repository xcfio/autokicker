import { FastifyLoggerOptions, PinoLoggerOptions } from "fastify/types/logger"
import { RawServerBase } from "fastify"
import config from "../config"

export function log(): FastifyLoggerOptions<RawServerBase> & PinoLoggerOptions {
    return {
        file: config.environment === "development" ? "./log.jsonl" : undefined,
        level: "info",
        base: null,
        formatters: { level: (label) => ({ label }) },
        timestamp: () => {
            const base = Temporal.Now.zonedDateTimeISO("Asia/Dhaka").round("second")
            const date = `"date":"${base.toPlainDate()}"`
            const time = `"time":"${base.toPlainTime().toLocaleString("en-US", { hour12: true }).toUpperCase()}"`
            return ["", date, time].join(",")
        },
        serializers: {
            res: (res) => ({ statusCode: res.statusCode, headers: res.getHeaders?.() ?? null }),
            req: (req) => ({
                method: req.method,
                url: req.url,
                hostname: req.hostname,
                remoteAddress:
                    typeof req.headers["x-forwarded-for"] === "string"
                        ? req.headers["x-forwarded-for"].split(",")[0].trim()
                        : req.ip,
                headers: req.headers,
                body: req.body ?? null,
                params: req.params ?? null,
                query: req.query ?? null
            })
        }
    }
}
