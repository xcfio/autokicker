import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { LegalLayout } from "@/components/legal-layout"
import { Separator } from "@/components/ui/separator"
import Link from "next/link"
import { SafeString } from "@/lib/string"

const sections = [
    {
        title: "1. Description of Service",
        body: [
            "Autokicker is a free Discord bot that tracks member activity (messages, voice channel joins, reactions) and automatically warns and removes (kicks or bans) inactive members based on settings you configure."
        ]
    },
    {
        title: "2. Eligibility",
        body: [
            "You must comply with Discord's Terms of Service and Community Guidelines to use Autokicker. You must have appropriate permissions on your server to invite and configure the bot."
        ]
    },
    {
        title: "3. Acceptance by Server",
        body: [
            "By adding Autokicker to a server, the inviting administrator confirms they have authority to do so on behalf of that server, and both the administrator and the server agree to be bound by these Terms."
        ]
    },
    {
        title: "4. Use of the Service",
        body: [
            "You are responsible for configuring inactivity thresholds, warning stages, whitelists, and enforcement mode appropriately for your community. We are not responsible for kicks or bans resulting from your configuration choices."
        ]
    },
    {
        title: "5. No Warranty",
        body: [
            'Autokicker is provided "as is" and "as available," free of charge, with no warranty of any kind, express or implied, including uninterrupted or error-free operation.'
        ]
    },
    {
        title: "6. Limitation of Liability",
        body: [
            "We are not liable for any damages, loss of members, loss of data, or other harm arising from use of, or inability to use, Autokicker."
        ]
    },
    {
        title: "7. Service Availability",
        body: ["We may modify, suspend, or discontinue Autokicker, in whole or in part, at any time without notice."]
    },
    {
        title: "8. Termination",
        body: [
            "We may suspend or terminate access to Autokicker for any server or user that violates these Terms or Discord's policies."
        ]
    },
    {
        title: "9. Changes to These Terms",
        body: [
            "We may update these Terms from time to time. Continued use of Autokicker after changes constitutes acceptance of the updated Terms."
        ]
    },
    {
        title: "10. Contact",
        body: ["For questions about these Terms, contact us through our Discord server or support channel."]
    }
]

export default function TermsPage() {
    return (
        <LegalLayout>
            <section className="relative overflow-hidden">
                {/* ambient glow, matches landing page treatment */}
                {/* <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-100 bg-blue-600/8 blur-[120px] pointer-events-none rounded-full" /> */}

                <div className="relative max-w-4xl mx-auto px-6 py-24">
                    <div className="flex flex-col gap-4 mb-12">
                        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-white">
                            Terms of{" "}
                            <span className="bg-linear-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">
                                Service
                            </span>
                        </h1>
                        <time dateTime="2026-06-17" className="text-blue-300/60 text-sm font-mono tracking-wide">
                            Last updated: 17th June 2026
                        </time>
                        <p className="text-blue-100/70 leading-relaxed mt-2 max-w-2xl">
                            By inviting Autokicker (&quot;we&quot;, &quot;us&quot;, &quot;our&quot;) to your Discord
                            server, you and your server acknowledge and agree to these Terms of Service and our{" "}
                            <Link
                                href="/privacy"
                                className="text-blue-400 hover:text-blue-300 underline underline-offset-4"
                            >
                                Privacy Policy
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
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>
        </LegalLayout>
    )
}
