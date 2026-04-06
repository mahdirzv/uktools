/**
 * FOS (Financial Ombudsman Service) — firm-level upheld rates
 * Banking & Credit category.
 *
 * Source: FOS Business Complaints Data H2 2024 (July–December 2024)
 * Published: 6 May 2025
 * URL: https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024
 * Downloaded: April 2026
 *
 * These are the official, published FOS upheld rates — not estimates.
 * Update every 6 months when FOS publishes new half-yearly data.
 */

export interface FOSFirmData {
  upheldRate: number        // banking & credit upheld %, official FOS figure
  period: string            // e.g. "H2 2024 (Jul–Dec 2024)"
  sourceUrl: string
}

export const FOS_BANK_DATA: Record<string, FOSFirmData> = {
  "Barclays": {
    upheldRate: 38,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "HSBC": {
    upheldRate: 33,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "Lloyds": {
    upheldRate: 34,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "Halifax": {
    upheldRate: 31,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "NatWest": {
    upheldRate: 37,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "Santander": {
    upheldRate: 35,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "Nationwide": {
    upheldRate: 27,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "Monzo": {
    upheldRate: 39,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "Starling": {
    upheldRate: 22,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
  "American Express": {
    upheldRate: 30,
    period: "H2 2024 (Jul–Dec 2024)",
    sourceUrl: "https://www.financial-ombudsman.org.uk/data-insight/our-insight/half-yearly-complaints-data-h2-2024",
  },
}

export function getFOSData(bankName: string): FOSFirmData | null {
  return FOS_BANK_DATA[bankName] ?? null
}
