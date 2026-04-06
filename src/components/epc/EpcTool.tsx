"use client"

import { useState } from "react"
import { Search, ArrowLeft, Zap, Flame, Lightbulb, Leaf } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { awinLink } from "@/lib/awin"

// ── EPC colour coding (official gov.uk scheme) ────────────────────────────
const RATING_COLOR: Record<string, string> = {
  A: "#009900", B: "#19b200", C: "#8dce46",
  D: "#ffd500", E: "#fcaa65", F: "#ef8023", G: "#e9153b",
}

function RatingBadge({ rating, score, size = "md" }: {
  rating: string
  score?: number
  size?: "sm" | "md" | "lg"
}) {
  const bg = RATING_COLOR[rating?.toUpperCase()] ?? "#999"
  const dim = size === "sm" ? "w-8 h-8 text-sm" : size === "lg" ? "w-16 h-16 text-3xl" : "w-11 h-11 text-xl"
  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${dim} rounded flex items-center justify-center font-bold text-white`}
        style={{ backgroundColor: bg }}
      >
        {rating?.toUpperCase() ?? "?"}
      </div>
      {score !== undefined && (
        <span className="text-xs text-muted-foreground">{score}</span>
      )}
    </div>
  )
}

// ── Types ─────────────────────────────────────────────────────────────────
interface PropertySummary {
  lmkKey: string
  address: string
  postcode: string
  posttown: string
  currentRating: string
  currentScore: number
  potentialRating: string
  potentialScore: number
  inspectionDate: string
  heatingCost: number
  hotWaterCost: number
  lightingCost: number
}

interface EpcRecord {
  lmkKey: string
  address: string
  postcode: string
  posttown: string
  propertyType: string
  builtForm: string
  currentRating: string
  currentScore: number
  potentialRating: string
  potentialScore: number
  co2Current: number
  co2Potential: number
  heatingCostCurrent: number
  heatingCostPotential: number
  hotWaterCostCurrent: number
  hotWaterCostPotential: number
  lightingCostCurrent: number
  lightingCostPotential: number
  mainheatDescription: string
  wallsDescription: string
  roofDescription: string
  floorDescription: string
  windowsDescription: string
  inspectionDate: string
}

function fmt(n: number) {
  return n > 0 ? `£${n.toLocaleString("en-GB")}` : "—"
}

// ── Detail view ───────────────────────────────────────────────────────────
function EpcDetail({ record, onBack }: { record: EpcRecord; onBack: () => void }) {
  const totalCurrent =
    record.heatingCostCurrent + record.hotWaterCostCurrent + record.lightingCostCurrent
  const totalPotential =
    record.heatingCostPotential + record.hotWaterCostPotential + record.lightingCostPotential
  const saving = Math.max(0, totalCurrent - totalPotential)

  return (
    <div className="space-y-6">
      <button
        onClick={onBack}
        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
      >
        <ArrowLeft className="size-4" /> Back to results
      </button>

      {/* Address */}
      <div>
        <p className="text-lg font-semibold leading-snug">{record.address}</p>
        <p className="text-sm text-muted-foreground">
          {record.posttown} · {record.postcode}
          {record.propertyType && ` · ${record.propertyType}`}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          EPC inspected {record.inspectionDate}
        </p>
      </div>

      {/* Rating comparison */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Energy rating</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-around py-2">
            <div className="text-center">
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Current</p>
              <RatingBadge rating={record.currentRating} score={record.currentScore} size="lg" />
            </div>
            <div className="flex flex-col items-center gap-1 text-muted-foreground">
              <div className="h-px w-12 bg-border" />
              <span className="text-xs">potential</span>
              <div className="h-px w-12 bg-border" />
            </div>
            <div className="text-center">
              <p className="mb-2 text-xs font-medium text-muted-foreground uppercase tracking-wide">Potential</p>
              <RatingBadge rating={record.potentialRating} score={record.potentialScore} size="lg" />
            </div>
          </div>

          {/* A–G scale bar */}
          <div className="mt-4 flex rounded-md overflow-hidden h-3">
            {["A","B","C","D","E","F","G"].map((l) => (
              <div
                key={l}
                className="flex-1 relative"
                style={{ backgroundColor: RATING_COLOR[l] }}
              >
                {(l === record.currentRating?.toUpperCase() || l === record.potentialRating?.toUpperCase()) && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="size-2 rounded-full bg-white/80" />
                  </div>
                )}
              </div>
            ))}
          </div>
          <div className="mt-1 flex justify-between text-[10px] text-muted-foreground">
            <span>A Most efficient</span>
            <span>G Least efficient</span>
          </div>
        </CardContent>
      </Card>

      {/* Annual costs */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Estimated annual energy costs</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground font-medium uppercase tracking-wide">
            <span></span>
            <span className="text-center">Current</span>
            <span className="text-center text-green-600">Potential</span>
          </div>
          {[
            { icon: <Flame className="size-3.5" />, label: "Heating", cur: record.heatingCostCurrent, pot: record.heatingCostPotential },
            { icon: <Zap className="size-3.5" />, label: "Hot water", cur: record.hotWaterCostCurrent, pot: record.hotWaterCostPotential },
            { icon: <Lightbulb className="size-3.5" />, label: "Lighting", cur: record.lightingCostCurrent, pot: record.lightingCostPotential },
          ].map(({ icon, label, cur, pot }) => (
            <div key={label} className="grid grid-cols-3 gap-2 items-center py-1.5 border-b last:border-0">
              <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
                {icon} {label}
              </div>
              <div className="text-center text-sm font-medium">{fmt(cur)}</div>
              <div className="text-center text-sm font-medium text-green-600">{fmt(pot)}</div>
            </div>
          ))}
          <div className="grid grid-cols-3 gap-2 items-center pt-1">
            <span className="text-sm font-semibold">Total</span>
            <div className="text-center text-sm font-semibold">{fmt(totalCurrent)}</div>
            <div className="text-center text-sm font-semibold text-green-600">{fmt(totalPotential)}</div>
          </div>

          {saving > 0 && (
            <div className="mt-3 rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-800 font-medium">
              Improvements could save{" "}
              <span className="font-bold">{fmt(saving)}/year</span>
            </div>
          )}
        </CardContent>
      </Card>

      {/* CO2 */}
      {record.co2Current > 0 && (
        <div className="flex items-center gap-3 rounded-lg border px-4 py-3 text-sm">
          <Leaf className="size-4 text-green-600 shrink-0" />
          <span className="text-muted-foreground">
            CO₂ emissions:{" "}
            <span className="font-medium text-foreground">{record.co2Current} tonnes/year</span>
            {record.co2Potential > 0 && record.co2Potential < record.co2Current && (
              <> → <span className="text-green-600 font-medium">{record.co2Potential} tonnes/year</span> with improvements</>
            )}
          </span>
        </div>
      )}

      {/* Property features */}
      {(record.mainheatDescription || record.wallsDescription || record.roofDescription) && (
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Property features</CardTitle>
          </CardHeader>
          <CardContent>
            <dl className="space-y-2 text-sm">
              {[
                ["Heating",    record.mainheatDescription],
                ["Walls",      record.wallsDescription],
                ["Roof",       record.roofDescription],
                ["Floor",      record.floorDescription],
                ["Windows",    record.windowsDescription],
              ].filter(([, v]) => v).map(([k, v]) => (
                <div key={k} className="grid grid-cols-3 gap-2">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="col-span-2">{v}</dd>
                </div>
              ))}
            </dl>
          </CardContent>
        </Card>
      )}

      {/* Affiliate CTA */}
      <Card className="border-primary/20 bg-primary/[0.03]">
        <CardContent className="py-4">
          <p className="text-sm font-semibold">Reduce your energy bills</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Switching energy tariff could save{" "}
            <span className="font-medium text-foreground">£200–400/year</span> on top of
            any home improvements.
          </p>
          <a
            href={awinLink("3655", "https://www.uswitch.com/gas-electricity/")}
            target="_blank"
            rel="noopener noreferrer sponsored"
            className="mt-3 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Compare energy deals →
          </a>
          <p className="mt-2 text-[10px] text-muted-foreground">Partner offer via Uswitch</p>
        </CardContent>
      </Card>
    </div>
  )
}

// ── Main tool ─────────────────────────────────────────────────────────────
export function EpcTool({ className = "" }: { className?: string }) {
  const [query, setQuery]           = useState("")
  const [loading, setLoading]       = useState(false)
  const [error, setError]           = useState<string | null>(null)
  const [properties, setProperties] = useState<PropertySummary[] | null>(null)
  const [record, setRecord]         = useState<EpcRecord | null>(null)
  const [loadingLmk, setLoadingLmk] = useState<string | null>(null)
  const [notConfigured, setNotConfigured] = useState(false)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    if (!query.trim()) return
    setLoading(true)
    setError(null)
    setProperties(null)
    setRecord(null)

    try {
      const res = await fetch(`/api/epc?address=${encodeURIComponent(query.trim())}`)
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? "Search failed"); return }
      if (!data.configured) { setNotConfigured(true); return }
      setProperties(data.properties ?? [])
    } catch {
      setError("Could not reach the EPC service. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleSelect(lmkKey: string) {
    setLoadingLmk(lmkKey)
    setError(null)

    try {
      const res = await fetch(`/api/epc/${encodeURIComponent(lmkKey)}`)
      const data = await res.json()
      if (!res.ok) { setError(data.error ?? "Could not load certificate"); return }
      setRecord(data.record)
    } catch {
      setError("Could not load this certificate. Please try again.")
    } finally {
      setLoadingLmk(null)
    }
  }

  if (record) {
    return (
      <div className={className}>
        <EpcDetail record={record} onBack={() => setRecord(null)} />
      </div>
    )
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {/* Search */}
      <form onSubmit={handleSearch} className="flex gap-2">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter address or postcode — e.g. M50 3SE or 10 Downing Street London"
            className="pl-9"
            disabled={loading}
          />
        </div>
        <Button type="submit" disabled={loading || !query.trim()}>
          {loading ? "Searching…" : "Look up EPC"}
        </Button>
      </form>

      {notConfigured && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          EPC lookup is not yet configured. Register free at{" "}
          <a href="https://epc.opendatacommunities.org/login/register" className="underline" target="_blank" rel="noopener noreferrer">
            epc.opendatacommunities.org
          </a>{" "}
          to get an API key.
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3 text-sm text-destructive">
          {error}
        </div>
      )}

      {/* Results list */}
      {properties !== null && (
        <div className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {properties.length === 0
              ? "No EPC records found. Try a different postcode or address."
              : `${properties.length} certificate${properties.length !== 1 ? "s" : ""} found — select to view full EPC`}
          </p>

          {properties.map((p) => (
            <button
              key={p.lmkKey}
              onClick={() => handleSelect(p.lmkKey)}
              disabled={loadingLmk === p.lmkKey}
              className="w-full rounded-xl border bg-card p-4 text-left transition-colors hover:border-foreground/25 hover:bg-accent disabled:opacity-60 group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0 flex-1">
                  <p className="font-medium leading-snug truncate group-hover:underline">
                    {p.address}
                  </p>
                  <p className="mt-0.5 text-sm text-muted-foreground">
                    {p.posttown} · {p.postcode} · Inspected {p.inspectionDate}
                  </p>
                  {p.heatingCost > 0 && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      Est. annual energy cost: £{(p.heatingCost + p.hotWaterCost + p.lightingCost).toLocaleString("en-GB")}
                    </p>
                  )}
                </div>
                <div className="flex shrink-0 items-center gap-2">
                  <RatingBadge rating={p.currentRating} score={p.currentScore} size="sm" />
                  {p.potentialRating !== p.currentRating && (
                    <>
                      <span className="text-xs text-muted-foreground">→</span>
                      <RatingBadge rating={p.potentialRating} score={p.potentialScore} size="sm" />
                    </>
                  )}
                </div>
              </div>
              {loadingLmk === p.lmkKey && (
                <p className="mt-2 text-xs text-muted-foreground">Loading certificate…</p>
              )}
            </button>
          ))}
        </div>
      )}

      {/* Empty state — first load */}
      {properties === null && !loading && !error && !notConfigured && (
        <div className="rounded-xl border border-dashed px-6 py-10 text-center text-sm text-muted-foreground">
          <p className="font-medium text-foreground">Search by postcode or address</p>
          <p className="mt-1">Works for England and Wales. Try your postcode or a full address.</p>
          <p className="mt-3 text-xs">Covers all EPCs issued to 28 February 2026</p>
        </div>
      )}
    </div>
  )
}
