import type { NextConfig } from "next"

const nextConfig: NextConfig = {
    experimental: {
        // @ts-expect-error: This is a valid option, but the type definitions are not up to date yet.
        useTypeScriptCli: true
    }
}

export default nextConfig
