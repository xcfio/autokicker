export function env<T extends Record<string, string>, K extends keyof T = keyof T>(
    Key: K,
    error: false
): T[K] | undefined
export function env<T extends Record<string, string>, K extends keyof T = keyof T>(Key: K, error?: true): T[K]
export function env<T extends Record<string, string>, K extends keyof T = keyof T>(
    Key: K,
    error: boolean = true
): T[K] {
    const param = typeof Key === "string" ? process.env[Key.toUpperCase()] : process.env[Key as any]
    if (!param && error) throw new Error(`Environment variable not found: ${String(Key)}`)
    return (!param && !error ? param : String(param)) as T[K]
}
