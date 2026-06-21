export function duration(time: Temporal.Duration) {
    const days = time.total("days")
    if (Number.isInteger(days)) return `${days} day(s)`

    const hour = time.total("hours")
    if (Number.isInteger(hour)) return `${hour} hour(s)`

    const minute = time.total("minutes")
    if (Number.isInteger(minute)) return `${minute} minute(s)`

    return `${time.total("seconds")} second(s)`
}
