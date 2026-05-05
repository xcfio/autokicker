import {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    ContextMenuCommandInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody
} from "discord.js"

export const path = ["api-error", "error", "debug", "command", "msg-create", "msg-edit", "msg-delete"] as const
export const pathdir = "log"

export type ChatInputCommandObject = {
    autocomplete?: (interaction: AutocompleteInteraction) => any
    data: RESTPostAPIChatInputApplicationCommandsJSONBody
    run: (arg: ChatInputCommandInteraction) => any
}

export type ContextCommandObject = {
    data: RESTPostAPIContextMenuApplicationCommandsJSONBody
    run: (arg: ContextMenuCommandInteraction) => any
}
