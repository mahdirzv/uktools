"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { FloodWarningCard } from "./FloodWarningCard"
import { RiverGaugeCard } from "./RiverGaugeCard"
import { HomeInsuranceCTA } from "./HomeInsuranceCTA"

interface FloodWarning {
  severity: string
  severityLevel: number
  message: string
  area: string
  lastUpdated: string
}

interface RiverGauge {
  name: string
  riverName: string | null
  currentLevel: number | null
  trend: "rising" | "falling" | "stable"
  distKm: number
}

interface FloodData {
  postcode: string
  warnings: FloodWarning[]
  gauges: RiverGauge[]
  lastUpdated: string
}

export function PostcodeFloodSearch() {
  const [postcode, setPostcode] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [data, setData] = useState<FloodData | null>(null)

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const clean = postcode.trim()
    if (!clean) return

    setLoading(true)
    setError("")
    setData(null)

    try {
      const res = await fetch(`/api/flood?postcode=${encodeURIComponent(clean)}`)
      const json = await res.json()

      if (!res.ok) {
        setError(json.error || "Something went wrong. Try again.")
        return
      }

      setData(json)
    } catch {
      setError("Failed to fetch flood data. Please try again.")
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
          {loading ? "Checking…" : "Check flood risk"}
        </Button>
      </form>

      {error && <p className="text-sm text-destructive">{error}</p>}

      {data && (
        <div className="space-y-8">
          {data.warnings.length === 0 ? (
            <div className="rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-700 dark:bg-green-950/30 dark:text-green-200">
              ✓ No active flood warnings near {data.postcode}
            </div>
          ) : (
            <div className="space-y-3">
              <h2 className="font-semibold">
                Active warnings ({data.warnings.length})
              </h2>
              {data.warnings.map((w, i) => (
                <FloodWarningCard key={i} warning={w} />
              ))}
            </div>
          )}

          {data.gauges.length > 0 && (
            <div className="space-y-3">
              <h2 className="font-semibold">Nearby river gauges</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {data.gauges.map((g, i) => (
                  <RiverGaugeCard key={i} gauge={g} />
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Data from Environment Agency. Last checked:{" "}
            {new Date(data.lastUpdated).toLocaleString("en-GB")}
          </p>

          <HomeInsuranceCTA />
        </div>
      )}
    </div>
  )
}
