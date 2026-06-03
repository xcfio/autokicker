function env(parm: string): string | never {
    const param = process.env[parm.toUpperCase()]
    if (!param) throw new Error(`Environment variable not found: ${parm}`)
    return param
}

const config = {
    token: env("token"),
    database_url: env("database_url")
}

export default config
