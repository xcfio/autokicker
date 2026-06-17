import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LegalLayout } from "@/components/legal-layout"
import { Separator } from "@/components/ui/separator"
import { SafeString } from "@/lib/string"
import Link from "next/link"

const sections = [
    {
        title: "1. Information We Collect",
        body: [
            "We collect only the metadata required to determine member activity. We do not read, store, or log the content of any messages."
        ],
        list: [
            "Activity metadata: timestamps of messages sent, voice channel joins, and reactions (no content)",
            "Discord IDs: user ID, server (guild) ID, and role IDs, used to track activity and apply whitelists",
            "Server configuration: settings you provide via slash commands (inactivity threshold, warning stages, enforcement mode, whitelist)",
            "Account email: if you log in to the web dashboard, we collect the email associated with your Discord account via OAuth"
        ]
    },
    {
        title: "2. How We Use Information",
        body: ["We use the information above to:"],
        list: [
            "Determine which members are inactive based on your configured thresholds",
            "Send automated DM warnings before enforcement",
            "Kick or ban members per your server's configuration",
            "Display your server's settings and activity logs on the dashboard",
            "Log warnings, kicks, and bans to your designated mod channel"
        ]
    },
    {
        title: "3. Data Retention",
        body: [
            "Activity metadata is retained only as long as needed to evaluate inactivity thresholds and is refreshed continuously. If the bot is removed from your server, associated server data is deleted within a reasonable period."
        ]
    },
    {
        title: "4. Data Sharing",
        body: [
            "We do not sell or share your data with third parties. Data is only used to operate Autokicker's features as described above."
        ]
    },
    {
        title: "5. Your Rights",
        body: [
            "Server administrators can remove the bot at any time, which stops data collection for that server. You may also contact us to request deletion of stored data for your server."
        ]
    },
    {
        title: "6. Children's Privacy",
        body: ["Autokicker is not directed at children under 13, consistent with Discord's own age requirements."]
    },
    {
        title: "7. Changes to This Policy",
        body: [
            "We may update this Privacy Policy from time to time. Continued use of Autokicker after changes constitutes acceptance of the updated policy."
        ]
    },
    {
        title: "8. Contact",
        body: [
            "For privacy questions or data deletion requests, contact us through our Discord server or support channel."
        ]
    }
]

export default function PrivacyPage() {
    return (
        <LegalLayout>
            <section className="relative overflow-hidden">
                {/* ambient glow, matches landing page treatment */}
                {/* <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-blue-600/8 blur-[120px] pointer-events-none rounded-full" /> */}

                <div className="relative max-w-4xl mx-auto px-6 py-24">
                    <div className="flex flex-col gap-4 mb-12">
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                            Privacy{" "}
                            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Policy
                            </span>
                        </h1>
                        <time dateTime="2026-06-17" className="text-blue-300/60 text-sm font-mono tracking-wide">
                            Last updated: 17th June 2026
                        </time>
                        <p className="text-blue-100/70 leading-relaxed mt-2 max-w-2xl">
                            By inviting Autokicker (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) to your Discord
                            server, you and your server acknowledge and agree to this Privacy Policy and our{" "}
                            <Link
                                href="/terms"
                                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
                            >
                                Terms of Service
                            </Link>
                            .
                        </p>
                    </div>

                    <Separator className="bg-blue-500/10 mb-12" />

                    <div className="flex flex-col gap-6">
                        {sections.map((section) => (
                            <Card
                                key={section.title}
                                id={SafeString(section.title)}
                                className="bg-blue-950/20 border-blue-500/10 hover:border-blue-500/20 transition-colors duration-300 scroll-mt-24"
                            >
                                <CardHeader>
                                    <CardTitle className="text-white text-xl hover:underline">
                                        <Link scroll={false} href={`#${SafeString(section.title)}`}>
                                            {section.title}
                                        </Link>
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="flex flex-col gap-3">
                                    {section.body.map((paragraph, i) => (
                                        <CardDescription key={i} className="text-blue-100/70 leading-relaxed">
                                            {paragraph}
                                        </CardDescription>
                                    ))}
                                    {section.list && (
                                        <ul className="flex flex-col gap-2 pl-1">
                                            {section.list.map((item) => (
                                                <li
                                                    key={item}
                                                    className="flex gap-2.5 text-sm text-blue-100/70 leading-relaxed"
                                                >
                                                    <span className="mt-1.5 size-1 rounded-full bg-blue-400 shrink-0" />
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </LegalLayout>
    )
}
