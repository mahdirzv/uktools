const PUBLISHER_ID = "2836020"

export function awinLink(merchantId: string, destination: string): string {
  return `https://www.awin1.com/cread.php?awinmid=${merchantId}&awinaffid=${PUBLISHER_ID}&ued=${encodeURIComponent(destination)}`
}

// Contractor insurance — direct link until Awin approval
export function contractorInsuranceLink(): string {
  return "https://www.qdos.com/contractor-insurance/"
}

export const PENDING_MERCHANTS = new Set([
  "PENDING_CONTRACTORINSURANCE",
  "PENDING_COMPARETHEMARKET",
  "PENDING_LC",
  "PENDING_ANYVAN",
])
