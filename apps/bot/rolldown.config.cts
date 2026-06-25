import { defineConfig } from "rolldown"

export default defineConfig({
    input: "src/index.ts",
    output: { file: "out/index.js", format: "cjs" },
    external: (id, _importer, isResolved) => {
        if (process.env.EXTERNAL_DEPENDENCY === "false" || isResolved) return false
        return !id.startsWith("@repo/") && !id.startsWith(".")
    }
})
