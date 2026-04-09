import type { Officer } from "@/lib/companies-house"

export function DirectorList({ officers }: { officers: Officer[] }) {
  const active = officers.filter((o) => !o.resigned_on)
  const resigned = officers.filter((o) => o.resigned_on)

  if (officers.length === 0) {
    return (
      <div className="text-sm text-muted-foreground">
        No officer information available.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold">
        Directors & Officers ({active.length} active)
      </h3>
      <div className="flex flex-col gap-2 rounded-xl border bg-card p-2 ring-1 ring-foreground/5">
        {active.map((officer, i) => (
          <OfficerRow key={`active-${i}`} officer={officer} />
        ))}
        {resigned.length > 0 && (
          <details className="group rounded-lg border bg-background p-3">
            <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">
              {resigned.length} resigned officer{resigned.length !== 1 ? "s" : ""}
            </summary>
            <div className="mt-2 flex flex-col gap-2">
              {resigned.map((officer, i) => (
                <OfficerRow key={`resigned-${i}`} officer={officer} resigned />
              ))}
            </div>
          </details>
        )}
      </div>
    </div>
  )
}

function formatTenure(appointedOn: string): string {
  const d = new Date(appointedOn)
  const now = new Date()
  const totalMonths =
    (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
  if (totalMonths < 1) return "less than a month"
  if (totalMonths < 12) return `${totalMonths} months`
  const years = Math.floor(totalMonths / 12)
  return `${years} year${years !== 1 ? "s" : ""}`
}

function OfficerRow({
  officer,
  resigned = false,
}: {
  officer: Officer
  resigned?: boolean
}) {
  return (
    <div
      className={`flex items-start justify-between gap-2 rounded-lg border p-3 text-sm ${resigned ? "opacity-60" : ""}`}
    >
      <div className="flex flex-col gap-0.5">
        <span className="font-medium">{officer.name}</span>
        <span className="text-xs capitalize text-muted-foreground">
          {officer.officer_role?.replace(/_/g, " ")}
        </span>
      </div>
      <div className="flex flex-col items-end gap-0.5 text-xs text-muted-foreground">
        {officer.appointed_on && (
          <span>
            Appointed {officer.appointed_on} — {formatTenure(officer.appointed_on)}
          </span>
        )}
        {officer.resigned_on && <span>Resigned {officer.resigned_on}</span>}
      </div>
    </div>
  )
}
