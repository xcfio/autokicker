import { Figtree, Cascadia_Code, Comfortaa } from "next/font/google"
import { ThemeProvider } from "next-themes"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import "./globals.css"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })
const comfortaa = Comfortaa({ subsets: ["latin"], variable: "--font-comfortaa" })
const cascadiaCode = Cascadia_Code({ subsets: ["latin"], variable: "--font-mono" })

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
            className={cn("font-sans scroll-smooth", figtree.variable, cascadiaCode.variable, comfortaa.variable)}
        >
            <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
            <head>
                {process.env.NODE_ENV !== "development" && (
                    <script
                        defer
                        src="https://cool-xcfio.vercel.app/script.js"
                        data-website-id="7254c75e-d3bd-4c9a-ac98-dc5e45dde948"
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
                    {children}
                </ThemeProvider>
            </body>
        </html>
    )
}
