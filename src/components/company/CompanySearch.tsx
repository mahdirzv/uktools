"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { CompanyResult } from "@/components/company/CompanyResult"
import { Search, Loader2 } from "lucide-react"
import type { CompanySearchItem, CompanyReport } from "@/lib/companies-house"

export function CompanySearch() {
  const [query, setQuery] = useState("")
  const [results, setResults] = useState<CompanySearchItem[]>([])
  const [report, setReport] = useState<CompanyReport | null>(null)
  const [loading, setLoading] = useState(false)
  const [loadingReport, setLoadingReport] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [checkedAt, setCheckedAt] = useState<string | null>(null)

  async function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return

    setLoading(true)
    setError(null)
    setReport(null)
    setResults([])
    setCheckedAt(null)

    try {
      const res = await fetch(`/api/company/search?q=${encodeURIComponent(q)}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Search failed")
        return
      }
      setResults(data.items ?? [])
      setCheckedAt(new Date().toISOString())
      if ((data.items ?? []).length === 0) {
        setError("No companies found. Try a different search term.")
      }
    } catch {
      setError("Failed to connect. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  async function selectCompany(companyNumber: string) {
    setLoadingReport(true)
    setError(null)

    try {
      const res = await fetch(`/api/company/${companyNumber}`)
      const data = await res.json()
      if (!res.ok) {
        setError(data.error ?? "Failed to load company details")
        return
      }
      setReport(data)
      setResults([])
      setCheckedAt(new Date().toISOString())
    } catch {
      setError("Failed to connect. Please try again.")
    } finally {
      setLoadingReport(false)
    }
  }

  return (
    <div className="mt-8 flex flex-col gap-6">
      <section className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
        <p className="text-sm font-medium">Search Companies House</p>
        <p className="mt-1 text-xs text-muted-foreground">
          Enter a company name or company number to load trust signals.
        </p>
        <form onSubmit={handleSearch} className="mt-4 flex flex-col gap-2 sm:flex-row">
          <Input
            placeholder="Search by company name or number..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-1"
          />
          <Button type="submit" disabled={loading || !query.trim()}>
            {loading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              <Search className="size-4" />
            )}
            Search
          </Button>
        </form>
      </section>

      {error && (
        <div className="rounded-lg border border-destructive/30 bg-destructive/5 p-4 text-sm text-destructive">
          {error}
        </div>
      )}

      {results.length > 0 && (
        <section className="space-y-3">
          <p className="text-sm text-muted-foreground">
            {results.length} result{results.length !== 1 ? "s" : ""} found
          </p>
          <div className="flex flex-col gap-2">
            {results.map((item) => (
              <button
                key={item.company_number}
                onClick={() => selectCompany(item.company_number)}
                disabled={loadingReport}
                className="flex flex-col gap-1.5 rounded-xl border bg-card p-4 text-left ring-1 ring-foreground/5 transition-colors hover:border-foreground/30 hover:bg-accent disabled:opacity-50"
              >
                <div className="flex items-start justify-between gap-2">
                  <span className="font-medium">{item.title}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {item.company_number}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                  <span className="capitalize">{item.company_status?.replace("-", " ")}</span>
                  {item.date_of_creation && (
                    <>
                      <span>·</span>
                      <span>Inc. {item.date_of_creation}</span>
                    </>
                  )}
                </div>
                {item.address_snippet && (
                  <span className="text-xs text-muted-foreground">
                    {item.address_snippet}
                  </span>
                )}
              </button>
            ))}
          </div>
          {checkedAt && (
            <p className="text-xs text-muted-foreground">
              Source:{" "}
              <a
                href="https://developer.company-information.service.gov.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Companies House API
              </a>
              {" · "}Last checked: {new Date(checkedAt).toLocaleString("en-GB")}
            </p>
          )}
        </section>
      )}

      {loadingReport && (
        <div className="flex items-center justify-center gap-2 rounded-xl border bg-card py-8 text-sm text-muted-foreground">
          <Loader2 className="size-4 animate-spin" />
          Loading company report...
        </div>
      )}

      {report && (
        <div className="flex flex-col gap-2">
          <button
            onClick={() => {
              setReport(null)
              setResults([])
              setQuery("")
            }}
            className="self-start text-sm text-muted-foreground underline underline-offset-4 hover:text-foreground"
          >
            ← Search again
          </button>
          <CompanyResult report={report} />
          {checkedAt && (
            <p className="text-xs text-muted-foreground">
              Source:{" "}
              <a
                href="https://developer.company-information.service.gov.uk/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-2"
              >
                Companies House API
              </a>
              {" · "}Last checked: {new Date(checkedAt).toLocaleString("en-GB")}
            </p>
          )}
        </div>
      )}
    </div>
  )
}
