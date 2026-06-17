"use client"

import { cn } from "@/lib/utils"
import { CheckCircle, TrendingUp, Video, Globe } from "lucide-react"

export interface BentoItem {
    title: string
    description: string
    icon: React.ReactNode
    status?: string
    tags?: string[]
    meta?: string
    cta?: string
    colSpan?: number
    hasPersistentHover?: boolean
    gradient?: string
}

interface BentoGridProps {
    items: BentoItem[]
}

const itemsSample: BentoItem[] = [
    {
        title: "Analytics Dashboard",
        meta: "v2.4.1",
        description: "Real-time metrics with AI-powered insights and predictive analytics",
        icon: <TrendingUp className="w-4 h-4" />,
        status: "Live",
        tags: ["Statistics", "Reports", "AI"],
        colSpan: 2,
        hasPersistentHover: true,
        gradient: "from-blue-500 to-cyan-400"
    },
    {
        title: "Task Manager",
        meta: "84 completed",
        description: "Automated workflow management with priority scheduling",
        icon: <CheckCircle className="w-4 h-4" />,
        status: "Updated",
        tags: ["Productivity", "Automation"],
        gradient: "from-blue-600 to-blue-400"
    },
    {
        title: "Media Library",
        meta: "12GB used",
        description: "Cloud storage with intelligent content processing",
        icon: <Video className="w-4 h-4" />,
        tags: ["Storage", "CDN"],
        colSpan: 2,
        gradient: "from-purple-500 to-indigo-500"
    },
    {
        title: "Global Network",
        meta: "6 regions",
        description: "Multi-region deployment with edge computing",
        icon: <Globe className="w-4 h-4" />,
        status: "Beta",
        tags: ["Infrastructure", "Edge"],
        gradient: "from-sky-500 to-blue-600"
    }
]

function BentoGrid({ items = itemsSample }: BentoGridProps) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 max-w-7xl mx-auto">
            {items.map((item, index) => (
                <div
                    key={index}
                    className={cn(
                        "group relative p-6 rounded-2xl overflow-hidden transition-all duration-300",
                        "border border-blue-500/10 bg-blue-950/20 backdrop-blur-sm",
                        "hover:border-blue-500/30 hover:bg-blue-950/40",
                        "hover:shadow-[0_4px_20px_rgba(59,130,246,0.06)]",
                        "hover:-translate-y-0.5 will-change-transform",
                        item.colSpan === 2 ? "col-span-1 md:col-span-2" : "col-span-1",
                        {
                            "border-blue-500/20 bg-blue-950/30 shadow-[0_4px_20px_rgba(59,130,246,0.04)] -translate-y-0.5":
                                item.hasPersistentHover
                        }
                    )}
                >
                    {/* Hover gradient glow */}
                    <div
                        className={cn(
                            "absolute inset-0 opacity-0 group-hover:opacity-[0.07] transition-opacity duration-500 bg-gradient-to-br pointer-events-none",
                            item.gradient || "from-blue-500 to-cyan-400"
                        )}
                    />

                    {/* Ambient glow blob */}
                    <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full bg-blue-500/5 blur-2xl group-hover:bg-blue-500/10 transition-colors duration-500 pointer-events-none" />

                    {/* Radial grid pattern overlay */}
                    <div
                        className={cn(
                            "absolute inset-0 pointer-events-none transition-opacity duration-300",
                            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                    >
                        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[length:8px_8px]" />
                    </div>

                    <div className="relative flex flex-col space-y-5 h-full justify-between z-10">
                        <div className="space-y-4">
                            <div className="flex items-center justify-between">
                                {/* Border gradient icon container */}
                                <div
                                    className={cn(
                                        "relative w-10 h-10 rounded-xl bg-gradient-to-br p-0.5",
                                        item.gradient || "from-blue-500 to-cyan-400"
                                    )}
                                >
                                    <div className="w-full h-full rounded-[10px] bg-[#030711] flex items-center justify-center text-blue-300">
                                        {item.icon}
                                    </div>
                                </div>
                                <span
                                    className={cn(
                                        "text-xs font-semibold px-2.5 py-0.5 rounded-full border backdrop-blur-sm transition-all duration-300",
                                        "bg-blue-950/50 border-blue-500/20 text-blue-300/80 group-hover:text-blue-300 group-hover:border-blue-500/30"
                                    )}
                                >
                                    {item.status || "Active"}
                                </span>
                            </div>

                            <div className="space-y-2">
                                <h3 className="font-bold text-white tracking-tight text-[16px] group-hover:text-blue-100 transition-colors">
                                    {item.title}
                                    <span className="ml-2 text-xs text-blue-300/40 font-normal">{item.meta}</span>
                                </h3>
                                <p className="text-sm text-blue-200/50 leading-relaxed group-hover:text-blue-200/70 transition-colors duration-300">
                                    {item.description}
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-4 border-t border-blue-500/5 mt-4">
                            <div className="flex items-center space-x-2 text-xs">
                                {item.tags?.map((tag, i) => (
                                    <span
                                        key={i}
                                        className="px-2 py-0.5 rounded-md bg-blue-950/40 border border-blue-500/10 text-blue-300/60 text-[10px] backdrop-blur-sm transition-all duration-200 hover:bg-blue-950/80 hover:border-blue-500/20 hover:text-blue-300"
                                    >
                                        #{tag}
                                    </span>
                                ))}
                            </div>
                            <span className="text-xs text-blue-400 group-hover:text-blue-300 font-medium transition-all duration-300 opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0">
                                {item.cta || "Explore →"}
                            </span>
                        </div>
                    </div>

                    {/* Border glow accent */}
                    <div
                        className={cn(
                            "absolute inset-0 -z-10 rounded-2xl p-px bg-gradient-to-br from-transparent via-blue-500/10 to-transparent transition-opacity duration-300 pointer-events-none",
                            item.hasPersistentHover ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                        )}
                    />
                </div>
            ))}
        </div>
    )
}

export { BentoGrid }
