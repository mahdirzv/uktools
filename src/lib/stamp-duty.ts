export type BuyerType = "first-time" | "standard" | "additional"

export interface StampDutyBand {
  from: number
  to: number | null
  rate: number
  taxable: number
  tax: number
}

export interface StampDutyResult {
  bands: StampDutyBand[]
  total: number
}

// Band boundaries are the ceiling of the previous band.
// Taxable slice = min(price, ceiling) - floor (no +1 needed).
const STANDARD_BANDS: { from: number; to: number | null; rate: number }[] = [
  { from: 0,           to: 250_000,    rate: 0.00 },
  { from: 250_000,     to: 925_000,    rate: 0.05 },
  { from: 925_000,     to: 1_500_000,  rate: 0.10 },
  { from: 1_500_000,   to: null,       rate: 0.12 },
]

const FTB_BANDS: { from: number; to: number | null; rate: number }[] = [
  { from: 0,         to: 300_000, rate: 0.00 },
  { from: 300_000,   to: 500_000, rate: 0.05 },
]

function calculateBands(
  price: number,
  bands: { from: number; to: number | null; rate: number }[],
  surcharge: number,
): StampDutyResult {
  const result: StampDutyBand[] = []
  let total = 0

  for (const band of bands) {
    if (price <= band.from) break

    const upper    = band.to ?? price
    const taxable  = Math.min(price, upper) - band.from
    const rate     = band.rate + surcharge
    const tax      = Math.round(taxable * rate)

    result.push({ from: band.from, to: band.to, rate, taxable, tax })
    total += tax
  }

  return { bands: result, total }
}

export function calculateStampDuty(
  price: number,
  buyerType: BuyerType,
): StampDutyResult {
  if (price <= 0) return { bands: [], total: 0 }

  const surcharge = buyerType === "additional" ? 0.03 : 0

  if (buyerType === "first-time" && price <= 500_000) {
    return calculateBands(price, FTB_BANDS, surcharge)
  }

  return calculateBands(price, STANDARD_BANDS, surcharge)
}
