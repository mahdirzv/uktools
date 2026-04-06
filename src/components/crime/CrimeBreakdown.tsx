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

export function CrimeBreakdown({ data }: { data: CrimeData }) {
  const maxCount = data.breakdown[0]?.count || 1

  return (
    <div className="space-y-6">
      <div>
        <p className="text-3xl font-bold tabular-nums">{data.total.toLocaleString()}</p>
        <p className="text-sm text-muted-foreground">
          crimes reported near {data.postcode} in the last {data.months} months
        </p>
      </div>

      <div className="space-y-3">
        {data.breakdown.map((item) => {
          const pct = (item.count / maxCount) * 100
          return (
            <div key={item.category} className="space-y-1">
              <div className="flex items-baseline justify-between gap-4 text-sm">
                <span>{item.label}</span>
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
        <p className="text-xs text-muted-foreground">
          Last updated: {formatMonth(data.latestMonth)}
        </p>
      )}
    </div>
  )
}
