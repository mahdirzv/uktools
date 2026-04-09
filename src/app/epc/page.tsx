import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { EpcTool } from "@/components/epc/EpcTool"

export const metadata: Metadata = {
  title: "EPC Rating Checker UK 2026 — Energy Performance Certificate Lookup",
  description:
    "Look up the EPC rating for any UK property. See current energy rating, annual heating costs, CO₂ emissions, and how much you could save with improvements. Free, no sign-up.",
}

export default function EpcPage() {
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
            EPC Rating Checker
          </h1>
          <p className="mt-3 text-muted-foreground">
            Look up the Energy Performance Certificate for any English or Welsh property.
            See your current rating, estimated annual energy costs, and what improvements
            could save you money.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <InfoChip text="England & Wales only" />
        <InfoChip text="Official EPC register data" />
        <InfoChip text="Updated to Feb 2026" />
      </div>

      <p className="mt-3 text-xs text-muted-foreground">
        Data from{" "}
        <a
          href="https://epc.opendatacommunities.org"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2 hover:text-foreground"
        >
          gov.uk EPC register
        </a>
        .
      </p>

      <EpcTool className="mt-8" />
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
