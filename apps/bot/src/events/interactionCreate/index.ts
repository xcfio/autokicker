import { Interaction } from "discord.js"
// import { interaction_log as log } from "./log"
import { run } from "./run"

export default async function InteractionCreate(interaction: Interaction) {
    run(interaction)
    // log(interaction)
}
