import { Figtree, Cascadia_Code } from "next/font/google"
import { Metadata } from "next"
import { cn } from "@/lib/utils"
import "./globals.css"

const figtree = Figtree({ subsets: ["latin"], variable: "--font-sans" })
const cascadiaCode = Cascadia_Code({ subsets: ["latin"], variable: "--font-mono" })

export const metadata: Metadata = {
    title: "Autokicker - Automatically Kick Inactive Discord Members",
    description: "Autokicker - A tool to automatically kick inactive members from your Discord server.",
    keywords: ["Discord", "autokicker", "inactive members", "server management"],
    authors: [{ name: "Autokicker" }],
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
        canonical: "https://autokicker.netlify.app/"
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
        url: "https://autokicker.netlify.app",
        siteName: "Autokicker",
        type: "website",
        images: [
            {
                url: "https://autokicker.netlify.app/icon.png",
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
        images: ["https://autokicker.netlify.app/icon.png"]
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
        <html lang="en" suppressHydrationWarning className={cn("font-sans", figtree.variable, cascadiaCode.variable)}>
            <body className={`antialiased`}>{children}</body>
        </html>
    )
}
