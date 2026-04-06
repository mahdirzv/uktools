import type { Metadata } from "next"
import { EpcTool } from "@/components/epc/EpcTool"
import { VideoPlayer } from "@/components/shared/VideoPlayer"

export const metadata: Metadata = {
  title: "EPC Rating Checker UK 2026 — Energy Performance Certificate Lookup",
  description:
    "Look up the EPC rating for any UK property. See current energy rating, annual heating costs, CO₂ emissions, and how much you could save with improvements. Free, no sign-up.",
}

export default function EpcPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        EPC Rating Checker
      </h1>
      <p className="mt-3 text-muted-foreground">
        Look up the Energy Performance Certificate for any English or Welsh property.
        See your current rating, estimated annual energy costs, and what improvements
        could save you money.
      </p>

      <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
        <span>England &amp; Wales only</span>
        <span>·</span>
        <span>
          Data from{" "}
          <a
            href="https://epc.opendatacommunities.org"
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-foreground"
          >
            gov.uk EPC register
          </a>
        </span>
        <span>·</span>
        <span>Updated to Feb 2026</span>
      </div>

      <EpcTool className="mt-8" />
    </div>
  )
}
