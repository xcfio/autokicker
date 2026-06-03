import { Client, ActivityType } from "discord.js"

export async function status(client: Client<true>) {
    return client.user.setPresence({
        activities: [
            {
                name: "things",
                type: ActivityType.Competing
            }
        ]
    })
}
