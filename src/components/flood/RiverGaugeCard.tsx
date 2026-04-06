interface RiverGauge {
  name: string
  riverName: string | null
  currentLevel: number | null
  trend: "rising" | "falling" | "stable"
  distKm: number
}

function TrendIndicator({ trend }: { trend: RiverGauge["trend"] }) {
  if (trend === "rising")
    return <span className="font-medium text-red-600 dark:text-red-400">Rising ↑</span>
  if (trend === "falling")
    return (
      <span className="font-medium text-green-600 dark:text-green-400">Falling ↓</span>
    )
  return <span className="text-muted-foreground">Stable</span>
}

export function RiverGaugeCard({ gauge }: { gauge: RiverGauge }) {
  return (
    <div className="rounded-lg border p-4">
      <div className="flex items-start justify-between gap-2">
        <div>
          <p className="font-medium">{gauge.name}</p>
          {gauge.riverName && (
            <p className="text-sm text-muted-foreground">{gauge.riverName}</p>
          )}
        </div>
        <span className="shrink-0 text-xs text-muted-foreground">
          {gauge.distKm} km away
        </span>
      </div>
      <div className="mt-3 flex items-center gap-4">
        <div>
          <p className="text-xs text-muted-foreground">Current level</p>
          <p className="text-lg font-semibold">
            {gauge.currentLevel !== null
              ? `${gauge.currentLevel.toFixed(2)} m`
              : "—"}
          </p>
        </div>
        <div>
          <p className="text-xs text-muted-foreground">Trend</p>
          <TrendIndicator trend={gauge.trend} />
        </div>
      </div>
    </div>
  )
}
