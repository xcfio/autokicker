import { Activity, Guild, User, Warning, Whitelist } from "@repo/schema"
import { createSelectSchema } from "drizzle-orm/typebox"
import { TObject, TSchema } from "typebox"
import { describe, it } from "node:test"
import { table } from "@repo/database"
import assert from "node:assert"

describe("Schema Match Drizzle", () => {
    it("User", ({ name }) => AssertExtend(name, createSelectSchema(table.user), User))
    it("Guild", ({ name }) => AssertExtend(name, createSelectSchema(table.guild), Guild))
    it("Activity", ({ name }) => AssertExtend(name, createSelectSchema(table.activity), Activity))
    it("Warning", ({ name }) => AssertExtend(name, createSelectSchema(table.warnings), Warning))
    it("Whitelist", ({ name }) => AssertExtend(name, createSelectSchema(table.whitelist), Whitelist))
})

function AssertExtend(name: string, base: TObject, extended: TObject): void {
    const baseKeys = Object.keys(base.properties).sort()
    const extKeys = Object.keys(extended.properties).sort()
    assert.deepStrictEqual(extKeys, baseKeys, `Schema keys mismatch for '${name}'`)

    for (const key of extKeys) {
        const baseSig = typeSignature(base.properties[key])
        const extSig = typeSignature(extended.properties[key])
        assert.deepStrictEqual(extSig, baseSig, `Type mismatch for '${name}.${key}'`)
    }
}

function typeSignature(schema: TSchema): Array<string> {
    const s = schema as Record<string, unknown>

    if (Array.isArray(s["enum"])) return (s["enum"] as string[]).slice().sort()

    if (Array.isArray(s["anyOf"]))
        return (s["anyOf"] as TSchema[])
            .map((x) =>
                String((x as Record<string, unknown>)["const"] ?? (x as Record<string, unknown>)["type"] ?? "unknown")
            )
            .sort()

    return [String(s["type"] ?? "unknown")]
}
