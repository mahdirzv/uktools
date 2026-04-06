import { NextRequest, NextResponse } from "next/server"

const BASE_URL = "https://api.company-information.service.gov.uk"
const TIMEOUT_MS = 8000

export async function GET(request: NextRequest) {
  const apiKey = process.env.COMPANIES_HOUSE_API_KEY?.trim()
  if (!apiKey) {
    return NextResponse.json(
      { error: "Companies House API is not configured" },
      { status: 503 }
    )
  }

  const q = request.nextUrl.searchParams.get("q")?.trim()
  if (!q || q.length === 0) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  const auth = `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`
  const url = `${BASE_URL}/search/companies?q=${encodeURIComponent(q)}&items_per_page=5`

  try {
    const res = await fetch(url, {
      headers: { Authorization: auth },
      next: { revalidate: 300 },
      signal: AbortSignal.timeout(TIMEOUT_MS),
    })

    if (!res.ok) {
      const body = await res.text().catch(() => "")
      console.error(`[company/search] CH API ${res.status}: ${body}`)
      return NextResponse.json(
        { error: "Companies House lookup failed" },
        { status: res.status }
      )
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (err) {
    const msg = err instanceof Error ? err.message : "Unknown error"
    console.error("[company/search] fetch error:", msg)
    return NextResponse.json(
      { error: "Could not reach Companies House — please try again" },
      { status: 502 }
    )
  }
}
