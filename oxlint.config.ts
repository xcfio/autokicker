import { defineConfig } from "oxlint"

export default defineConfig({
    options: {
        typeAware: true
    },
    plugins: ["typescript", "unicorn"],
    jsPlugins: [{ name: "eslint-js", specifier: "oxlint-plugin-eslint" }],
    categories: {
        correctness: "error",
        suspicious: "error",
        pedantic: "error"
    },
    ignorePatterns: [
        "**/node_modules",
        "**/dist",
        "**/.turbo",
        "**/.next",
        "**/.temp",
        "**/out",
        "**/.expo",
        "**/.agents"
    ],
    rules: {
        "typescript/prefer-readonly-parameter-types": "off",
        "typescript/strict-void-return": "off",
        "typescript/no-empty-object-type": "off",
        "typescript/no-explicit-any": "off",
        "typescript/no-namespace": "off",
        "typescript/no-unused-vars": [
            "warn",
            {
                argsIgnorePattern: "^_",
                varsIgnorePattern: "^_"
            }
        ],
        "eslint-js/no-restricted-syntax": [
            "error",
            {
                selector: "NewExpression[callee.name='Date']",
                message: "Use Temporal API instead of Date."
            },
            {
                selector: "CallExpression[callee.object.name='Date']",
                message: "Use Temporal API instead of Date.now()/Date.parse()."
            },
            {
                selector: "Identifier[name='Date']",
                message: "Use Temporal API instead of Date."
            }
        ]
    }
})
