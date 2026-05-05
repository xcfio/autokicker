import { AnyThreadChannel, ComponentType } from "discord.js"
import { embed } from "../../function"
import config from "../../config"

export async function help(thread: AnyThreadChannel, newly_created_status: boolean) {
    if (newly_created_status && thread.parent && thread.parent.id === config.channel.help) {
        const message = await thread.send({
            embeds: embed("Something"),
            components: [
                {
                    type: ComponentType.ActionRow,
                    components: [
                        {
                            placeholder: "Select an option to continue",
                            type: ComponentType.StringSelect,
                            custom_id: "support",
                            options: [
                                {
                                    label: "Ping helpers for help",
                                    value: "ping"
                                },
                                {
                                    label: "Mark as Solved",
                                    value: "close"
                                },
                                {
                                    label: "Re-Open",
                                    value: "open"
                                }
                            ]
                        }
                    ]
                }
            ]
        })
        await message.pin()
    }
}
