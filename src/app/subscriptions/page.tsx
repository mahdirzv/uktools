import type { Metadata } from "next"
import { SubscriptionList } from "@/components/subscriptions/SubscriptionList"

export const metadata: Metadata = {
  title: "UK Subscription Tracker — Stop Paying for Things You Don't Use",
  description:
    "Free subscription tracker for UK households. Add your subscriptions, see your total monthly spend, and get alerts before renewals hit.",
}

export default function SubscriptionsPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Subscription Tracker
      </h1>
      <p className="mt-3 text-muted-foreground">
        Track your UK subscriptions in one place. See your total monthly spend
        and get warnings before renewals hit.
      </p>
      <SubscriptionList />
    </div>
  )
}
