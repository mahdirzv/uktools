interface CostSummaryProps {
  heatingCostCurrent: number
  heatingCostPotential: number
  hotWaterCostCurrent: number
  lightingCostCurrent: number
}

function fmt(val: number) {
  return `£${Math.round(val).toLocaleString("en-GB")}`
}

export function CostSummary({
  heatingCostCurrent,
  heatingCostPotential,
  hotWaterCostCurrent,
  lightingCostCurrent,
}: CostSummaryProps) {
  const totalCurrent =
    heatingCostCurrent + hotWaterCostCurrent + lightingCostCurrent
  const totalPotential =
    heatingCostPotential + hotWaterCostCurrent + lightingCostCurrent
  const saving = Math.max(0, totalCurrent - totalPotential)

  return (
    <div className="rounded-lg border p-5 space-y-4">
      <h3 className="font-semibold">Annual energy cost estimates</h3>
      <div className="grid grid-cols-2 gap-3 text-sm sm:grid-cols-3">
        <div>
          <p className="text-muted-foreground">Heating (current)</p>
          <p className="font-medium">{fmt(heatingCostCurrent)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Heating (potential)</p>
          <p className="font-medium text-green-700 dark:text-green-400">
            {fmt(heatingCostPotential)}
          </p>
        </div>
        <div>
          <p className="text-muted-foreground">Hot water</p>
          <p className="font-medium">{fmt(hotWaterCostCurrent)}</p>
        </div>
        <div>
          <p className="text-muted-foreground">Lighting</p>
          <p className="font-medium">{fmt(lightingCostCurrent)}</p>
        </div>
        <div>
          <p className="text-muted-foreground font-medium">Total (current)</p>
          <p className="font-semibold">{fmt(totalCurrent)}/year</p>
        </div>
        <div>
          <p className="text-muted-foreground font-medium">Total (potential)</p>
          <p className="font-semibold text-green-700 dark:text-green-400">
            {fmt(totalPotential)}/year
          </p>
        </div>
      </div>
      {saving > 0 && (
        <div className="rounded-md bg-green-50 px-4 py-2 text-sm font-medium text-green-800 dark:bg-green-950/30 dark:text-green-300">
          Improvements could save <strong>{fmt(saving)}/year</strong>
        </div>
      )}
    </div>
  )
}
