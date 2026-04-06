import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "UK Tools — Free calculators and guides for UK consumers",
  description:
    "Free tools for UK homebuyers, freelancers, and consumers. Stamp duty calculator, Section 75 claim builder, IR35 checker, and more.",
}

const tools = [
  {
    href: "/moving",
    emoji: "🏠",
    title: "Moving Home Toolkit",
    description:
      "Stamp duty calculator, full cost breakdown, moving checklist, and utility switching hub.",
    tags: ["First-time buyer", "Stamp duty", "Moving costs"],
  },
  {
    href: "/claim",
    emoji: "💳",
    title: "ClaimKit",
    description:
      "Build your Section 75 or chargeback letter in 2 minutes. Get your money back from failed merchants.",
    tags: ["Section 75", "Chargeback", "Consumer rights"],
  },
  {
    href: "/freelance",
    emoji: "💼",
    title: "FreelanceKit",
    description:
      "Day rate calculator and IR35 status checker for UK contractors and freelancers.",
    tags: ["Day rate", "IR35", "Contracting"],
  },
  {
    href: "/subscriptions",
    emoji: "🔄",
    title: "Subscription Tracker",
    description:
      "Track your UK subscriptions, see total monthly spend, and get renewal alerts before you get charged.",
    tags: ["Subscriptions", "Monthly spend", "Renewals"],
  },
]

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-3xl px-4 py-16 sm:py-24">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          UK Tools
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Free calculators and guides built for UK consumers.
          No sign-up. No ads. Just useful tools.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-1">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group flex flex-col gap-3 rounded-xl border bg-card p-6 transition-colors hover:border-foreground/30 hover:bg-accent"
          >
            <div className="flex items-start gap-4">
              <span className="text-3xl">{tool.emoji}</span>
              <div className="flex-1 min-w-0">
                <h2 className="text-xl font-semibold group-hover:underline">
                  {tool.title}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {tool.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {tool.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-muted-foreground/40 group-hover:text-muted-foreground transition-colors text-xl">
                →
              </span>
            </div>
          </Link>
        ))}
      </div>

      <p className="mt-12 text-center text-xs text-muted-foreground">
        More tools coming soon — flood risk, NHS dentist finder, crime checker, and more.
      </p>
    </div>
  )
}
