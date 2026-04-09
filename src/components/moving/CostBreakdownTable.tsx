import type { StampDutyBand } from "@/lib/stamp-duty"

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount)
}

function formatBandRange(from: number, to: number | null): string {
  if (to === null) return `${formatCurrency(from)}+`
  return `${formatCurrency(from)} – ${formatCurrency(to)}`
}

function formatPercent(rate: number): string {
  return `${(rate * 100).toFixed(0)}%`
}

export function CostBreakdownTable({ bands, total }: { bands: StampDutyBand[]; total: number }) {
  if (bands.length === 0) {
    return <p className="text-muted-foreground">Enter a property price to see the breakdown.</p>
  }

  return (
    <div className="space-y-4">
      <div className="overflow-x-auto rounded-lg border border-border/70">
        <table className="w-full text-sm">
          <thead className="bg-muted/40">
            <tr className="text-left text-muted-foreground">
              <th className="px-3 py-2.5 font-medium">Band</th>
              <th className="px-3 py-2.5 text-right font-medium">Rate</th>
              <th className="px-3 py-2.5 text-right font-medium">Taxable</th>
              <th className="px-3 py-2.5 text-right font-medium">Tax</th>
            </tr>
          </thead>
          <tbody>
            {bands.map((band, i) => {
              const taxed = band.tax > 0

              return (
                <tr
                  key={i}
                  className={taxed ? "border-t bg-foreground/[0.015]" : "border-t text-muted-foreground"}
                >
                  <td className="px-3 py-2.5">{formatBandRange(band.from, band.to)}</td>
                  <td className="px-3 py-2.5 text-right">{formatPercent(band.rate)}</td>
                  <td className="px-3 py-2.5 text-right">{formatCurrency(band.taxable)}</td>
                  <td className={taxed ? "px-3 py-2.5 text-right font-medium" : "px-3 py-2.5 text-right"}>
                    {formatCurrency(band.tax)}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      <p className="text-xs text-muted-foreground">
        You only pay each rate on the portion of the property price that falls within that band.
      </p>

      <div className="flex items-center justify-between border-t pt-3 text-sm font-medium">
        <span>Total Stamp Duty (SDLT)</span>
        <span className="text-base">{formatCurrency(total)}</span>
      </div>
    </div>
  )
}
