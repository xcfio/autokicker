export function env<T extends Record<string, string>, K extends keyof T = keyof T>(
    Key: K,
    Throw: false
): T[K] | undefined
export function env<T extends Record<string, string>, K extends keyof T = keyof T>(Key: K, Throw?: true): T[K]
export function env<T extends Record<string, string>, K extends keyof T = keyof T>(
    Key: K,
    Throw: boolean = true
): T[K] {
    const param = typeof Key === "string" ? process.env[Key.toUpperCase()] : process.env[Key as any]
    if (!param && Throw) throw new Error(`Environment variable not found: ${String(Key)}`)
    return (!param && !Throw ? param : String(param)) as T[K]
}
