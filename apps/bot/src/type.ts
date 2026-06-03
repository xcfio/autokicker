import {
    AutocompleteInteraction,
    ChatInputCommandInteraction,
    ContextMenuCommandInteraction,
    RESTPostAPIChatInputApplicationCommandsJSONBody,
    RESTPostAPIContextMenuApplicationCommandsJSONBody
} from "discord.js"

export type ChatInputCommandObject = {
    autocomplete?: (interaction: AutocompleteInteraction) => any
    data: RESTPostAPIChatInputApplicationCommandsJSONBody
    run: (arg: ChatInputCommandInteraction) => any
}

export type ContextCommandObject = {
    data: RESTPostAPIContextMenuApplicationCommandsJSONBody
    run: (arg: ContextMenuCommandInteraction) => any
}
