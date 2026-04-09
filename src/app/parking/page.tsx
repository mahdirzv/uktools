import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ParkingWizard } from "@/components/parking/ParkingWizard"

export const metadata: Metadata = {
  title: "Parking Fine Appeal Letter UK 2026 — Free PCN Challenge Builder",
  description:
    "Challenge your UK parking fine (PCN) for free. Build your appeal letter in 2 minutes. ~50% of challenged fines are cancelled. Works for council on-street and car park PCNs.",
}

export default function ParkingPage() {
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
            Got a parking ticket? Challenge it.
          </h1>
          <p className="mt-3 text-muted-foreground">
            Around 1 in 2 challenged council parking fines (PCNs) are cancelled.
            Build your appeal letter in 2 minutes — free.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <InfoChip text="Based on UK Traffic Management Act 2004" />
        <InfoChip text="Works for all English and Welsh councils" />
        <InfoChip text="Built for informal challenges (28-day window)" />
      </div>

      <div className="mt-8">
        <ParkingWizard />
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
