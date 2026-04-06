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
    <div className="space-y-3">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b text-left text-muted-foreground">
              <th className="pb-2 pr-4 font-medium">Band</th>
              <th className="pb-2 pr-4 text-right font-medium">Rate</th>
              <th className="pb-2 pr-4 text-right font-medium">Taxable</th>
              <th className="pb-2 text-right font-medium">Tax</th>
            </tr>
          </thead>
          <tbody>
            {bands.map((band, i) => (
              <tr key={i} className="border-b last:border-0">
                <td className="py-2 pr-4">{formatBandRange(band.from, band.to)}</td>
                <td className="py-2 pr-4 text-right">{formatPercent(band.rate)}</td>
                <td className="py-2 pr-4 text-right">{formatCurrency(band.taxable)}</td>
                <td className="py-2 text-right">{formatCurrency(band.tax)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t pt-3 font-medium">
        <span>Total Stamp Duty (SDLT)</span>
        <span className="text-base">{formatCurrency(total)}</span>
      </div>
    </div>
  )
}
