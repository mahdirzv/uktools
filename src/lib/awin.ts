const PUBLISHER_ID = "2836020"

export function awinLink(merchantId: string, destination: string): string {
  return `https://www.awin1.com/cread.php?awinmid=${merchantId}&awinaffid=${PUBLISHER_ID}&ued=${encodeURIComponent(destination)}`
}

export function contractorInsuranceLink(): string {
  return awinLink("PENDING_CONTRACTORINSURANCE", "https://www.qdos.com/contractor-insurance/")
}
