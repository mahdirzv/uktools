import type { Metadata } from "next"
import { PostcodeSearch } from "@/components/crime/PostcodeSearch"

export const metadata: Metadata = {
  title: "Crime Rate by Postcode UK — Neighbourhood Safety Checker",
  description:
    "Check crime statistics for any UK postcode. See crime breakdown by category from official Police UK data. Free, no sign-up.",
}

export default function CrimePage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Neighbourhood Crime Checker
      </h1>
      <p className="mt-3 text-muted-foreground">
        Enter any UK postcode to see a breakdown of reported crimes in the area
        over the last 12 months, using official Police UK data.
      </p>
      <PostcodeSearch />
    </div>
  )
}
