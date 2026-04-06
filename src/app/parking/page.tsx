import type { Metadata } from "next"
import { ParkingWizard } from "@/components/parking/ParkingWizard"

export const metadata: Metadata = {
  title: "Parking Fine Appeal Letter UK 2026 — Free PCN Challenge Builder",
  description:
    "Challenge your UK parking fine (PCN) for free. Build your appeal letter in 2 minutes. ~50% of challenged fines are cancelled. Works for council on-street and car park PCNs.",
}

export default function ParkingPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Got a parking ticket? Challenge it.
      </h1>
      <p className="mt-3 text-muted-foreground">
        Around 1 in 2 challenged council parking fines (PCNs) are cancelled.
        Build your appeal letter in 2 minutes — free.
      </p>

      <div className="mt-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
        <span>✓ Based on UK Traffic Management Act 2004</span>
        <span>✓ Works for all English and Welsh councils</span>
        <span>✓ Used for informal challenges (28-day window from issue)</span>
      </div>

      <ParkingWizard />
    </div>
  )
}
