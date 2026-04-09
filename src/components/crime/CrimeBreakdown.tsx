import {
  NATIONAL_RATES_PER_1000,
  BENCHMARK_POPULATION,
} from "@/lib/crime-benchmarks"
import { DataSourceFooter } from "@/components/shared/DataSourceFooter"
import { PostcodeDataLicenceNotice } from "@/components/shared/PostcodeDataLicenceNotice"

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

function formatMonth(yyyyMm: string): string {
  const [year, month] = yyyyMm.split("-")
  const date = new Date(Number(year), Number(month) - 1)
  return date.toLocaleDateString("en-GB", { month: "long", year: "numeric" })
}

function comparisonLabel(category: string, count: number, months: number): React.ReactNode {
  const annualRate = NATIONAL_RATES_PER_1000[category]
  if (annualRate === undefined) return null

  const expected = (annualRate / 12) * months * (BENCHMARK_POPULATION / 1000)
  if (count > expected * 1.2) {
    return <span className="text-xs text-red-600">↑ above average</span>
  }
  if (count < expected * 0.8) {
    return <span className="text-xs text-emerald-600">↓ below average</span>
  }
  return null
}

export function CrimeBreakdown({
  data,
  checkedAt,
}: {
  data: CrimeData
  checkedAt: string | null
}) {
  const maxCount = data.breakdown[0]?.count || 1

  return (
    <div className="space-y-4">
      <div className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
        <p className="text-xs uppercase tracking-wide text-muted-foreground">Reported crimes</p>
        <p className="mt-1 text-3xl font-bold tabular-nums">{data.total.toLocaleString()}</p>
        <p className="mt-1 text-sm text-muted-foreground">
          crimes reported near {data.postcode} in the last {data.months} months
        </p>
      </div>

      <div className="space-y-3 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
        {data.breakdown.map((item) => {
          const pct = (item.count / maxCount) * 100
          const tag = comparisonLabel(item.category, item.count, data.months)
          return (
            <div key={item.category} className="space-y-1">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span className="flex items-baseline gap-2">
                  {item.label}
                  {tag}
                </span>
                <span className="font-medium tabular-nums">
                  {item.count.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full rounded-full bg-muted">
                <div
                  className="h-2 rounded-full bg-foreground transition-all"
                  style={{ width: `${pct}%` }}
                />
              </div>
            </div>
          )
        })}
      </div>

      {data.latestMonth && (
        <>
          <DataSourceFooter
            sourceLabel="data.police.uk"
            sourceUrl="https://data.police.uk/about/"
            licenceLabel="Open Government Licence v3.0"
            licenceUrl="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/"
            lastChecked={checkedAt}
            coverage="England, Wales, Northern Ireland"
            caveat={`Data covers crimes reported to ${formatMonth(data.latestMonth)} and is typically 2–3 months behind current date.`}
          />
          <PostcodeDataLicenceNotice />
        </>
      )}

      <p className="text-xs text-muted-foreground">
        Compared to England &amp; Wales average (Home Office, 2024/25)
      </p>
    </div>
  )
}
