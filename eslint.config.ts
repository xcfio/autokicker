import eslintConfigPrettier from "eslint-config-prettier/flat"
import { defineConfig } from "eslint/config"
import { configs } from "typescript-eslint"
import js from "@eslint/js"

export default defineConfig([
    js.configs.recommended,
    ...configs.recommended,
    eslintConfigPrettier,
    {
        rules: {
            "no-restricted-globals": [
                "error",
                {
                    name: "Date",
                    message: "Use Temporal API instead of Date."
                }
            ],
            "@typescript-eslint/no-empty-object-type": "off",
            "@typescript-eslint/no-explicit-any": "off",
            "@typescript-eslint/no-namespace": "off",
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_"
                }
            ]
        }
    },
    {
        ignores: ["**/node_modules", "**/dist", "**/.turbo", "**/.next", "**/.temp", "**/out", "**/.expo", "**/.agents"]
    }
])
