"use client"

import { Suspense } from "react"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { PaymentPlaceholder } from "@/components/shared/PaymentPlaceholder"
import { AlertTriangle, CheckCircle2, XCircle } from "lucide-react"
import type { IR35Result as IR35ResultType } from "@/lib/ir35-scorer"

interface IR35ResultProps {
  result: IR35ResultType
}

export function IR35Result({ result }: IR35ResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <Separator />

      <div className="flex flex-col gap-4">
        <StatusBanner status={result.status} />

        {result.status === "outside" && (
          <div className="rounded-xl bg-emerald-50 p-4 text-sm text-emerald-900 ring-1 ring-emerald-200">
            <p>
              Based on your answers, your engagement is likely{" "}
              <strong>outside IR35</strong>. This means you can operate through a
              limited company and pay yourself via dividends.
            </p>
            {result.outsideFactors.length > 0 && (
              <>
                <p className="mt-3 font-medium">
                  Key factors supporting this:
                </p>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {result.outsideFactors.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
            <p className="mt-3 text-xs text-emerald-700">
              ⚠️ This is a guide only, not a legal determination. HMRC can
              challenge IR35 status. Consult an accountant.
            </p>
          </div>
        )}

        {result.status === "borderline" && (
          <div className="rounded-xl bg-amber-50 p-4 text-sm text-amber-900 ring-1 ring-amber-200">
            <p>
              Your engagement has <strong>mixed signals</strong>. We recommend
              getting a formal contract review.
            </p>
            {result.outsideFactors.length > 0 && (
              <>
                <p className="mt-3 font-medium">Outside signals:</p>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {result.outsideFactors.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
            {result.insideFactors.length > 0 && (
              <>
                <p className="mt-3 font-medium">Inside signals:</p>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {result.insideFactors.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}

        {result.status === "inside" && (
          <div className="rounded-xl bg-red-50 p-4 text-sm text-red-900 ring-1 ring-red-200">
            <p>
              Based on your answers, your engagement may be{" "}
              <strong>inside IR35</strong>. This means the fee-payer must treat
              you as an employee for tax purposes.
            </p>
            {result.insideFactors.length > 0 && (
              <>
                <p className="mt-3 font-medium">
                  Key factors indicating this:
                </p>
                <ul className="mt-1 list-disc pl-5 space-y-0.5">
                  {result.insideFactors.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </>
            )}
          </div>
        )}
      </div>

      <Suspense>
        <PaymentPlaceholder
          price="£9.99"
          title="Download your IR35 status summary letter"
          description="Includes: Your questionnaire answers, result summary, and a covering note for your contract file."
          ctaLabel="Get IR35 Status Letter"
        />
      </Suspense>
    </div>
  )
}

function StatusBanner({ status }: { status: "outside" | "borderline" | "inside" }) {
  switch (status) {
    case "outside":
      return (
        <div className="flex items-center gap-2">
          <CheckCircle2 className="size-5 text-emerald-600" />
          <span className="text-lg font-semibold">Likely Outside IR35</span>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-800">
            Outside
          </Badge>
        </div>
      )
    case "borderline":
      return (
        <div className="flex items-center gap-2">
          <AlertTriangle className="size-5 text-amber-600" />
          <span className="text-lg font-semibold">Borderline</span>
          <Badge variant="secondary" className="bg-amber-100 text-amber-800">
            Seek advice
          </Badge>
        </div>
      )
    case "inside":
      return (
        <div className="flex items-center gap-2">
          <XCircle className="size-5 text-red-600" />
          <span className="text-lg font-semibold">Likely Inside IR35</span>
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Inside
          </Badge>
        </div>
      )
  }
}
