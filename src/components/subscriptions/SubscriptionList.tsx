"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { RenewalBadge } from "./RenewalBadge"
import { AddSubscriptionForm } from "./AddSubscriptionForm"
import { BroadbandAffiliate } from "./BroadbandAffiliate"
import {
  type Subscription,
  type Category,
  getSubscriptions,
  addSubscription,
  deleteSubscription,
  daysUntilRenewal,
  hasBroadbandSubscription,
} from "@/lib/subscriptions"

export function SubscriptionList() {
  const [subs, setSubs] = useState<Subscription[]>([])
  const [showForm, setShowForm] = useState(false)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setSubs(getSubscriptions())
    setMounted(true)
  }, [])

  function handleAdd(data: { name: string; costPerMonth: number; renewalDate: string; category: Category }) {
    const updated = addSubscription(data)
    setSubs(updated)
    setShowForm(false)
  }

  function handleDelete(id: string) {
    const updated = deleteSubscription(id)
    setSubs(updated)
  }

  const sorted = [...subs].sort(
    (a, b) => daysUntilRenewal(a.renewalDate) - daysUntilRenewal(b.renewalDate)
  )

  const total = subs.reduce((sum, s) => sum + s.costPerMonth, 0)
  const showBroadbandCta = hasBroadbandSubscription(subs)

  if (!mounted) {
    return <div className="mt-8 h-48 animate-pulse rounded-xl bg-muted" />
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">Total monthly spend</p>
          <p className="text-3xl font-bold tracking-tight">
            £{total.toFixed(2)}
          </p>
        </div>
        {!showForm && (
          <Button onClick={() => setShowForm(true)}>+ Add subscription</Button>
        )}
      </div>

      {showForm && (
        <AddSubscriptionForm
          onAdd={handleAdd}
          onCancel={() => setShowForm(false)}
        />
      )}

      {showBroadbandCta && <BroadbandAffiliate />}

      {sorted.length === 0 ? (
        <div className="rounded-xl border border-dashed p-8 text-center text-muted-foreground">
          No subscriptions yet. Add one to start tracking your spending.
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          {sorted.map((sub) => (
            <div
              key={sub.id}
              className="flex items-center gap-3 rounded-xl border bg-card p-4 ring-1 ring-foreground/10"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="font-medium">{sub.name}</p>
                  <span className="rounded-full border px-2 py-0.5 text-xs text-muted-foreground">
                    {sub.category}
                  </span>
                </div>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  £{sub.costPerMonth.toFixed(2)}/mo
                </p>
              </div>
              <RenewalBadge renewalDate={sub.renewalDate} />
              <Button
                variant="ghost"
                size="icon-sm"
                onClick={() => handleDelete(sub.id)}
                aria-label={`Delete ${sub.name}`}
              >
                ✕
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
