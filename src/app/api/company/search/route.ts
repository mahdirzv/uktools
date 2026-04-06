import { NextRequest, NextResponse } from "next/server"

const BASE_URL = "https://api.company-information.service.gov.uk"

export async function GET(request: NextRequest) {
  const apiKey = process.env.COMPANIES_HOUSE_API_KEY
  if (!apiKey) {
    return NextResponse.json(
      { error: "Companies House API is not configured" },
      { status: 503 }
    )
  }

  const q = request.nextUrl.searchParams.get("q")
  if (!q || q.trim().length === 0) {
    return NextResponse.json({ error: "Query parameter 'q' is required" }, { status: 400 })
  }

  const url = `${BASE_URL}/search/companies?q=${encodeURIComponent(q)}&items_per_page=5`
  const res = await fetch(url, {
    headers: {
      Authorization: `Basic ${Buffer.from(`${apiKey}:`).toString("base64")}`,
    },
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    return NextResponse.json(
      { error: "Failed to search Companies House" },
      { status: res.status }
    )
  }

  const data = await res.json()
  return NextResponse.json(data)
}
