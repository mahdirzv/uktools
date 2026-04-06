"use client"

import { Suspense } from "react"
import { useSearchParams } from "next/navigation"
import { Separator } from "@/components/ui/separator"
import { PaymentPlaceholder } from "@/components/shared/PaymentPlaceholder"
import { LetterDisplay } from "@/components/claim/LetterDisplay"
import { Check } from "lucide-react"
import {
  generateFOSLetter,
  type Section75FormData,
} from "@/lib/claim-generator"

function FOSEscalationPaywallInner({
  formData,
}: {
  formData: Section75FormData
}) {
  const searchParams = useSearchParams()
  const isPreview = searchParams.get("preview") === "1"

  const provider = formData.cardProvider || "your bank"
  const fosDeadline = new Date()
  fosDeadline.setMonth(fosDeadline.getMonth() + 6)
  const deadlineStr = fosDeadline.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return (
    <div className="space-y-6">
      <Separator />

      <div className="space-y-3">
        <h3 className="text-base font-semibold">
          What happens if {provider} rejects your claim?
        </h3>
        <div className="space-y-2 text-sm text-muted-foreground">
          <p>
            Banks reject 1 in 3 Section 75 claims on first submission — often
            hoping customers won&apos;t push back. If {provider} refuses within
            8 weeks, you have 6 months to escalate to the Financial Ombudsman
            Service. FOS upholds 35% of banking complaints in consumers&apos;
            favour, and the process is completely free for you.
          </p>
          <p>
            But writing a persuasive FOS complaint is different from the initial
            Section 75 letter. You need to demonstrate why the bank&apos;s
            position is legally wrong — not just repeat your original claim.
          </p>
        </div>
      </div>

      <PaymentPlaceholder
        price="£9.99"
        title="Get FOS Escalation Pack"
        description="One-time. No subscription. Banks can't ignore the FOS."
        ctaLabel="Get FOS Escalation Pack"
      />

      <div className="space-y-2 text-sm text-muted-foreground">
        <p className="font-medium text-foreground">
          Your escalation pack includes:
        </p>
        <ul className="space-y-1.5">
          <li className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-foreground" />
            Pre-filled FOS complaint letter citing {provider}&apos;s specific
            obligations
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-foreground" />
            Evidence checklist tailored to your case type
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-foreground" />
            The 6-month FOS deadline — calculated from today: {deadlineStr}
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 shrink-0 text-foreground" />
            Common bank rejection arguments — and how to rebut each one
          </li>
        </ul>
      </div>

      {isPreview && (
        <div className="space-y-3">
          <Separator />
          <p className="text-xs font-medium text-green-700">
            Preview mode — FOS letter below
          </p>
          <LetterDisplay letter={generateFOSLetter(formData)} />
        </div>
      )}
    </div>
  )
}

export function FOSEscalationPaywall({
  formData,
}: {
  formData: Section75FormData
}) {
  return (
    <Suspense>
      <FOSEscalationPaywallInner formData={formData} />
    </Suspense>
  )
}
