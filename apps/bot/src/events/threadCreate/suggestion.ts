import { AnyThreadChannel, ComponentType } from "discord.js"
import config from "../../config"
import { embed } from "../../function"

export async function suggestion(thread: AnyThreadChannel, newly_created_status: boolean) {
    if (!thread.parent || thread.parent.id !== config.channel.suggestion) return
    if (!newly_created_status) return

    const message = await thread.send({
        embeds: embed({
            description: "Thank you for opening a suggestion. We will review it as soon as possible.",
            timestamp: new Date().toISOString()
        }),
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        placeholder: "Select an option to continue (only moderators can)",
                        type: ComponentType.StringSelect,
                        custom_id: "suggestion",
                        options: [
                            {
                                label: "Approve",
                                value: "approve"
                            },
                            {
                                label: "Reject",
                                value: "reject"
                            }
                        ]
                    }
                ]
            }
        ]
    })
    await thread.setAppliedTags(["1237581474039857202"])
    await message.pin()
}
