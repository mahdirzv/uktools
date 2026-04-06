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
    <div className="mt-8 space-y-8">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          type="text"
          placeholder="e.g. SW1A 1AA"
          value={postcode}
          onChange={(e) => setPostcode(e.target.value)}
          className="max-w-[200px] uppercase"
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !postcode.trim()}>
          {loading ? "Searching…" : "Check crime rates"}
        </Button>
      </form>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
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
