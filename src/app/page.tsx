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
    description: "Stamp duty calculator, full cost breakdown, moving checklist, and utility switching hub.",
    tags: ["First-time buyer", "Stamp duty", "Moving costs"],
  },
  {
    href: "/claim",
    emoji: "💳",
    title: "ClaimKit",
    description: "Build your Section 75 or chargeback letter in 2 minutes. Get your money back from failed merchants.",
    tags: ["Section 75", "Chargeback", "Consumer rights"],
  },
  {
    href: "/freelance",
    emoji: "💼",
    title: "FreelanceKit",
    description: "Day rate calculator and IR35 status checker for UK contractors and freelancers.",
    tags: ["Day rate", "IR35", "Contracting"],
  },
  {
    href: "/company",
    emoji: "🏢",
    title: "TrustCheck",
    description: "Look up any UK company on Companies House. Active status, accounts, directors, red flags.",
    tags: ["Companies House", "Business check", "Trust signals"],
  },
  {
    href: "/subscriptions",
    emoji: "🔄",
    title: "Subscription Tracker",
    description: "Track your UK subscriptions, see total monthly spend, and get renewal alerts.",
    tags: ["Subscriptions", "Monthly spend", "Renewals"],
  },
  {
    href: "/crime",
    emoji: "🔍",
    title: "CrimeCheck",
    description: "Crime statistics for any UK postcode from official Police UK data.",
    tags: ["Crime rates", "Neighbourhood", "Postcode"],
  },
]

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-5xl px-4 py-16 sm:py-24">
      {/* Header */}
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
          UK Tools
        </h1>
        <p className="mx-auto mt-4 max-w-lg text-lg text-muted-foreground">
          Free calculators and guides built for UK consumers.
          No sign-up. No ads. Just useful tools.
        </p>
      </div>

      {/* Grid on md+, compact list on mobile */}
      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group rounded-xl border bg-card p-5 transition-colors hover:border-foreground/25 hover:bg-accent
                       flex items-center gap-3
                       sm:flex-col sm:items-start sm:gap-4 sm:p-6"
          >
            {/* Mobile: inline row — emoji + title + arrow */}
            {/* sm+: card layout — emoji on top, title, description, tags */}

            <span className="shrink-0 text-2xl sm:text-3xl">{tool.emoji}</span>

            <div className="min-w-0 flex-1 sm:flex-none sm:w-full">
              <h2 className="font-semibold leading-snug group-hover:underline
                             text-base sm:text-lg">
                {tool.title}
              </h2>

              {/* Description — hidden on mobile, shown on sm+ */}
              <p className="mt-1 hidden text-sm text-muted-foreground sm:block sm:line-clamp-2">
                {tool.description}
              </p>

              {/* Tags — hidden on mobile */}
              <div className="mt-3 hidden flex-wrap gap-1.5 sm:flex">
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

            {/* Arrow — only on mobile row layout */}
            <span className="ml-auto shrink-0 text-muted-foreground/40 transition-colors group-hover:text-muted-foreground sm:hidden">
              →
            </span>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground">
        More tools coming soon — flood risk, NHS dentist finder, and more.
      </p>
    </div>
  )
}
