import type { Metadata } from "next"
import { Suspense } from "react"
import Link from "next/link"
import { DayRateCalculator } from "@/components/freelance/DayRateCalculator"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "UK Contractor Day Rate Calculator 2026 — What Should I Charge?",
  description:
    "Enter your target salary to find the right day rate for UK contracting. Accounts for NI, pension, downtime, and IR35 status.",
}

export default function DayRatePage() {
  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="tool-page-padding flex w-full max-w-[720px] flex-col gap-8">
        <div>
          <Link
            href="/freelance"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="size-3.5" />
            Back to Freelance Tools
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Day Rate Calculator
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Enter your target salary to find the right day rate for UK
            contracting.
          </p>
        </div>

        <Suspense>
          <DayRateCalculator />
        </Suspense>
      </main>
    </div>
  )
}
