import { NextRequest, NextResponse } from "next/server"

const BASE_URL = "https://api.company-information.service.gov.uk"
const TIMEOUT_MS = 8000

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ number: string }> }
) {
  const apiKey = process.env.COMPANIES_HOUSE_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      { error: "Companies House API is not configured" },
      { status: 503 }
    )
  }

  const { number } = await params
  const auth = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`
  const opts = {
    headers: { Authorization: auth },
    next: { revalidate: 300 },
    signal: AbortSignal.timeout(TIMEOUT_MS),
  }

  try {
    const [profileRes, officersRes, filingsRes] = await Promise.all([
      fetch(`${BASE_URL}/company/${number}`, opts),
      fetch(`${BASE_URL}/company/${number}/officers`, opts),
      fetch(`${BASE_URL}/company/${number}/filing-history?items_per_page=5`, opts),
    ])

    if (!profileRes.ok) {
      return NextResponse.json({ error: "Company not found" }, { status: profileRes.status })
    }

    const profile  = await profileRes.json()
    const officers = officersRes.ok ? await officersRes.json() : { items: [] }
    const filings  = filingsRes.ok  ? await filingsRes.json()  : { items: [] }

    return NextResponse.json({
      profile,
      officers: officers.items ?? [],
      filings:  filings.items  ?? [],
    })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    console.error("[company/number] fetch error:", msg)
    return NextResponse.json(
      { error: "Could not reach Companies House — please try again" },
      { status: 502 }
    )
  }
}
