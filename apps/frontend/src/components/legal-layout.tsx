"use client"

import { Footer } from "@/components/footer"
import { Github } from "@/components/icon/github"
import Image from "next/image"
import Link from "next/link"

export function LegalLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-[#030711]">
            {/* Navigation bar — identical to landing page */}
            <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-blue-500/10 bg-[#030711]/70">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0.5 rounded-full bg-[#030711] flex items-center justify-center">
                                <Image
                                    width={100}
                                    height={100}
                                    src="/icon.svg"
                                    alt="Autokicker logo"
                                    className="rounded-full"
                                />
                            </div>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">Autokicker</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm text-blue-200/60">
                        <Link href="/#features" className="hover:text-white transition-colors">
                            Features
                        </Link>
                        <Link href="/#how-it-works" className="hover:text-white transition-colors">
                            How It Works
                        </Link>
                        <Link href="/#pricing" className="hover:text-white transition-colors">
                            Pricing
                        </Link>
                    </div>
                    <Link
                        href="https://discord.com/oauth2/authorize?client_id=1477127592724140195"
                        className="hidden sm:flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium bg-blue-600 hover:bg-blue-500 text-white transition-all duration-200 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40"
                    >
                        Add to Discord
                    </Link>
                </div>
            </nav>

            {/* Content */}
            <main className="relative pt-16">{children}</main>

            {/* Footer — identical to landing page */}
            <div className="bg-[#030711] border-t border-blue-500/10 text-blue-200/60">
                <Footer
                    logo={<Image width={40} height={40} src="/icon.svg" alt="" className="rounded-full" />}
                    brandName="Autokicker"
                    socialLinks={[
                        {
                            icon: <Github className="scale-150" />,
                            href: "https://github.com/xcfio",
                            label: "GitHub"
                        }
                    ]}
                    mainLinks={[
                        { href: "/#features", label: "Features" },
                        { href: "/#how-it-works", label: "How It Works" },
                        { href: "/#pricing", label: "Pricing" },
                        {
                            href: "https://discord.com/oauth2/authorize?client_id=1477127592724140195",
                            label: "Add to Discord"
                        }
                    ]}
                    legalLinks={[
                        { href: "/privacy", label: "Privacy Policy" },
                        { href: "/terms", label: "Terms of Service" }
                    ]}
                    copyright={{
                        text: `© ${Temporal.Now.plainDateISO().year} Autokicker. All rights reserved.`,
                        license: "Made with ❤️ for Discord communities."
                    }}
                />
            </div>
        </div>
    )
}
