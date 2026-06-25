const { execSync } = require("node:child_process") as typeof import("node:child_process")
const { writeFileSync } = require("node:fs") as typeof import("node:fs")
const pkg = require("./package.json") as typeof import("./package.json")

const external = false
const dependencies = { ...pkg.dependencies }

// @ts-expect-error - Removing devDependencies fields from package
pkg.devDependencies = {}

// @ts-expect-error - Removing dependencies fields from package
pkg.dependencies = {}

// @ts-expect-error - Clean up dev scripts and correct the start path for production
pkg.scripts = {
    start: "node --env-file-if-exists=.env index.js"
}

if (external) {
    // @ts-expect-error - Add external package
    pkg.dependencies = Object.fromEntries(Object.entries(dependencies).filter(([name]) => !name.startsWith("@repo")))
}

execSync("rolldown --config=rolldown.config.cts", {
    cwd: __dirname,
    env: { ...process.env, EXTERNAL_DEPENDENCY: external ? "true" : "false" }
})

writeFileSync("out/package.json", JSON.stringify(pkg, null, 4))
