// oxlint-disable

import { TemporalPolyfill } from "@/components/temporal-polyfill"
import { Figtree, Fira_Code, Comfortaa } from "next/font/google"
import { Temporal, toTemporalInstant } from "temporal-polyfill"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "next-themes"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import { Suspense } from "react"
import "./globals.css"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })
const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-comfortaa" })
const firaCode = Fira_Code({ subsets: ["latin"], variable: "--font-mono" })

if (typeof globalThis.Temporal === "undefined") {
    // @ts-expect-error - Polyfill Temporal
    globalThis.Temporal = Temporal
    // @ts-expect-error - Polyfill Temporal
    globalThis.Temporal.polyfilled = true

    console.info("Server -> Temporal not defined - polyfilled")
} else {
    console.info("Server -> Temporal is already defined - not polyfilling")
}

if (typeof Date.prototype.toTemporalInstant !== "function") {
    // @ts-expect-error - Polyfill Temporal
    Date.prototype.toTemporalInstant = toTemporalInstant
    console.info("Server -> Date.prototype.toTemporalInstant not defined - polyfilling")
} else {
    console.info("Server -> Date.prototype.toTemporalInstant is already defined - not polyfilling")
}

export const metadata: Metadata = {
    title: "Autokicker - Automatically Kick Inactive Discord Members",
    description: "Autokicker - A tool to automatically kick inactive members from your Discord server.",
    keywords: ["Discord", "autokicker", "inactive members", "server management"],
    authors: [{ name: "xcfio", url: "https://xcfio.com" }],
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1
        }
    },
    alternates: {
        canonical: "https://autokicker.xcfio.com"
    },
    icons: {
        icon: [
            { url: "/icon.svg" },
            { url: "/icon.png", sizes: "16x16", type: "image/png" },
            { url: "/icon.png", sizes: "32x32", type: "image/png" }
        ],
        apple: [
            { url: "/icon.png" },
            { url: "/icon.png", sizes: "152x152" },
            { url: "/icon.png", sizes: "167x167" },
            { url: "/icon.png", sizes: "180x180" }
        ]
    },
    manifest: "/manifest.json",
    openGraph: {
        title: "Autokicker - Automatically Kick Inactive Discord Members",
        description: "Autokicker - A tool to automatically kick inactive members from your Discord server.",
        url: "https://autokicker.xcfio.com",
        siteName: "Autokicker",
        type: "website",
        images: [
            {
                url: "https://autokicker.xcfio.com/icon.png",
                width: 512,
                height: 512,
                alt: "Autokicker Logo"
            }
        ]
    },
    twitter: {
        card: "summary_large_image",
        title: "Autokicker - Automatically Kick Inactive Discord Members",
        description: "Autokicker - A tool to automatically kick inactive members from your Discord server.",
        images: ["https://autokicker.xcfio.com/icon.png"]
    },
    appleWebApp: {
        capable: true,
        statusBarStyle: "default",
        title: "Autokicker"
    },
    applicationName: "Autokicker"
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={cn("font-sans scroll-smooth", figtree.variable, firaCode.variable, comfortaa.variable)}
        >
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <head>
                {process.env.NODE_ENV !== "development" && (
                    <script
                        defer
                        src="https://cool-xcfio.vercel.app/script.js"
                        data-website-id="9a4ce4bd-8f6d-4e11-b623-86503a3c7f84"
                    ></script>
                )}
                <script
                    dangerouslySetInnerHTML={{
                        __html: `
                            try {
                                if (localStorage.theme === 'dark' || ((!('theme' in localStorage) || localStorage.theme === 'system') && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
                                    document.querySelector('meta[name="theme-color"]').setAttribute('content', '#141414')
                                }
                                if (localStorage.layout) {
                                    document.documentElement.classList.add('layout-' + localStorage.layout)
                                }
                            } catch (_) {}
                        `
                    }}
                />
                <meta name="theme-color" content={"#ffffff"} />
            </head>

            <body className={`antialiased`}>
                <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
                    <Toaster richColors position="top-right" />
                    <TemporalPolyfill />
                    <Suspense>{children}</Suspense>
                </ThemeProvider>
            </body>
        </html>
    )
}
