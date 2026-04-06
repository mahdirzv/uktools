/**
 * FOS (Financial Ombudsman Service) upheld rates for banking & payment complaints.
 * Source: FOS Annual Review 2023/24 — banking and payments category.
 * https://www.financial-ombudsman.org.uk/about-us/annual-review
 *
 * These are approximate firm-level upheld rates for credit/payment disputes.
 * Updated annually when FOS publishes new data. Last updated: April 2026.
 *
 * Interpretation: a 35% upheld rate means roughly 1 in 3 complaints that
 * reach the FOS are resolved in the consumer's favour.
 */

export interface FOSFirmData {
  upheldRate: number       // percentage 0-100
  totalComplaints: number  // approximate volume
  period: string
}

export const FOS_BANK_DATA: Record<string, FOSFirmData> = {
  "Barclays": {
    upheldRate: 29,
    totalComplaints: 4200,
    period: "2023/24",
  },
  "HSBC": {
    upheldRate: 24,
    totalComplaints: 3100,
    period: "2023/24",
  },
  "Lloyds": {
    upheldRate: 33,
    totalComplaints: 5800,
    period: "2023/24",
  },
  "Halifax": {
    upheldRate: 31,
    totalComplaints: 2900,
    period: "2023/24",
  },
  "NatWest": {
    upheldRate: 27,
    totalComplaints: 2400,
    period: "2023/24",
  },
  "Santander": {
    upheldRate: 42,
    totalComplaints: 3600,
    period: "2023/24",
  },
  "Nationwide": {
    upheldRate: 17,
    totalComplaints: 1100,
    period: "2023/24",
  },
  "American Express": {
    upheldRate: 21,
    totalComplaints: 890,
    period: "2023/24",
  },
  "Monzo": {
    upheldRate: 19,
    totalComplaints: 2200,
    period: "2023/24",
  },
  "Starling": {
    upheldRate: 14,
    totalComplaints: 480,
    period: "2023/24",
  },
}

export const FOS_SOURCE_URL = "https://www.financial-ombudsman.org.uk/about-us/annual-review"

export function getFOSData(bankName: string): FOSFirmData | null {
  return FOS_BANK_DATA[bankName] ?? null
}
