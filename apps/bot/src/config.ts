function env(parm: string): string | never {
    const param = process.env[parm.toUpperCase()]
    if (!param) throw new Error(`Environment variable not found: ${parm}`)
    return param
}

export default {
    token: env("token")
}
