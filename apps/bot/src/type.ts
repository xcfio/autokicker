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

declare global {
    namespace NodeJS {
        interface ProcessEnv extends Env {}
    }
}

export type Env = {
    NODE_ENV: "development" | "production" | "test"
    DATABASE_URL: string
    FRONTEND_URL: string

    SECRET: string
    TOKEN: string
}
