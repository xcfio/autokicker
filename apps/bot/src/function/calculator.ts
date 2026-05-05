export function calculator(level: bigint) {
    switch (level) {
        case 0n:
            return 20n
        case 1n:
            return 50n
        case 2n:
            return 100n
        case 3n:
            return 200n
        case 4n:
            return 300n
        case 5n:
            return 400n
        case 6n:
            return 600n
        case 7n:
            return 800n
        case 8n:
            return 1200n
        case 9n:
            return 1600n
        case 10n:
            return 2000n
        case 11n:
            return 3000n
        case 12n:
            return 4000n
        case 13n:
            return 6000n
        case 14n:
            return 8000n
        case 15n:
            return 10000n
        case 16n:
            return 12000n
        case 17n:
            return 14000n
        case 18n:
            return 16000n
        case 19n:
            return 18000n
        default:
            return (level - 20n) * 2000n + 20000n
    }
}
