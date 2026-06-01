import { nitroV2Plugin as nitro } from "@solidjs/vite-plugin-nitro-2"
import { solidStart } from "@solidjs/start/config"
import { defineConfig } from "vite"
import tailwindcss from "@tailwindcss/vite"

const preset = process.env.SERVER_PRESET ?? process.env.NITRO_PRESET ?? "node-server"
export default defineConfig({ plugins: [solidStart(), tailwindcss(), nitro({ preset })] })
