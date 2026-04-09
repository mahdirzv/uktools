"use client"

import { useState } from "react"
import { CheckCircle2 } from "lucide-react"
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
    <div className="mt-8 space-y-6">
      <section className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
        <p className="text-sm font-medium">Search postcode</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Checks active warnings and nearby river gauge trends.
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
            {loading ? "Checking…" : "Check flood risk"}
          </Button>
        </form>
      </section>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {data && (
        <div className="space-y-6">
          {data.warnings.length === 0 ? (
            <div className="flex items-center gap-2 rounded-lg border border-green-300 bg-green-50 px-4 py-3 text-sm font-medium text-green-800 dark:border-green-700 dark:bg-green-950/30 dark:text-green-200">
              <CheckCircle2 className="size-4 shrink-0" />
              <span>No active flood warnings near {data.postcode}</span>
            </div>
          ) : (
            <div className="space-y-3 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
              <h2 className="font-semibold">
                Active warnings ({data.warnings.length})
              </h2>
              {data.warnings.map((w, i) => (
                <FloodWarningCard key={i} warning={w} />
              ))}
            </div>
          )}

          {data.gauges.length > 0 && (
            <div className="space-y-3 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
              <h2 className="font-semibold">Nearby river gauges</h2>
              <div className="grid gap-3 sm:grid-cols-3">
                {data.gauges.map((g, i) => (
                  <RiverGaugeCard key={i} gauge={g} />
                ))}
              </div>
            </div>
          )}

          <p className="text-xs text-muted-foreground">
            Source:{" "}
            <a
              href="https://environment.data.gov.uk/flood-monitoring/doc/reference"
              target="_blank"
              rel="noopener noreferrer"
              className="underline underline-offset-2"
            >
              Environment Agency flood monitoring
            </a>
            {" · "}Last checked: {new Date(data.lastUpdated).toLocaleString("en-GB")}
          </p>

          <HomeInsuranceCTA />
        </div>
      )}
    </div>
  )
}
