import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { MovingTabs } from "@/components/moving/MovingTabs"
import { VideoPlayer } from "@/components/shared/VideoPlayer"

export const metadata: Metadata = {
  title: "Moving Home Cost Calculator UK 2026 | Stamp Duty + All Costs",
  description:
    "Calculate your total cost of buying a house in the UK — stamp duty (SDLT), solicitor fees, surveys, and more. Includes first-time buyer relief and additional dwelling surcharge.",
}

export default function MovingPage() {
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
            Moving Home Cost Calculator
          </h1>
          <p className="mt-3 text-muted-foreground">
            Moving house in the UK? This free calculator shows your complete cost breakdown
            including stamp duty (with first-time buyer relief), solicitor fees, surveys and
            more — plus a checklist and utility switching hub.
          </p>
        </div>
      </div>

      <VideoPlayer
        src="/stamp-duty-explainer.mp4"
        title="How stamp duty actually works"
        duration="33 sec"
        className="mt-6"
      />

      <MovingTabs />
    </div>
  )
}
