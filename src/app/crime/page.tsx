import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { PostcodeSearch } from "@/components/crime/PostcodeSearch"

export const metadata: Metadata = {
  title: "Crime Rate by Postcode UK — Neighbourhood Safety Checker",
  description:
    "Check crime statistics for any UK postcode. See crime breakdown by category from official Police UK data. Free, no sign-up.",
}

export default function CrimePage() {
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
            Neighbourhood Crime Checker
          </h1>
          <p className="mt-3 text-muted-foreground">
            Enter any UK postcode to see a breakdown of reported crimes in the area
            over the last 12 months, using official Police UK data.
          </p>
        </div>
      </div>
      <PostcodeSearch />
    </div>
  )
}
