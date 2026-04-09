"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CrimeBreakdown } from "./CrimeBreakdown"
import { HomeInsuranceCTA } from "./HomeInsuranceCTA"

interface CrimeCategory {
  category: string
  label: string
  count: number
}

interface CrimeData {
  postcode: string
  total: number
  latestMonth: string
  months: number
  breakdown: CrimeCategory[]
}

export function PostcodeSearch() {
  const [postcode, setPostcode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<CrimeData | null>(null)

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const clean = postcode.trim()
    if (!clean) return

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch(
        `/api/crime?postcode=${encodeURIComponent(clean)}`
      )
      const json = await res.json()

      if (!res.ok) {
        setError(json.error || "Something went wrong. Try again.")
        return
      }

      if (json.total === 0) {
        setError("No crime data found for this postcode. The Police API may not cover this area.")
        return
      }

      setData(json)
    } catch {
      setError("Failed to fetch crime data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mt-8 space-y-6">
      <section className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
        <p className="text-sm font-medium">Search postcode</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Uses official Police UK datasets and shows the latest 12-month trend.
        </p>
        <form onSubmit={handleSearch} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            type="text"
            placeholder="e.g. SW1A 1AA"
            value={postcode}
            onChange={(e) => setPostcode(e.target.value)}
            className="uppercase sm:max-w-[220px]"
            disabled={loading}
          />
          <Button type="submit" disabled={loading || !postcode.trim()}>
            {loading ? "Searching…" : "Check crime rates"}
          </Button>
        </form>
      </section>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {data && (
        <>
          <CrimeBreakdown data={data} />
          <HomeInsuranceCTA />
        </>
      )}
    </div>
  )
}
