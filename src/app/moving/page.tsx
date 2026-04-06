import type { Metadata } from "next"
import { MovingTabs } from "@/components/moving/MovingTabs"

export const metadata: Metadata = {
  title: "Moving Home Cost Calculator UK 2026 | Stamp Duty + All Costs",
  description:
    "Calculate your total cost of buying a house in the UK — stamp duty (SDLT), solicitor fees, surveys, and more. Includes first-time buyer relief and additional dwelling surcharge.",
}

export default function MovingPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Moving Home Cost Calculator
      </h1>
      <p className="mt-3 text-muted-foreground">
        Moving house in the UK? This free calculator shows your complete cost breakdown
        including stamp duty (with first-time buyer relief), solicitor fees, surveys and
        more — plus a checklist and utility switching hub.
      </p>

      <div className="mt-6 overflow-hidden rounded-xl border bg-black">
        <video
          src="/stamp-duty-explainer.mp4"
          controls
          autoPlay
          muted
          loop
          playsInline
          className="w-full"
          aria-label="How stamp duty works in the UK — animated explainer"
        />
      </div>

      <MovingTabs />
    </div>
  )
}
