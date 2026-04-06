import type { Metadata } from "next"
import { PostcodeFloodSearch } from "@/components/flood/PostcodeFloodSearch"

export const metadata: Metadata = {
  title: "Flood Risk Check UK — Active Warnings & River Levels by Postcode",
  description:
    "Check active Environment Agency flood warnings and live river gauge levels for any UK postcode. Free, updated every 5 minutes.",
}

export default function FloodPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        FloodAlert
      </h1>
      <p className="mt-3 text-muted-foreground">
        Check if your area has active flood warnings and see nearby river levels
        from the Environment Agency.
      </p>
      <PostcodeFloodSearch />
    </div>
  )
}
