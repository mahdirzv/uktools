/**
 * Stamp Duty Land Tax (SDLT) — England and Northern Ireland
 * Rates effective 1 April 2025 (temporary cut ended 31 March 2025)
 * Source: https://www.gov.uk/stamp-duty-land-tax/residential-property-rates
 * Last verified: April 2026
 *
 * Scotland uses LBTT (revenue.scot) — not covered here.
 * Wales uses LTT (gov.wales) — not covered here.
 */

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

// ── Standard residential rates (from 1 April 2025) ──────────────────
// The nil-rate threshold reverted from £250k back to £125k on 1 April 2025.
const STANDARD_BANDS = [
  { from: 0,         to: 125_000,   rate: 0.00 },
  { from: 125_000,   to: 250_000,   rate: 0.02 },  // 2% — reinstated April 2025
  { from: 250_000,   to: 925_000,   rate: 0.05 },
  { from: 925_000,   to: 1_500_000, rate: 0.10 },
  { from: 1_500_000, to: null,      rate: 0.12 },
]

// ── First-time buyer relief (from 1 April 2025) ──────────────────────
// 0% up to £300k (reverted from £425k temporary threshold).
// Relief only applies when purchase price ≤ £500,000.
const FTB_BANDS = [
  { from: 0,       to: 300_000, rate: 0.00 },
  { from: 300_000, to: 500_000, rate: 0.05 },
]

// ── Additional dwellings surcharge ───────────────────────────────────
// Raised from 3% to 5% in Autumn Budget 2024 (effective 31 October 2024).
// Source: https://www.gov.uk/guidance/sdlt-higher-rates-for-additional-dwellings
const ADDITIONAL_SURCHARGE = 0.05

function calculateBands(
  price: number,
  bands: { from: number; to: number | null; rate: number }[],
  surcharge: number,
): StampDutyResult {
  const result: StampDutyBand[] = []
  let total = 0

  for (const band of bands) {
    if (price <= band.from) break
    const upper   = band.to ?? price
    const taxable = Math.min(price, upper) - band.from
    const rate    = band.rate + surcharge
    const tax     = Math.round(taxable * rate)
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

  const surcharge = buyerType === "additional" ? ADDITIONAL_SURCHARGE : 0

  if (buyerType === "first-time" && price <= 500_000) {
    return calculateBands(price, FTB_BANDS, surcharge)
  }

  return calculateBands(price, STANDARD_BANDS, surcharge)
}

// Rates metadata — display on the UI
export const SDLT_META = {
  effectiveFrom: "1 April 2025",
  sourceUrl: "https://www.gov.uk/stamp-duty-land-tax/residential-property-rates",
  lastVerified: "April 2026",
  note: "SDLT applies to England and Northern Ireland only. Scotland: LBTT. Wales: LTT.",
}
