import type { Metadata } from "next"
import Link from "next/link"

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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
  {
    href: "/parking",
    emoji: "🅿️",
    title: "Parking Appeal",
    description: "Challenge your council parking fine (PCN) for free. Build your appeal letter in 2 minutes.",
    tags: ["PCN", "Parking fine", "Challenge"],
  },
  {
    href: "/flood",
    emoji: "🌊",
    title: "FloodAlert",
    description: "Check active flood warnings and live river levels for any UK postcode. Environment Agency data.",
    tags: ["Flood risk", "River levels", "Environment Agency"],
  },
  {
    href: "/epc",
    emoji: "🏡",
    title: "EPC Checker",
    description: "Look up the energy rating for any property. See annual costs and what improvements could save you.",
    tags: ["EPC rating", "Energy costs", "Home efficiency"],
  },
]

export default function Home() {
  return (
    <div className="mx-auto w-full max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
      <div className="mb-12 text-center sm:mb-16">
        <h1 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          UK Tools
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-pretty text-base text-muted-foreground sm:text-lg">
          Free calculators and guides built for UK consumers.
          No sign-up. No ads. Just useful tools.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
        {tools.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="group block rounded-xl outline-none focus-visible:ring-2 focus-visible:ring-ring/40"
          >
            <Card
              size="sm"
              className="h-full border border-border/70 py-0 ring-0 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-border hover:bg-accent/30 hover:shadow-sm motion-reduce:transform-none motion-reduce:transition-none"
            >
              <CardHeader className="gap-2 px-4 pt-4 sm:px-5 sm:pt-5">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 shrink-0 text-2xl sm:text-3xl">{tool.emoji}</span>
                  <div className="min-w-0">
                    <CardTitle className="text-base font-semibold leading-snug sm:text-lg">
                      {tool.title}
                    </CardTitle>
                    <span className="mt-1 block text-sm text-muted-foreground sm:hidden">
                      {tool.tags[0]}
                    </span>
                  </div>
                  <span className="ml-auto pt-0.5 text-muted-foreground/45 transition-colors group-hover:text-muted-foreground sm:hidden">
                    →
                  </span>
                </div>
                <CardDescription className="hidden text-sm leading-relaxed text-muted-foreground sm:block sm:line-clamp-2">
                  {tool.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="hidden px-4 pb-4 sm:block sm:px-5 sm:pb-5">
                <div className="flex flex-wrap gap-1.5">
                  {tool.tags.map((tag) => (
                    <Badge key={tag} variant="outline" className="bg-background/70">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground sm:mt-12">
        More tools coming soon — NHS dentist finder and more.
      </p>
    </div>
  )
}
