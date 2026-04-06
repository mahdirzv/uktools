// Companies House API types and trust signal logic
// API docs: https://developer.company-information.service.gov.uk/

export interface CompanySearchItem {
  company_number: string
  title: string
  company_status: string
  company_type: string
  date_of_creation: string
  address_snippet: string
  description: string
}

export interface CompanySearchResponse {
  items: CompanySearchItem[]
  total_results: number
}

export interface RegisteredAddress {
  address_line_1?: string
  address_line_2?: string
  locality?: string
  region?: string
  postal_code?: string
  country?: string
}

export interface CompanyAccounts {
  next_due?: string
  overdue?: boolean
  next_accounts?: {
    due_on?: string
    overdue?: boolean
  }
}

export interface CompanyProfile {
  company_name: string
  company_number: string
  company_status: string
  company_type: string
  date_of_creation: string
  sic_codes?: string[]
  registered_office_address?: RegisteredAddress
  accounts?: CompanyAccounts
  has_charges?: boolean
  has_been_liquidated?: boolean
  has_insolvency_history?: boolean
}

export interface Officer {
  name: string
  officer_role: string
  appointed_on?: string
  resigned_on?: string
  date_of_birth?: {
    month: number
    year: number
  }
}

export interface OfficersResponse {
  items: Officer[]
  total_results: number
}

export interface FilingItem {
  date: string
  description: string
  type: string
  category: string
}

export interface FilingHistoryResponse {
  items: FilingItem[]
  total_count: number
}

export interface CompanyReport {
  profile: CompanyProfile
  officers: Officer[]
  filings: FilingItem[]
}

export type SignalLevel = "green" | "amber" | "red"

export interface TrustSignal {
  level: SignalLevel
  label: string
}

// SIC code descriptions — top-level division mapping (first 2 digits)
const SIC_DIVISIONS: Record<string, string> = {
  "01": "Agriculture", "02": "Forestry", "03": "Fishing",
  "05": "Coal mining", "06": "Oil & gas extraction", "07": "Metal ore mining",
  "08": "Other mining", "09": "Mining support", "10": "Food manufacturing",
  "11": "Beverages", "12": "Tobacco", "13": "Textiles", "14": "Clothing",
  "15": "Leather", "16": "Wood products", "17": "Paper products",
  "18": "Printing", "19": "Petroleum products", "20": "Chemicals",
  "21": "Pharmaceuticals", "22": "Rubber & plastics", "23": "Mineral products",
  "24": "Basic metals", "25": "Metal products", "26": "Electronics",
  "27": "Electrical equipment", "28": "Machinery", "29": "Motor vehicles",
  "30": "Transport equipment", "31": "Furniture", "32": "Other manufacturing",
  "33": "Repair & installation", "35": "Electricity & gas", "36": "Water supply",
  "37": "Sewerage", "38": "Waste management", "39": "Remediation",
  "41": "Building construction", "42": "Civil engineering", "43": "Specialised construction",
  "45": "Motor vehicle trade", "46": "Wholesale trade", "47": "Retail trade",
  "49": "Land transport", "50": "Water transport", "51": "Air transport",
  "52": "Warehousing", "53": "Postal & courier", "55": "Accommodation",
  "56": "Food & drink services", "58": "Publishing", "59": "Film & TV",
  "60": "Broadcasting", "61": "Telecommunications", "62": "Computer programming",
  "63": "Information services", "64": "Financial services", "65": "Insurance",
  "66": "Financial auxiliaries", "68": "Real estate", "69": "Legal & accounting",
  "70": "Head offices & management consultancy", "71": "Architecture & engineering",
  "72": "Scientific R&D", "73": "Advertising", "74": "Other professional services",
  "75": "Veterinary", "77": "Rental & leasing", "78": "Employment activities",
  "79": "Travel agencies", "80": "Security", "81": "Building services",
  "82": "Office support", "84": "Public administration", "85": "Education",
  "86": "Healthcare", "87": "Residential care", "88": "Social work",
  "90": "Creative arts", "91": "Libraries & museums", "92": "Gambling",
  "93": "Sports & recreation", "94": "Membership organisations",
  "95": "Repair of goods", "96": "Other personal services",
  "97": "Household employers", "98": "Undifferentiated household goods",
  "99": "Extraterritorial organisations",
}

export function sicCodeToIndustry(code: string): string {
  const division = code.substring(0, 2)
  return SIC_DIVISIONS[division] ?? `SIC ${code}`
}

const BAD_STATUSES = new Set([
  "dissolved",
  "liquidation",
  "administration",
  "receivership",
  "converted-closed",
  "voluntary-arrangement",
  "insolvency-proceedings",
])

function companyAgeLabel(incorporatedDate: string): string {
  const d = new Date(incorporatedDate)
  const now = new Date()
  const totalMonths =
    (now.getFullYear() - d.getFullYear()) * 12 + (now.getMonth() - d.getMonth())
  if (totalMonths < 1) return "less than a month old"
  if (totalMonths < 12) return `${totalMonths} months old`
  const years = Math.floor(totalMonths / 12)
  return `${years} year${years !== 1 ? "s" : ""} old`
}

export function computeTrustSignals(profile: CompanyProfile): TrustSignal[] {
  const signals: TrustSignal[] = []
  const status = profile.company_status?.toLowerCase() ?? ""

  if (status === "active") {
    signals.push({ level: "green", label: "Company is Active" })
  } else if (status === "dormant") {
    signals.push({ level: "amber", label: "Company is Dormant" })
  } else if (BAD_STATUSES.has(status)) {
    const display = status.charAt(0).toUpperCase() + status.slice(1).replace("-", " ")
    signals.push({ level: "red", label: `Company status: ${display}` })
  }

  if (profile.date_of_creation) {
    const created = new Date(profile.date_of_creation)
    const now = new Date()
    const ageMs = now.getTime() - created.getTime()
    const ageMonths =
      (now.getFullYear() - created.getFullYear()) * 12 +
      (now.getMonth() - created.getMonth())
    const ageYears = ageMs / (1000 * 60 * 60 * 24 * 365.25)
    const formatted = new Date(profile.date_of_creation).toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    })
    const ageStr = companyAgeLabel(profile.date_of_creation)

    if (ageMonths < 12) {
      signals.push({
        level: "red",
        label: `Incorporated ${formatted} — ${ageStr}. Less than 12 months old — exercise caution`,
      })
    } else if (ageYears < 2) {
      signals.push({
        level: "amber",
        label: `Incorporated ${formatted} — ${ageStr}`,
      })
    } else {
      signals.push({
        level: "green",
        label: `Incorporated ${formatted} — ${ageStr}`,
      })
    }
  }

  const accountsDueStr =
    profile.accounts?.next_accounts?.due_on ?? profile.accounts?.next_due
  const accountsOverdue =
    profile.accounts?.overdue || profile.accounts?.next_accounts?.overdue

  if (accountsOverdue) {
    signals.push({ level: "red", label: "Accounts OVERDUE — check with caution" })
  } else if (accountsDueStr) {
    const dueDate = new Date(accountsDueStr)
    if (dueDate.getTime() < Date.now()) {
      signals.push({ level: "red", label: "Accounts OVERDUE — check with caution" })
    } else {
      signals.push({ level: "green", label: "Accounts filed on time" })
    }
  } else {
    signals.push({ level: "amber", label: "No accounts filed yet (new company)" })
  }

  if (profile.has_charges) {
    signals.push({ level: "amber", label: "Has charges (mortgages/loans) registered" })
  } else {
    signals.push({ level: "green", label: "No charges against the company" })
  }

  return signals
}

export function formatAddress(addr?: RegisteredAddress): string {
  if (!addr) return "Not available"
  return [
    addr.address_line_1,
    addr.address_line_2,
    addr.locality,
    addr.region,
    addr.postal_code,
    addr.country,
  ]
    .filter(Boolean)
    .join(", ")
}
