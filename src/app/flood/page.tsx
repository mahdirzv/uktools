import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PostcodeFloodSearch } from "@/components/flood/PostcodeFloodSearch"

export const metadata: Metadata = {
  title: "Flood Risk Check UK — Active Warnings & River Levels by Postcode",
  description:
    "Check active Environment Agency flood warnings and live river gauge levels for any UK postcode. Free, updated every 5 minutes.",
}

export default function FloodPage() {
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
            FloodAlert
          </h1>
          <p className="mt-3 text-muted-foreground">
            Check if your area has active flood warnings and see nearby river levels
            from the Environment Agency.
          </p>
        </div>
      </div>

      <div className="mt-6 grid gap-3 text-sm sm:grid-cols-3">
        <InfoChip text="Environment Agency flood warnings" />
        <InfoChip text="Live river gauge levels" />
        <InfoChip text="Quick postcode risk check" />
      </div>

      <div className="mt-8">
        <PostcodeFloodSearch />
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
