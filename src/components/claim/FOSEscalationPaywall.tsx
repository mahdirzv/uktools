"use client"

import { Suspense } from "react"
import { Separator } from "@/components/ui/separator"
import { PaymentPlaceholder } from "@/components/shared/PaymentPlaceholder"
import { Check } from "lucide-react"

export function FOSEscalationPaywall() {
  return (
    <div className="space-y-6">
      <Separator />

      <div className="space-y-3">
        <h3 className="text-base font-semibold">
          What if the bank rejects your claim?
        </h3>
        <p className="text-sm text-muted-foreground">
          Banks reject valid Section 75 claims routinely. If your bank refuses
          within 8 weeks (or you&apos;re unhappy with their response), you can
          escalate free to the Financial Ombudsman Service (FOS).
        </p>
      </div>

      <Suspense>
        <PaymentPlaceholder
          price="£9.99"
          title="Download FOS Escalation Pack"
          description="Everything you need to take your rejected claim to the Financial Ombudsman."
          ctaLabel="Get FOS Escalation Pack"
        />
      </Suspense>

      <div className="space-y-2 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
          Your escalation pack includes:
        </p>
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-foreground" />
            FOS complaint letter (pre-filled with your case)
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-foreground" />
            What evidence to attach
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-foreground" />
            Timeline of what to expect
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-foreground" />
            What to do if FOS rules against you
          </li>
        </ul>
      </div>
    </div>
  )
}
