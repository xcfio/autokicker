"use client"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { forwardRef, useEffect, useRef, useState } from "react"
import { ArrowRight, CircleCheck } from "lucide-react"
import { Switch as SwitchPrimitives } from "radix-ui"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const Switch = forwardRef<
    React.ComponentRef<typeof SwitchPrimitives.Root>,
    React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
    <SwitchPrimitives.Root
        className={cn(
            "peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input",
            className
        )}
        {...props}
        ref={ref}
    >
        <SwitchPrimitives.Thumb
            className={cn(
                "pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
            )}
        />
    </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

interface PricingFeature {
    text: string
}
interface PricingPlan {
    id: string
    name: string
    description: string
    monthlyPrice: string
    yearlyPrice: string
    features: PricingFeature[]
    button: {
        text: string
        url: string
    }
}
interface Pricing2Props {
    heading?: string
    description?: string
    plans?: PricingPlan[]
}

export const Pricing = ({
    heading = "Plans & Pricing",
    description = "Choose the plan that matches your workflow and scale with ease.",
    plans = [
        {
            id: "starter",
            name: "Starter",
            description: "For individuals just getting started",
            monthlyPrice: "$12",
            yearlyPrice: "$9",
            features: [
                { text: "1 project" },
                { text: "Basic analytics" },
                { text: "Email support" },
                { text: "500MB storage" }
            ],
            button: {
                text: "Get Started",
                url: "https://21st.dev"
            }
        },
        {
            id: "growth",
            name: "Growth",
            description: "For teams building serious products",
            monthlyPrice: "$39",
            yearlyPrice: "$29",
            features: [
                { text: "Unlimited projects" },
                { text: "Team collaboration tools" },
                { text: "Priority chat support" },
                { text: "Advanced analytics" }
            ],
            button: {
                text: "Upgrade Now",
                url: "https://21st.dev"
            }
        }
    ]
}: Pricing2Props) => {
    const [isYearly, setIsYearly] = useState(false)
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

    // --- minimal hero particles ---
    const canvasRef = useRef<HTMLCanvasElement | null>(null)
    useEffect(() => {
        if (!isDesktop) return

        const canvas = canvasRef.current
        const ctx = canvas?.getContext("2d")
        if (!canvas || !ctx) return

        const setSize = () => {
            const rect = canvas.parentElement?.getBoundingClientRect()
            const w = Math.max(1, Math.floor(rect?.width ?? window.innerWidth))
            const h = Math.max(1, Math.floor(rect?.height ?? window.innerHeight))
            const dpr = Math.min(window.devicePixelRatio || 1, 2)
            canvas.width = Math.floor(w * dpr)
            canvas.height = Math.floor(h * dpr)
            canvas.style.width = `${w}px`
            canvas.style.height = `${h}px`
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
        }
        setSize()

        type P = { x: number; y: number; v: number; o: number }
        let parts: P[] = []
        let raf = 0

        const make = (): P => ({
            x: Math.random() * (canvas.width / (window.devicePixelRatio || 1)),
            y: Math.random() * (canvas.height / (window.devicePixelRatio || 1)),
            v: Math.random() * 0.25 + 0.05,
            o: Math.random() * 0.35 + 0.15
        })

        const init = () => {
            parts = []
            const w = canvas.width / (window.devicePixelRatio || 1)
            const h = canvas.height / (window.devicePixelRatio || 1)
            const count = Math.floor((w * h) / 12000)
            for (let i = 0; i < count; i++) parts.push(make())
        }

        // Only draw/animate when visible in the viewport
        let isVisible = true
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting
            },
            { threshold: 0.01 }
        )
        if (canvas.parentElement) {
            observer.observe(canvas.parentElement)
        }

        const draw = () => {
            raf = requestAnimationFrame(draw)
            if (!isVisible) return
            const w = canvas.width / (window.devicePixelRatio || 1)
            const h = canvas.height / (window.devicePixelRatio || 1)
            ctx.clearRect(0, 0, w, h)
            parts.forEach((p) => {
                p.y -= p.v
                if (p.y < 0) {
                    p.x = Math.random() * w
                    p.y = h + Math.random() * 40
                    p.v = Math.random() * 0.25 + 0.05
                    p.o = Math.random() * 0.35 + 0.15
                }
                ctx.fillStyle = `rgba(250,250,250,${p.o})`
                ctx.fillRect(p.x, p.y, 0.7, 2.2)
            })
        }

        const onResize = () => {
            setSize()
            init()
        }

        const ro = new ResizeObserver(onResize)
        ro.observe(canvas.parentElement || document.body)

        init()
        raf = requestAnimationFrame(draw)
        return () => {
            ro.disconnect()
            observer.disconnect()
            cancelAnimationFrame(raf)
        }
    }, [isDesktop])

    return (
        <section
            data-locked
            className="relative min-h-screen py-24 md:py-32 bg-[#030711] text-white overflow-hidden isolate"
        >
            <style>{`
                .pricing-accent-lines{position:absolute;inset:0;pointer-events:none;opacity:.5}
                .pricing-hline,.pricing-vline{position:absolute;background:rgba(59,130,246,0.15)}
                .pricing-hline{left:0;right:0;height:1px;transform:scaleX(0);transform-origin:50% 50%;animation:pDrawX .6s ease forwards}
                .pricing-vline{top:0;bottom:0;width:1px;transform:scaleY(0);transform-origin:50% 0%;animation:pDrawY .7s ease forwards}
                .pricing-hline:nth-child(1){top:18%;animation-delay:.08s}
                .pricing-hline:nth-child(2){top:50%;animation-delay:.16s}
                .pricing-hline:nth-child(3){top:82%;animation-delay:.24s}
                .pricing-vline:nth-child(4){left:18%;animation-delay:.20s}
                .pricing-vline:nth-child(5){left:50%;animation-delay:.28s}
                .pricing-vline:nth-child(6){left:82%;animation-delay:.36s}
                @keyframes pDrawX{to{transform:scaleX(1)}}
                @keyframes pDrawY{to{transform:scaleY(1)}}
                .card-animate{opacity:0;transform:translateY(12px);animation:fadeUp .6s ease .25s forwards}
                @keyframes fadeUp{to{opacity:1;transform:translateY(0)}}
            `}</style>

            {/* Blue glow blobs */}
            <div className="pointer-events-none absolute inset-0" aria-hidden="true">
                <div className="absolute top-1/4 left-1/3 w-125 h-125 rounded-full bg-blue-600/8 blur-[120px]" />
                <div className="absolute bottom-1/4 right-1/3 w-100 h-100 rounded-full bg-cyan-500/6 blur-[100px]" />
            </div>
            <div className="pointer-events-none absolute inset-0 [background:radial-gradient(80%_60%_at_50%_15%,rgba(59,130,246,0.06),transparent_60%)]" />

            {/* Animated accent lines */}
            <div aria-hidden className="pricing-accent-lines">
                <div className="pricing-hline" />
                <div className="pricing-hline" />
                <div className="pricing-hline" />
                <div className="pricing-vline" />
                <div className="pricing-vline" />
                <div className="pricing-vline" />
            </div>

            {/* Particles */}
            {isDesktop && (
                <canvas
                    ref={canvasRef}
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full opacity-50 pointer-events-none"
                />
            )}

            {/* Content */}
            <div className="relative max-w-7xl mx-auto px-6">
                <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center">
                    <h2 className="text-pretty text-4xl font-black lg:text-6xl tracking-tight">
                        {heading.split(",")[0]},{" "}
                        <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                            {heading.split(",")[1]?.trim() ?? ""}
                        </span>
                    </h2>
                    <p className="text-blue-200/75 lg:text-xl">{description}</p>

                    <div className="flex items-center gap-3 text-lg">
                        Monthly
                        <Switch
                            className="text-blue-600"
                            checked={isYearly}
                            onCheckedChange={() => setIsYearly(!isYearly)}
                            aria-label="Toggle between monthly and yearly billing"
                        />
                        Yearly
                    </div>

                    <div className="mt-2 flex flex-col items-stretch gap-6 md:flex-row">
                        {plans.map((plan, i) => (
                            <Card
                                key={plan.id}
                                className={`card-animate flex w-80 flex-col justify-between text-left border-blue-500/20 bg-blue-950/20 backdrop-blur-sm hover:border-blue-500/40 hover:bg-blue-950/30 transition-all duration-300 ${
                                    i === 1 ? "md:translate-y-2" : ""
                                }`}
                                style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                            >
                                <CardHeader>
                                    <CardTitle>
                                        <p className="text-white">{plan.name}</p>
                                    </CardTitle>
                                    <p className="text-sm text-blue-200/75">{plan.description}</p>
                                    <span className="text-4xl font-bold bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                        {isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                                    </span>
                                    <p className="text-blue-300/75">
                                        {isYearly
                                            ? `Billed ${plan.yearlyPrice.slice(0, 1)}${Number(plan.yearlyPrice.slice(1))} annually`
                                            : `Billed ${plan.monthlyPrice.slice(0, 1)}${Number(plan.monthlyPrice.slice(1)) * 12} annually`}
                                    </p>
                                </CardHeader>

                                <CardContent>
                                    <Separator className="mb-6 bg-blue-500/15" />
                                    {plan.id === "growth" && (
                                        <p className="mb-3 font-semibold text-blue-100">Everything in Starter, and:</p>
                                    )}
                                    <ul className="space-y-4">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center gap-2 text-blue-100/70">
                                                <CircleCheck className="size-4 text-blue-400" />
                                                <span>{feature.text}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </CardContent>

                                <CardFooter className="mt-auto">
                                    <Button
                                        asChild
                                        className="w-full rounded-full bg-blue-600 text-white hover:bg-blue-500 shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 transition-all duration-200"
                                    >
                                        <a
                                            href={plan.button.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            aria-label={`${plan.button.text} (opens in a new tab)`}
                                        >
                                            {plan.button.text}
                                            <ArrowRight className="ml-2 size-4" />
                                        </a>
                                    </Button>
                                </CardFooter>
                            </Card>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    )
}
