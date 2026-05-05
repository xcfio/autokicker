export class Cache<K, V> extends Map<K, V> {
    private cache = new Map<K, number>()
    private exp: number

    constructor(expireIn: number = 120_000) {
        super()
        this.exp = expireIn
    }

    set(key: K, value: V, exp: number = this.exp) {
        this.cache.set(key, Date.now() + exp)
        super.set(key, value)
        return this
    }

    get(key: K) {
        if (this.isExpired(key)) {
            this.delete(key)
            return undefined
        } else {
            return super.get(key)
        }
    }

    private isExpired(key: K) {
        const cached = this.cache.get(key)
        return !cached || Date.now() > cached
    }

    delete(key: K) {
        this.cache.delete(key)
        return super.delete(key)
    }
}

class locked_cooldown extends Map<string, number> {
    add(key: string, time: number = 604_800_000) {
        this.set(key, new Date().setMilliseconds(time))
        setTimeout(() => this.delete(key), time)
        return this
    }
}

export const locked = new locked_cooldown()
