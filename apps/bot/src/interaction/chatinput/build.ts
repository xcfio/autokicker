import {
    ButtonStyle,
    ChatInputCommandInteraction,
    ComponentType,
    InteractionContextType,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { dependencies, devDependencies } from "../../../package.json"
import { embed } from "../../function"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "build",
    description: "Information about xcf development",
    contexts: [InteractionContextType.Guild]
}

export async function run(interaction: ChatInputCommandInteraction) {
    let packages: string = ""
    let dev_packages: string = ""

    for (const key in dependencies) packages = packages + dependency(dependencies, key)
    for (const key in devDependencies) dev_packages = dev_packages + dependency(devDependencies, key)

    interaction.reply({
        embeds: embed({
            description:
                `Automod is a private discord bot\n` +
                `Programming Language: [TypeScript](https://www.typescriptlang.org)\n` +
                `Backend technology: [Node.js](https://nodejs.org)`,
            fields: [
                {
                    name: "Dependencies",
                    value: packages
                },
                {
                    name: "Dev Dependencies",
                    value: dev_packages
                }
            ]
        }),
        components: [
            {
                type: ComponentType.ActionRow,
                components: [
                    {
                        label: "Want to use this type of bot? Invite xcf now",
                        url: "https://discord.com/oauth2/authorize?client_id=1211535069492154398",
                        type: ComponentType.Button,
                        style: ButtonStyle.Link,
                        emoji: {
                            id: "1228671731112214558"
                        }
                    }
                ]
            }
        ]
    })
}

function dependency(obj: Record<string, string>, name: string) {
    const versions = obj[name]
    let version

    switch (true) {
        case versions.startsWith("^"):
            version = versions.split("^").pop()!
            break

        case versions.startsWith("~"):
            version = versions.split("~").pop()!
            break

        default:
            version = versions
            break
    }

    return `${name}: [${versions}](<https://www.npmjs.com/package/${name}/v/${version}>)\n`
}
