import type { Metadata } from "next"
import Link from "next/link"
import type { LucideIcon } from "lucide-react"
import {
  Building2,
  CircleParking,
  CreditCard,
  House,
  Search,
  ShieldCheck,
  Waves,
  Wallet,
  Wrench,
} from "lucide-react"

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

type ToolCard = {
  href: string
  icon: LucideIcon
  title: string
  description: string
  tags: string[]
}

const tools: ToolCard[] = [
  {
    href: "/moving",
    icon: House,
    title: "Moving Home Toolkit",
    description: "Stamp duty calculator, full cost breakdown, moving checklist, and utility switching hub.",
    tags: ["First-time buyer", "Stamp duty", "Moving costs"],
  },
  {
    href: "/claim",
    icon: CreditCard,
    title: "ClaimKit",
    description: "Build your Section 75 or chargeback letter in 2 minutes. Get your money back from failed merchants.",
    tags: ["Section 75", "Chargeback", "Consumer rights"],
  },
  {
    href: "/freelance",
    icon: Wallet,
    title: "FreelanceKit",
    description: "Day rate calculator and IR35 status checker for UK contractors and freelancers.",
    tags: ["Day rate", "IR35", "Contracting"],
  },
  {
    href: "/company",
    icon: Building2,
    title: "TrustCheck",
    description: "Look up any UK company on Companies House. Active status, accounts, directors, red flags.",
    tags: ["Companies House", "Business check", "Trust signals"],
  },
  {
    href: "/subscriptions",
    icon: Wrench,
    title: "Subscription Tracker",
    description: "Track your UK subscriptions, see total monthly spend, and get renewal alerts.",
    tags: ["Subscriptions", "Monthly spend", "Renewals"],
  },
  {
    href: "/crime",
    icon: Search,
    title: "CrimeCheck",
    description: "Crime statistics for any UK postcode from official Police UK data.",
    tags: ["Crime rates", "Neighbourhood", "Postcode"],
  },
  {
    href: "/parking",
    icon: CircleParking,
    title: "Parking Appeal",
    description: "Challenge your council parking fine (PCN) for free. Build your appeal letter in 2 minutes.",
    tags: ["PCN", "Parking fine", "Challenge"],
  },
  {
    href: "/flood",
    icon: Waves,
    title: "FloodAlert",
    description: "Check active flood warnings and live river levels for any UK postcode. Environment Agency data.",
    tags: ["Flood risk", "River levels", "Environment Agency"],
  },
  {
    href: "/epc",
    icon: ShieldCheck,
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
        {tools.map((tool) => {
          const Icon = tool.icon

          return (
            <Link
              key={tool.href}
              href={tool.href}
              className="group block rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary/35"
            >
              <Card
                size="sm"
                className="flex h-full flex-col rounded-2xl border border-border/65 bg-card/95 py-0 shadow-[0_1px_2px_rgb(0_0_0_/_0.04)] ring-0 transition-all duration-200 ease-out hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-[0_14px_24px_rgb(0_0_0_/_0.08)] motion-reduce:transform-none motion-reduce:transition-none"
              >
                <CardHeader className="gap-3 p-5">
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 shrink-0 rounded-xl border border-primary/10 bg-primary/10 p-2 text-primary shadow-sm transition-transform duration-200 group-hover:scale-105 motion-reduce:transform-none">
                      <Icon className="size-6 sm:size-7" />
                    </span>
                    <div className="min-w-0">
                      <CardTitle className="text-base font-semibold leading-tight tracking-tight sm:text-lg">
                        {tool.title}
                      </CardTitle>
                      <span className="mt-1 block text-sm text-muted-foreground sm:hidden">
                        {tool.tags[0]}
                      </span>
                    </div>
                    <span className="ml-auto rounded-full bg-muted px-2 py-0.5 text-xs font-medium text-muted-foreground transition-colors group-hover:bg-primary/10 group-hover:text-primary sm:hidden">
                      Open
                    </span>
                  </div>
                  <CardDescription className="hidden text-sm leading-6 text-muted-foreground sm:block sm:line-clamp-3">
                    {tool.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="mt-auto hidden p-5 pt-4 sm:block">
                  <div className="flex flex-wrap gap-2">
                    {tool.tags.map((tag) => (
                      <Badge
                        key={tag}
                        variant="outline"
                        className="rounded-full border border-border/70 bg-muted/60 px-2.5 py-1 text-[11px] font-medium tracking-tight text-foreground/75"
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>

      <p className="mt-10 text-center text-xs text-muted-foreground sm:mt-12">
        More tools coming soon — NHS dentist finder and more.
      </p>
    </div>
  )
}
