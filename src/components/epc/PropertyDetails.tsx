interface PropertyDetailsProps {
  mainheatDescription?: string
  wallsDescription?: string
  roofDescription?: string
  floorDescription?: string
  glazedArea?: string
  co2Emissions?: string
  inspectionDate?: string
}

function Row({ label, value }: { label: string; value?: string }) {
  if (!value) return null
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-4">
      <span className="w-32 shrink-0 text-sm text-muted-foreground">{label}</span>
      <span className="text-sm">{value}</span>
    </div>
  )
}

export function PropertyDetails({
  mainheatDescription,
  wallsDescription,
  roofDescription,
  floorDescription,
  glazedArea,
  co2Emissions,
  inspectionDate,
}: PropertyDetailsProps) {
  return (
    <div className="rounded-lg border p-5 space-y-3">
      <h3 className="font-semibold">Property details</h3>
      <div className="space-y-2">
        <Row label="Heating" value={mainheatDescription} />
        <Row label="Walls" value={wallsDescription} />
        <Row label="Roof" value={roofDescription} />
        <Row label="Floor" value={floorDescription} />
        <Row label="Glazing" value={glazedArea} />
        {co2Emissions && (
          <Row label="CO₂ emissions" value={`${co2Emissions} tonnes/year`} />
        )}
        <Row label="Inspected" value={inspectionDate} />
      </div>
    </div>
  )
}
