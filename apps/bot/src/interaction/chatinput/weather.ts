import {
    ApplicationCommandOptionType,
    ChatInputCommandInteraction,
    ComponentType,
    InteractionContextType,
    MessageFlags,
    RESTPostAPIChatInputApplicationCommandsJSONBody
} from "discord.js"
import { Errors, xcf } from "../../function"
import config from "../../config"

export const data: RESTPostAPIChatInputApplicationCommandsJSONBody = {
    name: "weather",
    description: "Get weather information",
    contexts: [InteractionContextType.Guild],
    options: [
        {
            name: "city",
            description: "City to get weather for",
            type: ApplicationCommandOptionType.String,
            required: true
        }
    ]
}

export async function run(interaction: ChatInputCommandInteraction) {
    await interaction.deferReply({ ephemeral: true })

    try {
        // prettier-ignore
        const query = await (await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${interaction.options.getString("city", true)}&appid=${config.api.weather}`)).json() as weather
        query.cod = parseInt((query.cod as number | string).toString()) as code

        switch (query.cod) {
            case 200:
                interaction.followUp({
                    flags: [MessageFlags.IsComponentsV2],
                    components: [
                        {
                            type: ComponentType.Container,
                            components: [
                                {
                                    type: ComponentType.TextDisplay,
                                    content: `### Weather of ${query.name}, ${query.sys.country}`
                                },
                                {
                                    type: ComponentType.Separator
                                },
                                {
                                    type: ComponentType.TextDisplay,
                                    content:
                                        `**Description**: ${query.weather[0].description}\n` +
                                        `**Temperature**: ${(query.main.temp - 273.15).toFixed()}°C ` +
                                        `(${((query.main.temp - 273.15) * (9 / 5) + 32).toFixed(2)}°F)\n` +
                                        `**Feels Like**: ${(query.main.feels_like - 273.15).toFixed()}°C ` +
                                        `(${((query.main.feels_like - 273.15) * (9 / 5) + 32).toFixed(2)}°F)\n` +
                                        `**Min Temperature**: ${(query.main.temp_min - 273.15).toFixed()}°C ` +
                                        `(${((query.main.temp_min - 273.15) * (9 / 5) + 32).toFixed(2)}°F)\n` +
                                        `**Max Temperature**: ${(query.main.temp_max - 273.15).toFixed()}°C ` +
                                        `(${((query.main.temp_max - 273.15) * (9 / 5) + 32).toFixed(2)}°F)\n` +
                                        `**Pressure**: ${query.main.pressure} hPa\n` +
                                        `**Humidity**: ${query.main.humidity}%\n` +
                                        `**Visibility**: ${query.visibility} meters\n` +
                                        `**Wind Speed**: ${query.wind.speed} m/s\n` +
                                        `**Wind Direction**: ${query.wind.deg}°\n` +
                                        `**Wind Gust**: ${query.wind.gust} m/s\n` +
                                        `**Cloudiness**: ${query.clouds.all}%\n` +
                                        `**Sunrise**: ${new Date(query.sys.sunrise * 1000).toLocaleTimeString()}\n` +
                                        `**Sunset**: ${new Date(query.sys.sunset * 1000).toLocaleTimeString()}`
                                }
                            ]
                        }
                    ]
                })
                break

            case 401:
                xcf(interaction)
                break

            case 404:
                interaction.followUp("Oh no... Looks like you selected a city that wasn't found.")
                break

            case 429:
                interaction.followUp("Oh no... Looks like you've been rate limited. Try again later.")
                break

            case 500:
            case 502:
            case 503:
            case 504:
                interaction.followUp("Oh no... Looks like the API is broken.")
                break

            default:
                xcf(interaction)
                break
        }
    } catch (error: any) {
        Errors(error)
        xcf(interaction)
    }
}

type weather = Success | Error
type code = 200 | 401 | 404 | 429 | 500 | 502 | 503 | 504

type Error = {
    cod: Exclude<code, 200>
    message: string
}

type Success = {
    coord: {
        lon: number
        lat: number
    }
    weather: Array<{
        id: number
        main: string
        description: string
        icon: string
    }>
    base: string
    main: {
        temp: number
        feels_like: number
        temp_min: number
        temp_max: number
        pressure: number
        humidity: number
    }
    visibility: number
    wind: {
        speed: number
        deg: number
        gust: number
    }
    clouds: {
        all: number
    }
    dt: number
    sys: {
        type: number
        id: number
        country: string
        sunrise: number
        sunset: number
    }
    timezone: number
    id: number
    name: string
    cod: Extract<code, 200>
}
