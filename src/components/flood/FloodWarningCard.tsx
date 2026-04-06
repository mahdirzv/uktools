interface FloodWarning {
  severity: string
  severityLevel: number
  message: string
  area: string
  lastUpdated: string
}

function getSeverityStyle(level: number) {
  switch (level) {
    case 1:
      return {
        border: "border-red-300 dark:border-red-700",
        bg: "bg-red-50 dark:bg-red-950/30",
        badge: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
        label: "Danger to life",
      }
    case 2:
      return {
        border: "border-orange-300 dark:border-orange-700",
        bg: "bg-orange-50 dark:bg-orange-950/30",
        badge:
          "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200",
        label: "Flooding expected",
      }
    case 3:
      return {
        border: "border-yellow-300 dark:border-yellow-600",
        bg: "bg-yellow-50 dark:bg-yellow-950/30",
        badge:
          "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
        label: "Flooding possible",
      }
    default:
      return {
        border: "border-border",
        bg: "bg-muted/30",
        badge: "bg-muted text-muted-foreground",
        label: "No longer active",
      }
  }
}

export function FloodWarningCard({ warning }: { warning: FloodWarning }) {
  const style = getSeverityStyle(warning.severityLevel)
  const updated = new Date(warning.lastUpdated)
  const updatedStr = isNaN(updated.getTime())
    ? warning.lastUpdated
    : updated.toLocaleString("en-GB")

  return (
    <div className={`rounded-lg border p-4 ${style.border} ${style.bg}`}>
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <span
            className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${style.badge}`}
          >
            {warning.severity}
          </span>
          <span className="ml-2 text-xs text-muted-foreground">
            {style.label}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Updated: {updatedStr}
        </span>
      </div>
      {warning.area && (
        <p className="mt-2 text-sm font-medium">{warning.area}</p>
      )}
      {warning.message && (
        <p className="mt-1 text-sm text-muted-foreground">{warning.message}</p>
      )}
    </div>
  )
}
