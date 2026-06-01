import { TriangleAlert, ArrowLeft, Copy, Check } from "lucide-solid"
import { createSignal, For, onMount, Show } from "solid-js"
import { useNavigate } from "@solidjs/router"

interface ErrorPageProps {
    error?: Error
    reset?: () => void
}

export function ErrorFallback(props: ErrorPageProps) {
    const navigate = useNavigate()
    const [mounted, setMounted] = createSignal(false)
    const [copied, setCopied] = createSignal(false)
    const [particles, setParticles] = createSignal<
        Array<{ left: string; top: string; delay: string; duration: string }>
    >([])

    const timestamp = new Date()
    const errorMessage = props.error?.message ?? "An unexpected error occurred."
    const stackTrace = props.error?.stack ?? "No stack trace available."

    const infoRows = [
        { label: "Request ID", value: timestamp.getTime().toString(36).toUpperCase() },
        { label: "Timestamp", value: timestamp },
        { label: "User Agent", value: navigator.userAgent },
        { label: "URL", value: globalThis?.location?.href }
    ]

    const handleCopy = async () => {
        await navigator.clipboard.writeText(
            `Error Report - ${timestamp.toLocaleString()}\n${infoRows.map((row) => `${row.label}: ${row.value}`).join("\n")}\n\nMessage:\n${errorMessage}\n\nStack Trace:\n${stackTrace}`
        )
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    onMount(() => {
        setMounted(true)

        const generatedParticles = [...Array(50)].map(() => ({
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            delay: `${Math.random() * 3}s`,
            duration: `${2 + Math.random() * 3}s`
        }))
        setParticles(generatedParticles)
    })

    return (
        <>
            <main class="min-h-screen bg-linear-to-br from-red-950 via-rose-900 to-red-950 flex items-center justify-center p-4 overflow-hidden relative">
                {/* Background particles */}
                <div class="absolute inset-0 overflow-hidden" aria-hidden="true">
                    <For each={particles()}>
                        {(particle) => (
                            <div
                                class="particle absolute w-1 h-1 bg-rose-300 rounded-full opacity-30"
                                style={{
                                    left: particle.left,
                                    top: particle.top,
                                    "animation-delay": particle.delay,
                                    "animation-duration": particle.duration
                                }}
                            />
                        )}
                    </For>
                </div>

                {/* Floating geometric shapes */}
                <div class="absolute inset-0 pointer-events-none" aria-hidden="true">
                    <div class="shape-square absolute w-20 h-20 border-2 border-rose-500/30 rotate-45 top-20 left-20 md:w-12 md:h-12 md:top-8 md:left-8" />
                    <div
                        class="shape-circle absolute w-12 h-12 bg-linear-to-r from-rose-500/20 to-red-500/20 rounded-full top-40 right-32 md:w-8 md:h-8 md:top-24 md:right-8"
                        style={{ "animation-delay": "1s" }}
                    />
                    <div
                        class="shape-ring absolute w-16 h-16 border-2 border-red-500/30 rounded-full bottom-32 left-40 md:w-10 md:h-10 md:bottom-16 md:left-8"
                        style={{ "animation-delay": "2s" }}
                    />
                </div>

                <div
                    class={`w-full max-w-2xl flex flex-col gap-8 md:gap-6 relative z-10 transition-all duration-1000 ease-out ${
                        mounted() ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                    }`}
                >
                    {/* Subtitle */}
                    <div class="subtitle-container text-center flex flex-col gap-2">
                        <div class="flex items-center justify-center gap-3">
                            <TriangleAlert class="w-7 h-7 text-rose-400" aria-hidden="true" />
                            <h1 class="text-[clamp(1.25rem,3vw,1.75rem)] font-bold text-white m-0">
                                Something went wrong
                            </h1>
                        </div>
                        <p class="text-rose-100 text-sm m-0">
                            Copy the error report below and send it to us on Discord so we can fix it.
                        </p>
                    </div>

                    {/* Error Card */}
                    <div
                        class="error-card bg-black/30 border border-rose-500/20 rounded-2xl overflow-hidden backdrop-blur-sm"
                        role="alert"
                        aria-live="assertive"
                    >
                        {/* Info rows */}
                        <div class="divide-y divide-rose-500/10">
                            <For each={infoRows}>
                                {(row) => (
                                    <div class="flex items-end gap-4 px-5 py-3">
                                        <span class="text-rose-300 font-mono text-xs w-24 shrink-0 pt-0.5 uppercase tracking-wider">
                                            {row.label}
                                        </span>
                                        <span class="text-white font-mono text-xs break-all">
                                            {row.value instanceof Date ? row.value.toLocaleString() : row.value}
                                        </span>
                                    </div>
                                )}
                            </For>
                        </div>

                        {/* Divider */}
                        <div class="border-t border-rose-500/20" />

                        {/* Error message */}
                        <div class="px-5 py-4 flex flex-col gap-2">
                            <span id="message-heading" class="text-rose-300 font-mono text-xs uppercase tracking-wider">
                                Message
                            </span>
                            <p
                                aria-labelledby="message-heading"
                                class="text-rose-50 font-mono text-xs m-0 leading-relaxed"
                            >
                                {errorMessage}
                            </p>
                        </div>

                        {/* Stack trace */}
                        <div class="border-t border-rose-500/20 px-5 py-4 flex flex-col gap-2">
                            <span id="stack-heading" class="text-rose-300 font-mono text-xs uppercase tracking-wider">
                                Stack Trace
                            </span>
                            <pre
                                aria-labelledby="stack-heading"
                                tabindex="0"
                                class="text-rose-200/60 font-mono text-[11px] m-0 overflow-x-auto whitespace-pre-wrap break-all leading-relaxed max-h-36 overflow-y-auto scrollbar-thin focus-visible:outline-2 focus-visible:outline-rose-400 rounded-md p-1"
                            >
                                {stackTrace}
                            </pre>
                        </div>

                        {/* Copy button */}
                        <div class="border-t border-rose-500/20 px-5 py-3 bg-black/20">
                            <button
                                onClick={handleCopy}
                                class={`w-full py-2.5 rounded-lg font-semibold text-sm transition-all duration-200 inline-flex items-center justify-center gap-2 border focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400 ${
                                    copied()
                                        ? "border-green-500 text-green-400 bg-green-500/10"
                                        : "border-rose-500/50 text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 hover:border-rose-400"
                                }`}
                                aria-label={
                                    copied() ? "Error report copied to clipboard" : "Copy error report to clipboard"
                                }
                            >
                                <Show when={copied()} fallback={<Copy class="w-4 h-4" aria-hidden="true" />}>
                                    <Check class="w-4 h-4" aria-hidden="true" />
                                </Show>
                                {copied() ? "Copied to clipboard!" : "Copy Error Report"}
                            </button>
                        </div>
                    </div>

                    {/* Actions */}
                    <div class="button-container flex flex-col sm:flex-row gap-3 justify-center">
                        <button
                            onClick={() => navigate(-1)}
                            class="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 border-2 border-rose-500 text-white bg-rose-500/20 hover:bg-rose-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                        >
                            <ArrowLeft class="w-4 h-4" aria-hidden="true" />
                            Go Back
                        </button>

                        <Show when={props.reset}>
                            <button
                                onClick={props.reset}
                                class="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all hover:scale-105 active:scale-95 inline-flex items-center justify-center gap-2 border-2 border-rose-500 text-white bg-rose-500/20 hover:bg-rose-500/30 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-400"
                            >
                                Try Again
                            </button>
                        </Show>
                    </div>
                </div>
            </main>

            <style>{`
                @import url("https://fonts.googleapis.com/css2?family=Comfortaa:wght@300;400;500;600;700&display=swap");

                * { font-family: "Comfortaa", cursive; }

                @keyframes pulse-particle {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.8; transform: scale(1.1); }
                }
                @keyframes spin-shape {
                    from { transform: rotate(45deg); }
                    to { transform: rotate(405deg); }
                }
                @keyframes bounce-shape {
                    0%, 20%, 53%, 80%, 100% { transform: translateY(0); }
                    40%, 43% { transform: translateY(-0.75rem); }
                    70% { transform: translateY(-0.375rem); }
                    90% { transform: translateY(-0.125rem); }
                }
                @keyframes fade-in {
                    from { opacity: 0; transform: translateY(1.25rem); }
                    to { opacity: 1; transform: translateY(0); }
                }

                .particle { animation: pulse-particle 2s infinite; }
                .shape-square { animation: spin-shape 20s linear infinite; }
                .shape-circle { animation: bounce-shape 2s infinite; }
                .shape-ring { animation: pulse-particle 3s infinite; }

                .subtitle-container { animation: fade-in 0.8s ease-out 0.3s forwards; opacity: 0; }
                .error-card { animation: fade-in 0.8s ease-out 0.6s forwards; opacity: 0; }
                .button-container { animation: fade-in 0.8s ease-out 1s forwards; opacity: 0; }

                .scrollbar-thin::-webkit-scrollbar { width: 4px; height: 4px; }
                .scrollbar-thin::-webkit-scrollbar-track { background: transparent; }
                .scrollbar-thin::-webkit-scrollbar-thumb { background: rgba(225, 29, 72, 0.3); border-radius: 2px; }
            `}</style>
        </>
    )
}
