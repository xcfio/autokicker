import { ErrorFallback } from "./components/error-fallback"
import { FileRoutes } from "@solidjs/start/router"
import { ErrorBoundary, Suspense } from "solid-js"
import { Router } from "@solidjs/router"
import { Toaster } from "solid-sonner"
import "./app.css"

export default function App() {
    return (
        <Router
            root={(props) => (
                <Suspense fallback={<div class="flex items-center justify-center h-screen">Loading...</div>}>
                    <ErrorBoundary fallback={(err, reset) => <ErrorFallback error={err} reset={reset} />}>
                        <Toaster
                            theme="system"
                            position="top-right"
                            richColors
                            closeButton
                            expand
                            visibleToasts={5}
                            duration={4000}
                            gap={8}
                            offset={16}
                            swipeDirections={["top", "right"]}
                            containerAriaLabel="Notifications"
                            pauseWhenPageIsHidden
                            toastOptions={{
                                classNames: {
                                    toast: "group font-sans text-sm rounded-lg border shadow-lg px-4 py-3 flex items-start gap-3",
                                    title: "font-medium leading-snug",
                                    description: "text-xs opacity-70 mt-0.5",
                                    actionButton:
                                        "ml-auto shrink-0 rounded-md px-3 py-1 text-xs font-medium transition-colors",
                                    cancelButton:
                                        "ml-auto shrink-0 rounded-md px-3 py-1 text-xs font-medium opacity-60 hover:opacity-100 transition-opacity",
                                    closeButton:
                                        "absolute top-2 right-2 rounded-md p-0.5 opacity-40 hover:opacity-100 transition-opacity"
                                }
                            }}
                        />
                        {props.children}
                    </ErrorBoundary>
                </Suspense>
            )}
        >
            <FileRoutes />
        </Router>
    )
}
