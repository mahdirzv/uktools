import { NextRequest, NextResponse } from "next/server"

const BASE_URL = "https://api.company-information.service.gov.uk"

// Env var: COMPANIES_HOUSE_API_KEY — add to .env.local (never commit)
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  const apiKey = process.env.COMPANIES_HOUSE_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "Companies House API is not configured" },
      { status: 503 }
    )
  }

  const { number } = await params
  const authHeader = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`

  const [profileRes, officersRes, filingsRes] = await Promise.all([
    fetch(`${BASE_URL}/company/${number}`, {
      headers: { Authorization: authHeader },
      next: { revalidate: 300 },
    }),
    fetch(`${BASE_URL}/company/${number}/officers`, {
      headers: { Authorization: authHeader },
      next: { revalidate: 300 },
    }),
    fetch(`${BASE_URL}/company/${number}/filing-history?items_per_page=5`, {
      headers: { Authorization: authHeader },
      next: { revalidate: 300 },
    }),
  ])

  if (!profileRes.ok) {
    return NextResponse.json(
      { error: "Company not found" },
      { status: profileRes.status }
    )
  }

  const profile = await profileRes.json()
  const officers = officersRes.ok ? await officersRes.json() : { items: [] }
  const filings = filingsRes.ok ? await filingsRes.json() : { items: [] }

  return NextResponse.json({
    profile,
    officers: officers.items ?? [],
    filings: filings.items ?? [],
  })
}
