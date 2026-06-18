import { Client, ActivityType } from "discord.js"

export function status(client: Client<true>) {
    client.user.setPresence({
        activities: [
            {
                name: "Something Cool",
                type: ActivityType.Competing
            }
        ]
    })
}
