import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { SubscriptionList } from "@/components/subscriptions/SubscriptionList"

export const metadata: Metadata = {
  title: "UK Subscription Tracker — Stop Paying for Things You Don't Use",
  description:
    "Free subscription tracker for UK households. Add your subscriptions, see your total monthly spend, and get alerts before renewals hit.",
}

export default function SubscriptionsPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] tool-page-padding">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to UK Tools
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Subscription Tracker
          </h1>
          <p className="mt-3 text-muted-foreground">
            Track your UK subscriptions in one place. See your total monthly spend
            and get warnings before renewals hit.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <InfoChip text="Monthly spend visibility" />
        <InfoChip text="Renewal reminders" />
        <InfoChip text="Quick cancel prioritisation" />
      </div>

      <div className="mt-8">
        <SubscriptionList />
      </div>
    </div>
  )
}

function InfoChip({ text }: { text: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-card px-3 py-2.5 text-muted-foreground">
      {text}
    </div>
  )
}
