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
      <div className="flex flex-col gap-2">
        {active.map((officer, i) => (
          <OfficerRow key={`active-${i}`} officer={officer} />
        ))}
        {resigned.length > 0 && (
          <details className="group">
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
        {officer.appointed_on && <span>Appointed {officer.appointed_on}</span>}
        {officer.resigned_on && <span>Resigned {officer.resigned_on}</span>}
      </div>
    </div>
  )
}
