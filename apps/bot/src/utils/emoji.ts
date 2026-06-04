export const EmojiID = {
    /**
     * Hammer & Wrench - General bot/autokicker icon
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714134931275799.png) - https://cdn.discordapp.com/emojis/1511714134931275799.png
     */
    autokicker: "1511714134931275799",
    /**
     * Rotate left - Undo / reset
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714139041562644.png) - https://cdn.discordapp.com/emojis/1511714139041562644.png
     */
    rotate_left: "1511714139041562644",
    /**
     * History - Audit log / past actions
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714142766104586.png) - https://cdn.discordapp.com/emojis/1511714142766104586.png
     */
    history: "1511714142766104586",
    /**
     * Single left chevron - Previous page
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714145593065522.png) - https://cdn.discordapp.com/emojis/1511714145593065522.png
     */
    chevron_left: "1511714145593065522",
    /**
     * Double left chevron - First page
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714147635560589.png) - https://cdn.discordapp.com/emojis/1511714147635560589.png
     */
    chevron_double_left: "1511714147635560589",
    /**
     * Left arrow - Go back
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714151116968069.png) - https://cdn.discordapp.com/emojis/1511714151116968069.png
     */
    arrow_left: "1511714151116968069",
    /**
     * Single right chevron - Next page
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714153134424134.png) - https://cdn.discordapp.com/emojis/1511714153134424134.png
     */
    chevron_right: "1511714153134424134",
    /**
     * Double right chevron - Last page
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714155357278379.png) - https://cdn.discordapp.com/emojis/1511714155357278379.png
     */
    chevron_double_right: "1511714155357278379",
    /**
     * Right arrow - Go forward
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714157156630549.png) - https://cdn.discordapp.com/emojis/1511714157156630549.png
     */
    arrow_right: "1511714157156630549",
    /**
     * Checkmark - Success / confirm
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714160981971096.png) - https://cdn.discordapp.com/emojis/1511714160981971096.png
     */
    check: "1511714160981971096",
    /**
     * Checklist - Task list / queue
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714164454985951.png) - https://cdn.discordapp.com/emojis/1511714164454985951.png
     */
    list: "1511714164454985951",
    /**
     * X mark - Cancel / deny
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714167768485908.png) - https://cdn.discordapp.com/emojis/1511714167768485908.png
     */
    x: "1511714167768485908",
    /**
     * Clock - Time / cooldown
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714170154782843.png) - https://cdn.discordapp.com/emojis/1511714170154782843.png
     */
    clock: "1511714170154782843",
    /**
     * Shield - Protection / moderation
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714178577072320.png) - https://cdn.discordapp.com/emojis/1511714178577072320.png
     */
    shield: "1511714178577072320",
    /**
     * Hourglass - Waiting / pending
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714180737138749.png) - https://cdn.discordapp.com/emojis/1511714180737138749.png
     */
    hourglass: "1511714180737138749",
    /**
     * Gear - Settings / configuration
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714183383748698.png) - https://cdn.discordapp.com/emojis/1511714183383748698.png
     */
    gear: "1511714183383748698",
    /**
     * Exclamation mark - Warning / alert
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714185753399346.png) - https://cdn.discordapp.com/emojis/1511714185753399346.png
     */
    exclamation: "1511714185753399346",
    /**
     * Hammer - Ban / strike action
     * @preview ![img](https://cdn.discordapp.com/emojis/1511714188266045481.png) - https://cdn.discordapp.com/emojis/1511714188266045481.png
     */
    hammer: "1511714188266045481"
} as const

export const Emoji = (name: keyof typeof EmojiID) => `<:${name}:${EmojiID[name]}>`
