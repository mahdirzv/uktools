"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EpcRatingBadge } from "./EpcRatingBadge"
import { CostSummary } from "./CostSummary"
import { PropertyDetails } from "./PropertyDetails"
import { EnergyAffiliateCTAs } from "./EnergyAffiliateCTAs"

interface PropertySummary {
  lmkKey: string
  address: string
  posttown: string
  postcode: string
  currentRating: string
  currentScore: string
  potentialRating: string
  potentialScore: string
  inspectionDate: string
}

interface EpcRecord {
  lmkKey: string
  address: string
  postcode: string
  currentRating: string
  currentScore: number
  potentialRating: string
  potentialScore: number
  co2Emissions?: string
  heatingCostCurrent: number
  heatingCostPotential: number
  hotWaterCostCurrent: number
  lightingCostCurrent: number
  mainheatDescription?: string
  wallsDescription?: string
  roofDescription?: string
  floorDescription?: string
  glazedArea?: string
  inspectionDate?: string
}

export function AddressSearch() {
  const [address, setAddress] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [notConfigured, setNotConfigured] = useState(false)
  const [properties, setProperties] = useState<PropertySummary[] | null>(null)
  const [record, setRecord] = useState<EpcRecord | null>(null)
  const [loadingRecord, setLoadingRecord] = useState(false)

  async function handleSearch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const clean = address.trim()
    if (!clean) return

    setLoading(true)
    setError("")
    setProperties(null)
    setRecord(null)
    setNotConfigured(false)

    try {
      const res = await fetch(`/api/epc?address=${encodeURIComponent(clean)}`)
      const json = await res.json()

      if (!res.ok) {
        setError(json.error || "Something went wrong. Try again.")
        return
      }

      if (json.configured === false) {
        setNotConfigured(true)
        return
      }

      if (!json.properties || json.properties.length === 0) {
        setError("No EPC records found for this address. Try a broader search.")
        return
      }

      setProperties(json.properties)
    } catch {
      setError("Failed to fetch EPC data. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function handleSelectProperty(lmkKey: string) {
    setLoadingRecord(true)
    setRecord(null)
    setError("")

    try {
      const res = await fetch(`/api/epc/${encodeURIComponent(lmkKey)}`)
      const json = await res.json()

      if (!res.ok) {
        setError(json.error || "Failed to load EPC record.")
        return
      }

      if (json.configured === false) {
        setNotConfigured(true)
        return
      }

      setRecord(json.record)
    } catch {
      setError("Failed to load EPC record. Please try again.")
    } finally {
      setLoadingRecord(false)
    }
  }

  return (
    <div className="mt-8 space-y-8">
      <form onSubmit={handleSearch} className="flex gap-3">
        <Input
          type="text"
          placeholder="e.g. 10 Downing Street London"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="max-w-sm"
          disabled={loading}
        />
        <Button type="submit" disabled={loading || !address.trim()}>
          {loading ? "Searching…" : "Look up EPC"}
        </Button>
      </form>

      {notConfigured && (
        <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
          <h3 className="font-semibold text-amber-900 dark:text-amber-200">
            EPC API not yet configured
          </h3>
          <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
            The EPC lookup requires an API key from the Open Data Communities
            EPC register. Register for free at{" "}
            <a
              href="https://epc.opendatacommunities.org/login/register"
              target="_blank"
              rel="noopener noreferrer"
              className="underline"
            >
              epc.opendatacommunities.org
            </a>{" "}
            and set the <code>EPC_API_CREDENTIALS</code> environment variable.
          </p>
        </div>
      )}

      {error && <p className="text-sm text-destructive">{error}</p>}

      {properties && !record && (
        <div className="space-y-3">
          <h2 className="font-semibold">
            {properties.length} propert{properties.length === 1 ? "y" : "ies"}{" "}
            found — select to view full EPC
          </h2>
          {properties.map((p) => (
            <button
              key={p.lmkKey}
              type="button"
              onClick={() => handleSelectProperty(p.lmkKey)}
              disabled={loadingRecord}
              className="w-full rounded-lg border p-4 text-left transition-colors hover:border-foreground/40 hover:bg-accent disabled:opacity-50"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-medium">{p.address}</p>
                  <p className="text-sm text-muted-foreground">
                    {p.posttown} {p.postcode}
                  </p>
                  {p.inspectionDate && (
                    <p className="text-xs text-muted-foreground mt-1">
                      Inspected: {p.inspectionDate}
                    </p>
                  )}
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <EpcRatingBadge rating={p.currentRating} />
                  {p.potentialRating && p.potentialRating !== p.currentRating && (
                    <>
                      <span className="text-muted-foreground text-xs">→</span>
                      <EpcRatingBadge rating={p.potentialRating} />
                    </>
                  )}
                </div>
              </div>
            </button>
          ))}
          {loadingRecord && (
            <p className="text-sm text-muted-foreground">Loading EPC record…</p>
          )}
        </div>
      )}

      {record && (
        <div className="space-y-6">
          <div>
            <h2 className="font-semibold text-lg">{record.address}</h2>
            <p className="text-sm text-muted-foreground">{record.postcode}</p>
          </div>

          <div className="rounded-lg border p-5">
            <h3 className="font-semibold mb-4">Energy rating</h3>
            <div className="flex items-center gap-8">
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Current</p>
                <EpcRatingBadge
                  rating={record.currentRating}
                  score={record.currentScore}
                  size="lg"
                />
              </div>
              <span className="text-2xl text-muted-foreground">→</span>
              <div className="text-center">
                <p className="text-xs text-muted-foreground mb-2">Potential</p>
                <EpcRatingBadge
                  rating={record.potentialRating}
                  score={record.potentialScore}
                  size="lg"
                />
              </div>
            </div>
          </div>

          <CostSummary
            heatingCostCurrent={record.heatingCostCurrent}
            heatingCostPotential={record.heatingCostPotential}
            hotWaterCostCurrent={record.hotWaterCostCurrent}
            lightingCostCurrent={record.lightingCostCurrent}
          />

          <PropertyDetails
            mainheatDescription={record.mainheatDescription}
            wallsDescription={record.wallsDescription}
            roofDescription={record.roofDescription}
            floorDescription={record.floorDescription}
            glazedArea={record.glazedArea}
            co2Emissions={record.co2Emissions}
            inspectionDate={record.inspectionDate}
          />

          <EnergyAffiliateCTAs />

          <Button
            variant="outline"
            onClick={() => {
              setRecord(null)
            }}
          >
            ← Back to results
          </Button>
        </div>
      )}
    </div>
  )
}
