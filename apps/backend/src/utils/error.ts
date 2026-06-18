// oxlint-disable

import { CreateError, isFastifyError } from "fastify-utils"

export async function xcf<Throw extends boolean>(
    givenError: Error | unknown,
    _type = "Uncaught Exception",
    origin?: any,
    shouldThrow: Throw = true as Throw
): Promise<Throw extends true ? never : null> {
    const error = givenError as NonNullable<Error>

    if (isFastifyError(error)) throw error
    console.trace(error, origin)

    if (shouldThrow) throw CreateError(500, "INTERNAL_SERVER_ERROR", "Internal Server Error")
    return null as Throw extends true ? never : null
}
