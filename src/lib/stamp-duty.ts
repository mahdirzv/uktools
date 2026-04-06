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

const STANDARD_BANDS: { from: number; to: number | null; rate: number }[] = [
  { from: 0, to: 125_000, rate: 0 },
  { from: 125_001, to: 250_000, rate: 0.02 },
  { from: 250_001, to: 925_000, rate: 0.05 },
  { from: 925_001, to: 1_500_000, rate: 0.10 },
  { from: 1_500_001, to: null, rate: 0.12 },
]

const FTB_BANDS: { from: number; to: number | null; rate: number }[] = [
  { from: 0, to: 300_000, rate: 0 },
  { from: 300_001, to: 500_000, rate: 0.05 },
]

function calculateBands(
  price: number,
  bands: { from: number; to: number | null; rate: number }[],
  surcharge: number,
): StampDutyResult {
  const result: StampDutyBand[] = []
  let total = 0

  for (const band of bands) {
    if (price < band.from) break

    const upper = band.to ?? price
    const taxable = Math.min(price, upper) - band.from + 1
    const effectiveRate = band.rate + surcharge
    const tax = Math.round(taxable * effectiveRate)

    result.push({
      from: band.from,
      to: band.to,
      rate: effectiveRate,
      taxable,
      tax,
    })

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

  // First-time buyer relief: only applies when total price ≤ £500,000
  if (buyerType === "first-time" && price <= 500_000) {
    return calculateBands(price, FTB_BANDS, surcharge)
  }

  // Standard rates (also used for FTB above £500k, and additional with surcharge)
  return calculateBands(price, STANDARD_BANDS, surcharge)
}
