import {
    APIActionRowComponent,
    APIStringSelectComponent,
    ComponentType,
    Interaction,
    InteractionReplyOptions,
    InteractionUpdateOptions,
    MessageFlags,
    PermissionFlagsBits
} from "discord.js"
import { Emoji, EmojiID } from "./emoji"

export const component = {
    cfg(): APIActionRowComponent<APIStringSelectComponent> {
        return {
            type: ComponentType.ActionRow,
            components: [
                {
                    custom_id: "config",
                    placeholder: "Select an option to continue",
                    type: ComponentType.StringSelect,
                    options: [
                        {
                            label: "Check configuration status",
                            value: "status",
                            emoji: { id: EmojiID.list },
                            description: "View current server settings"
                        },
                        {
                            label: "Toggle autokick",
                            value: "toggle",
                            emoji: { id: EmojiID.check },
                            description: "Enable or disable autokick"
                        },
                        {
                            label: "Configure autokick",
                            value: "autokick",
                            emoji: { id: EmojiID.hammer },
                            description: "Customize autokick settings"
                        },
                        {
                            label: "Manage whitelist",
                            value: "whitelist",
                            emoji: { id: EmojiID.shield },
                            description: "Add or remove whitelist entries"
                        },
                        {
                            label: "Manage warnings",
                            value: "warnings",
                            emoji: { id: EmojiID.exclamation },
                            description: "Configure warning stages"
                        }
                    ]
                }
            ]
        }
    },
    autokick(): APIActionRowComponent<APIStringSelectComponent> {
        return {
            type: ComponentType.ActionRow,
            components: [
                {
                    custom_id: "cfg-autokick",
                    placeholder: "Select a setting to configure",
                    type: ComponentType.StringSelect,
                    options: [
                        {
                            label: "Set threshold",
                            value: "threshold",
                            emoji: { id: EmojiID.clock },
                            description: "Time of inactivity before action"
                        },
                        {
                            label: "Set action type",
                            value: "action",
                            emoji: { id: EmojiID.hammer },
                            description: "Kick or ban inactive members"
                        },
                        {
                            label: "Set log channel",
                            value: "log",
                            emoji: { id: EmojiID.history },
                            description: "Channel for autokick logs"
                        },
                        /*
                        {
                            label: "Set kick message",
                            value: "message",
                            emoji: { id: EmojiID.hammer },
                            description: "Custom message sent to kicked users"
                        },
                        */
                        {
                            label: "Return to main menu",
                            value: "return",
                            emoji: { id: EmojiID.arrow_left },
                            description: "Go back to configuration menu"
                        }
                    ]
                }
            ]
        }
    },
    whitelist(): APIActionRowComponent<APIStringSelectComponent> {
        return {
            type: ComponentType.ActionRow,
            components: [
                {
                    custom_id: "cfg-whitelist",
                    placeholder: "Select a whitelist action",
                    type: ComponentType.StringSelect,
                    options: [
                        {
                            label: "Add whitelist entry",
                            value: "add",
                            emoji: { id: EmojiID.check },
                            description: "Whitelist a user, role, or channel"
                        },
                        {
                            label: "Remove whitelist entry",
                            value: "remove",
                            emoji: { id: EmojiID.x },
                            description: "Remove a whitelist entry"
                        },
                        {
                            label: "View whitelist",
                            value: "list",
                            emoji: { id: EmojiID.list },
                            description: "View all whitelist entries"
                        },
                        {
                            label: "Return to main menu",
                            value: "return",
                            emoji: { id: EmojiID.arrow_left },
                            description: "Go back to configuration menu"
                        }
                    ]
                }
            ]
        }
    },
    warnings(): APIActionRowComponent<APIStringSelectComponent> {
        return {
            type: ComponentType.ActionRow,
            components: [
                {
                    custom_id: "cfg-warnings",
                    placeholder: "Select a warning action",
                    type: ComponentType.StringSelect,
                    options: [
                        {
                            label: "Add warning stage",
                            value: "add",
                            emoji: { id: EmojiID.check },
                            description: "Add a warning stage (minutes before kick)"
                        },
                        {
                            label: "Remove warning stage",
                            value: "remove",
                            emoji: { id: EmojiID.x },
                            description: "Remove a warning stage"
                        },
                        {
                            label: "View warning stages",
                            value: "list",
                            emoji: { id: EmojiID.list },
                            description: "View all warning stages"
                        },
                        {
                            label: "Return to main menu",
                            value: "return",
                            emoji: { id: EmojiID.arrow_left },
                            description: "Go back to configuration menu"
                        }
                    ]
                }
            ]
        }
    },
    return(): APIActionRowComponent<APIStringSelectComponent> {
        return {
            type: ComponentType.ActionRow,
            components: [
                {
                    custom_id: "return",
                    placeholder: "Select an option to continue",
                    type: ComponentType.StringSelect,
                    options: [
                        {
                            label: "Return to main menu",
                            value: "return",
                            emoji: { id: EmojiID.arrow_left },
                            description: "Go back to configuration menu"
                        }
                    ]
                }
            ]
        }
    }
}

export function cfg_message(text?: string): InteractionReplyOptions & InteractionUpdateOptions {
    return {
        flags: [MessageFlags.IsComponentsV2],
        components: [
            {
                type: ComponentType.Container,
                components: [
                    {
                        type: ComponentType.TextDisplay,
                        content: `## ${Emoji("gear")} Server Configuration`
                    },
                    { type: ComponentType.Separator },
                    {
                        type: ComponentType.TextDisplay,
                        content: text ?? "Select an option below to configure your server settings."
                    },
                    component.cfg()
                ]
            }
        ]
    }
}

export const message = {
    base: (isSuccess: boolean, content: string) => ({
        flags: [MessageFlags.IsComponentsV2] as InteractionReplyOptions["flags"] & InteractionUpdateOptions["flags"],
        components: [
            {
                type: ComponentType.Container,
                components: [
                    {
                        type: ComponentType.TextDisplay,
                        content: isSuccess ? `## ${Emoji("check")} Success` : `## ${Emoji("x")} Error`
                    },
                    { type: ComponentType.Separator },
                    { type: ComponentType.TextDisplay, content }
                ]
            }
        ]
    }),
    success: function (
        text: string,
        components: APIActionRowComponent<APIStringSelectComponent> = component.return()
    ): InteractionReplyOptions & InteractionUpdateOptions {
        const base = this.base(true, text)
        if (components) base.components[0].components.push(components)
        return base
    },
    error: function (
        text: string,
        components: APIActionRowComponent<APIStringSelectComponent> = component.return()
    ): InteractionReplyOptions & InteractionUpdateOptions {
        const base = this.base(false, text)
        if (components) base.components[0].components.push(components)
        return base
    }
}

export function isInvalid(interaction: Interaction): false | string {
    if (!interaction.inCachedGuild()) return "Unknown guild"
    const isAdmin = interaction.memberPermissions.has(PermissionFlagsBits.Administrator)
    // const canManage = interaction.memberPermissions.has(PermissionFlagsBits.ManageGuild)
    if (!isAdmin) {
        return "You don't have permission to use this command. Permission required: Administrator"
    }
    return false
}
