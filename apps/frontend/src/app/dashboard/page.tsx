// oxlint-disable no-promise-executor-return
"use client"

import { toast } from "sonner"

import { Button } from "@/components/ui/button"

export default function SonnerTypes() {
    return (
        <div className="flex flex-wrap gap-2">
            <Button variant="outline" onClick={() => toast("Event has been created")}>
                Default
            </Button>
            <Button variant="outline" onClick={() => toast.success("Event has been created")}>
                Success
            </Button>
            <Button variant="outline" onClick={() => toast.info("Be at the area 10 minutes before the event time")}>
                Info
            </Button>
            <Button variant="outline" onClick={() => toast.warning("Event start time cannot be earlier than 8am")}>
                Warning
            </Button>
            <Button variant="outline" onClick={() => toast.error("Event has not been created")}>
                Error
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                    toast.promise<{ name: string }>(
                        () => new Promise((resolve) => setTimeout(() => resolve({ name: "Event" }), 2000)),
                        {
                            loading: "Loading...",
                            success: (data) => `${data.name} has been created`,
                            error: "Error",
                            action: "asd"
                        }
                    )
                }}
            >
                Promise
            </Button>
            <Button
                variant="outline"
                onClick={() =>
                    toast.warning("Temporal API not supported", {
                        description:
                            "Your browser doesn't support the Temporal API. Some features may not work as expected.",
                        dismissible: true,
                        duration: 5000,
                        action: {
                            label: "See Compatible Browsers",
                            onClick: () => {
                                alert("cool")
                            }
                        }
                    })
                }
            >
                Temporal
            </Button>
        </div>
    )
}
