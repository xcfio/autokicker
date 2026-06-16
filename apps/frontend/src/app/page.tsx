"use client"

import { Activity, Bell, BookOpen, Bot, Clock, Shield, Sword, UserX, Zap } from "lucide-react"
import { ShinyButton } from "@/components/shiny-button"
import { Pricing } from "@/components/pricing-cards"
import { Github } from "@/components/icon/github"
import { Footer } from "@/components/ui/footer"
import { useEffect, useRef, useState } from "react"

import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline"
import Shader from "@/components/animated-shader-background"
import Image from "next/image"
import Link from "next/link"

// ---------- orbital timeline data ----------
const Orbital = [
    {
        id: 1,
        title: "Invite Bot",
        date: "Step 1",
        content:
            "Add Autokicker to your server in one click. Grant it the permissions it needs to read activity and manage members.",
        category: "setup",
        icon: Bot,
        relatedIds: [2],
        status: "completed" as const,
        energy: 90
    },
    {
        id: 2,
        title: "Configure",
        date: "Step 2",
        content:
            "Run /config to define your inactivity threshold, warning intervals, and choose kick or ban as the enforcement action.",
        category: "config",
        icon: Zap,
        relatedIds: [1, 3],
        status: "completed" as const,
        energy: 85
    },
    {
        id: 3,
        title: "Monitor 24/7",
        date: "Step 3",
        content:
            "Autokicker silently watches messages, voice joins, and reactions round-the-clock with zero impact on your chat.",
        category: "monitor",
        icon: Activity,
        relatedIds: [2, 4],
        status: "in-progress" as const,
        energy: 95
    },
    {
        id: 4,
        title: "Warn Users",
        date: "Step 4",
        content:
            "When the threshold nears, members receive a friendly automated DM giving them a chance to re-engage before removal.",
        category: "warn",
        icon: Bell,
        relatedIds: [3, 5],
        status: "in-progress" as const,
        energy: 80
    },
    {
        id: 5,
        title: "Auto Cleanup",
        date: "Step 5",
        content:
            "Unresponsive members are kicked or banned automatically. Every action is timestamped and sent to your mod channel.",
        category: "cleanup",
        icon: UserX,
        relatedIds: [4, 6],
        status: "pending" as const,
        energy: 75
    },
    {
        id: 6,
        title: "Audit Log",
        date: "Step 6",
        content:
            "Review a clean, timestamped log of every warning, kick, and ban right inside Discord. Full transparency, always.",
        category: "audit",
        icon: BookOpen,
        relatedIds: [5],
        status: "pending" as const,
        energy: 70
    }
]

// ---------- pricing plans ----------
const Plans = [
    {
        id: "free",
        name: "Free",
        description: "Everything you need to keep your server clean",
        monthlyPrice: "$0",
        yearlyPrice: "$0",
        features: [
            { text: "Unlimited servers" },
            { text: "Smart multi-signal activity tracking" },
            { text: "Multi-stage automated DM warnings" },
            { text: "Role & user whitelist protection" },
            { text: "Kick or ban enforcement choice" },
            { text: "Hourly background cron sweep" },
            { text: "Transparent mod-channel audit log" }
        ],
        button: {
            text: "Add to Discord — It's Free",
            url: "https://discord.com/oauth2/authorize?client_id=1477127592724140195"
        }
    }
]

// ---------- features data ----------
const Features = [
    {
        icon: Activity,
        title: "Smart Activity Tracking",
        description:
            "We don't just look at messages. Autokicker tracks voice channel joins, text messages, and reactions to get a true picture of who is actually participating.",
        gradient: "from-blue-500 to-cyan-400"
    },
    {
        icon: Bell,
        title: "Automated Multi-Stage Warnings",
        description:
            "Give them a chance to stay. Set custom warning intervals so members receive an automated DM nudging them to say hello before they're removed.",
        gradient: "from-blue-600 to-blue-400"
    },
    {
        icon: Shield,
        title: "Ironclad Whitelists",
        description:
            "Protect your VIPs. Easily whitelist specific roles or users so your moderators, bots, and special guests are completely exempt from the inactivity sweeps.",
        gradient: "from-indigo-500 to-blue-500"
    },
    {
        icon: Sword,
        title: "Kick or Ban: You Decide",
        description:
            "Tailor the bot to your community's strictness level. Choose whether inactive members are softly kicked (allowing them to return) or permanently banned.",
        gradient: "from-blue-700 to-indigo-500"
    },
    {
        icon: Clock,
        title: "Zero-Touch Enforcement",
        description:
            "Set it and forget it. Our background engine runs seamlessly every hour to evaluate thresholds and clean your server while you sleep.",
        gradient: "from-sky-500 to-blue-600"
    },
    {
        icon: BookOpen,
        title: "Transparent Audit Logging",
        description:
            "Never wonder where someone went. Every warning, kick, and ban is cleanly logged to your private mod channel with exact timestamps and reasons.",
        gradient: "from-blue-500 to-violet-500"
    }
]

const Steps = [
    {
        num: "01",
        title: "Connect & Configure",
        description:
            "Invite the bot and use simple slash commands like /config to set your inactivity threshold, warning stages, and enforcement mode.",
        icon: Bot
    },
    {
        num: "02",
        title: "We Monitor Quietly",
        description:
            "Autokicker watches your server 24/7, tracking exactly when each user was last active without interrupting the chat flow.",
        icon: Activity
    },
    {
        num: "03",
        title: "Automated Cleanup",
        description:
            "When someone hits the threshold, we send a warning DM. If they still don't engage, they're removed. You just read the summary in your log channel.",
        icon: UserX
    }
]

export default () => {
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [isDesktop, setIsDesktop] = useState(false)

    useEffect(() => {
        // Check screen size on client side (using Tailwind's sm breakpoint of 640px)
        const mediaQuery = window.matchMedia("(min-width: 640px)")
        setIsDesktop(mediaQuery.matches)

        const handleMediaChange = (e: MediaQueryListEvent) => {
            setIsDesktop(e.matches)
        }

        mediaQuery.addEventListener("change", handleMediaChange)
        return () => {
            mediaQuery.removeEventListener("change", handleMediaChange)
        }
    }, [])

    useEffect(() => {
        if (!isDesktop) return

        const canvas = canvasRef.current
        if (!canvas) return
        const ctx = canvas.getContext("2d")
        if (!ctx) return

        const resize = () => {
            canvas.width = canvas.offsetWidth
            canvas.height = canvas.offsetHeight
        }
        resize()
        window.addEventListener("resize", resize)

        // floating particles
        const particles: { x: number; y: number; r: number; vx: number; vy: number; o: number }[] = []
        for (let i = 0; i < 60; i++) {
            particles.push({
                x: Math.random() * canvas.width,
                y: Math.random() * canvas.height,
                r: Math.random() * 1.5 + 0.3,
                vx: (Math.random() - 0.5) * 0.3,
                vy: (Math.random() - 0.5) * 0.3,
                o: Math.random() * 0.5 + 0.1
            })
        }

        // Only draw/animate when visible in the viewport
        let isVisible = true
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting
            },
            { threshold: 0.01 }
        )
        observer.observe(canvas)

        let raf: number
        const draw = () => {
            raf = requestAnimationFrame(draw)
            if (!isVisible) return
            ctx.clearRect(0, 0, canvas.width, canvas.height)
            particles.forEach((p) => {
                p.x += p.vx
                p.y += p.vy
                if (p.x < 0) p.x = canvas.width
                if (p.x > canvas.width) p.x = 0
                if (p.y < 0) p.y = canvas.height
                if (p.y > canvas.height) p.y = 0
                ctx.beginPath()
                ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
                ctx.fillStyle = `rgba(96,165,250,${p.o})`
                ctx.fill()
            })
        }
        draw()

        return () => {
            observer.disconnect()
            cancelAnimationFrame(raf)
            window.removeEventListener("resize", resize)
        }
    }, [isDesktop])

    return (
        <div className="min-h-screen bg-[#030711]">
            {/* Navigation bar */}
            <nav className="fixed top-0 inset-x-0 z-50 backdrop-blur-xl border-b border-blue-500/10 bg-[#030711]/70">
                <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2.5 group">
                        <div className="relative w-10 h-10">
                            <div className="absolute inset-0.5 rounded-full bg-[#030711] flex items-center justify-center">
                                <Image width={100} height={100} src="/icon.svg" alt="Icon" className="rounded-full" />
                            </div>
                        </div>
                        <span className="font-bold text-lg tracking-tight text-white">Autokicker</span>
                    </Link>

                    <div className="hidden md:flex items-center gap-8 text-sm text-blue-200/60">
                        <Link href="#features" className="hover:text-white transition-colors">
                            Features
                        </Link>
                        <Link href="#how-it-works" className="hover:text-white transition-colors">
                            How It Works
                        </Link>
                        <Link href="#pricing" className="hover:text-white transition-colors">
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

            {/* Hero Section */}
            <section id="hero" className="relative min-h-screen flex items-center overflow-hidden bg-[#030711]">
                {/* background glow blobs */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-1/4 left-1/4 w-150 h-150 rounded-full bg-blue-600/10 blur-[120px]" />
                    <div className="absolute bottom-1/4 right-1/4 w-100 h-100 rounded-full bg-cyan-500/8 blur-[100px]" />
                    <div className="absolute top-0 right-0 w-75 h-75 rounded-full bg-indigo-600/10 blur-[80px]" />
                </div>

                {/* particle canvas */}
                <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none opacity-60" />

                {/* grid pattern overlay */}
                <div
                    className="absolute inset-0 pointer-events-none opacity-[0.03]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(96,165,250,1) 1px, transparent 1px), linear-gradient(90deg, rgba(96,165,250,1) 1px, transparent 1px)`,
                        backgroundSize: "64px 64px"
                    }}
                />

                <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-16 grid lg:grid-cols-2 gap-16 items-center w-full">
                    {/* LEFT: text */}
                    <div className="flex flex-col gap-8">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium w-fit">
                            <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                            Automated 24/7 enforcement
                        </div>

                        <div className="space-y-4">
                            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black leading-[0.9] tracking-tight text-white">
                                Dead Chat?
                                <br />
                                <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                                    Not Anymore.
                                </span>
                            </h1>

                            <p className="text-lg text-blue-100/60 leading-relaxed max-w-lg">
                                Autokicker silently tracks activity, warns lurkers, and automatically removes inactive
                                members — keeping your community vibrant and your member list accurate, with{" "}
                                <span className="text-blue-400 font-medium">zero manual effort.</span>
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-4 items-center">
                            <ShinyButton
                                href="https://discord.com/oauth2/authorize?client_id=1477127592724140195"
                                target="_blank"
                                className="w-full sm:w-auto"
                            >
                                Add Autokicker for Free
                            </ShinyButton>
                            <Link
                                href="/dashboard"
                                className="flex items-center justify-center w-full sm:w-auto text-lg gap-2 px-8 py-4 rounded-full text-blue-300 border border-blue-500/20 hover:border-blue-500/40 hover:text-white hover:bg-blue-500/5 transition-all duration-200 font-medium"
                            >
                                Dashboard
                            </Link>
                        </div>

                        {/* stats */}
                        <div className="flex gap-8 pt-4 border-t border-blue-500/10">
                            {[
                                { value: "24/7", label: "Active monitoring" },
                                { value: "1 day", label: "Sweep interval" },
                                { value: "0", label: "Manual effort" }
                            ].map((stat) => (
                                <div key={stat.label}>
                                    <div className="text-2xl font-bold text-white">{stat.value}</div>
                                    <div className="text-xs text-blue-300/50 mt-0.5">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* RIGHT: radial orbital timeline */}
                    {isDesktop && (
                        <div className="hidden relative h-130 lg:h-150 sm:flex items-center justify-center">
                            {/* glow behind */}
                            <div className="absolute inset-0 rounded-3xl bg-linear-to-br from-blue-600/5 to-cyan-500/5 border border-blue-500/10 backdrop-blur-sm" />
                            <div className="absolute inset-0 flex items-center justify-center">
                                <div className="w-80 h-80 rounded-full bg-blue-600/5 blur-3xl" />
                            </div>
                            <div className="relative w-full h-full">
                                <RadialOrbitalTimeline timelineData={Orbital} />
                            </div>
                            {/* label */}
                            <div className="absolute bottom-4 inset-x-0 text-center text-xs text-blue-400/40 font-mono tracking-widest uppercase">
                                Click a node to explore
                            </div>
                        </div>
                    )}
                </div>
            </section>

            {/* Features section */}
            <section id="features" className="relative bg-[#030711] py-32 overflow-hidden">
                {/* ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-200 h-100 bg-blue-600/5 blur-[120px] pointer-events-none rounded-full" />

                <div className="relative max-w-7xl mx-auto px-6">
                    {/* section header */}
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-6">
                            <Zap size={10} />
                            Feature-packed, zero complexity
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-white mb-4 tracking-tight">
                            Everything you need to run a{" "}
                            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                thriving server
                            </span>
                        </h2>
                        <p className="text-blue-100/50 text-lg max-w-2xl mx-auto">
                            Built specifically for Discord communities that care about engagement over numbers.
                        </p>
                    </div>

                    {/* feature grid */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {Features.map((feature, i) => {
                            const Icon = feature.icon
                            return (
                                <div
                                    key={feature.title}
                                    className="group relative p-6 rounded-2xl border border-blue-500/10 bg-blue-950/20 backdrop-blur-sm hover:border-blue-500/30 hover:bg-blue-950/40 transition-all duration-300 overflow-hidden"
                                    style={{ animationDelay: `${i * 0.08}s` }}
                                >
                                    {/* hover glow */}
                                    <div
                                        className={`absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 bg-linear-to-br ${feature.gradient} opacity-[0.04]`}
                                    />
                                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500" />

                                    <div
                                        className={`relative w-11 h-11 rounded-xl bg-linear-to-br ${feature.gradient} p-0.5 mb-5`}
                                    >
                                        <div className="w-full h-full rounded-[12px] bg-[#030711] flex items-center justify-center">
                                            <Icon size={18} className="text-blue-300" />
                                        </div>
                                    </div>

                                    <h3 className="font-bold text-white text-lg mb-2 group-hover:text-blue-100 transition-colors">
                                        {feature.title}
                                    </h3>
                                    <p className="text-blue-200/50 text-sm leading-relaxed group-hover:text-blue-200/70 transition-colors">
                                        {feature.description}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

            {/* How it works section */}
            <section id="how-it-works" className="relative bg-[#030711] py-24 pb-16 overflow-hidden">
                <div className="max-w-7xl mx-auto px-6">
                    <div className="text-center mb-20">
                        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-300 text-xs font-medium mb-6">
                            <Clock size={10} />3 steps to a cleaner server
                        </div>
                        <h2 className="text-4xl sm:text-5xl font-black text-white tracking-tight">
                            Simple as{" "}
                            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                1, 2, 3
                            </span>
                        </h2>
                    </div>

                    <div className="relative">
                        {/* connector line */}
                        <div className="absolute top-16 left-0 right-0 h-px bg-linear-to-r from-transparent via-blue-500/20 to-transparent hidden lg:block" />

                        <div className="grid lg:grid-cols-3 gap-8">
                            {Steps.map((step) => {
                                const Icon = step.icon
                                return (
                                    <div
                                        key={step.num}
                                        className="relative flex flex-col items-center text-center p-8 group"
                                    >
                                        {/* step number */}
                                        <div className="relative mb-6">
                                            <div className="w-16 h-16 rounded-full border border-blue-500/30 bg-blue-950/50 flex items-center justify-center group-hover:border-blue-400/60 transition-colors duration-300 group-hover:bg-blue-950">
                                                <Icon
                                                    size={24}
                                                    className="text-blue-400 group-hover:text-blue-300 transition-colors"
                                                />
                                            </div>
                                            <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
                                                <span className="text-[9px] font-bold text-white">{step.num}</span>
                                            </div>
                                        </div>

                                        <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                        <p className="text-blue-200/50 text-sm leading-relaxed">{step.description}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing section */}
            <section id="pricing">
                <Pricing
                    heading="Simple, Free Pricing"
                    description="Autokicker is completely free. No hidden fees, no tiers, no limits."
                    plans={Plans}
                />
            </section>

            {/* CTA section */}
            <section id="cta" className="relative bg-[#030711] py-32 overflow-hidden min-h-125">
                {/* Aurora as full section background */}
                <div className="absolute inset-0 pointer-events-none">
                    <Shader />
                </div>

                {/* Dark overlay so text stays readable over the aurora */}
                <div className="absolute inset-0 pointer-events-none bg-linear-to-b from-[#030711]/60 via-[#030711]/40 to-[#030711]/80" />

                {/* Blue glow blob */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-175 h-100 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />

                <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
                    <h2 className="text-4xl sm:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                        Ready to revive{" "}
                        <span className="bg-linear-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                            your server?
                        </span>
                    </h2>
                    <p className="text-blue-200/60 text-xl mb-12 max-w-xl mx-auto">
                        Stop letting inactive users clutter your member list. Join thousands of servers already using
                        Autokicker.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                        <ShinyButton
                            href="https://discord.com/oauth2/authorize?client_id=1477127592724140195"
                            target="_blank"
                            className="w-full sm:w-auto"
                        >
                            Invite Autokicker Now — It&apos;s Free
                        </ShinyButton>
                    </div>

                    <p className="mt-6 text-xs text-blue-400/30 font-mono tracking-wide">
                        No credit card · No setup fee · Runs in seconds
                    </p>
                </div>
            </section>

            {/* Footer section */}
            <div className="bg-[#030711] border-t border-blue-500/10 text-blue-200/60">
                <Footer
                    logo={<Image width={40} height={40} src="/icon.svg" alt="Icon" className="rounded-full" />}
                    brandName="Autokicker"
                    socialLinks={[
                        {
                            icon: <Github className="scale-150" />,
                            href: "https://github.com/xcfio",
                            label: "GitHub"
                        }
                    ]}
                    mainLinks={[
                        { href: "#features", label: "Features" },
                        { href: "#how-it-works", label: "How It Works" },
                        { href: "#pricing", label: "Pricing" },
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
