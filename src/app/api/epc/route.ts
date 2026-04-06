import { NextRequest, NextResponse } from "next/server"

const BASE = "https://epc.opendatacommunities.org/api/v1/domestic"
const TIMEOUT = 10_000

function getAuth(): string | null {
  const creds = process.env.EPC_API_CREDENTIALS?.trim()
  if (!creds) return null
  return Buffer.from(creds).toString("base64")
}

// UK postcode regex — covers all valid formats e.g. M50 3SE, SW1A 1AA, E1 6RF
const UK_POSTCODE = /^[A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2}$/i

function buildUrl(query: string): string {
  const isPostcode = UK_POSTCODE.test(query.trim())
  const param = isPostcode ? "postcode" : "address"
  return `${BASE}/search?${param}=${encodeURIComponent(query.trim())}&size=5`
}

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address")
  if (!address?.trim()) {
    return NextResponse.json({ error: "address is required" }, { status: 400 })
  }

  const auth = getAuth()
  if (!auth) {
    return NextResponse.json({ configured: false }, { status: 200 })
  }

  try {
    const res = await fetch(buildUrl(address), {
      headers: { Authorization: `Basic ${auth}`, Accept: "application/json" },
      signal: AbortSignal.timeout(TIMEOUT),
    })

    if (!res.ok) {
      const text = await res.text().catch(() => "")
      console.error(`[epc/search] ${res.status}: ${text}`)
      return NextResponse.json(
        { error: `EPC API returned ${res.status}` },
        { status: 502 }
      )
    }

    // EPC API returns content-length: 0 when no results — res.json() would throw
    const text = await res.text()
    if (!text || text.trim() === "") {
      return NextResponse.json({ configured: true, properties: [] })
    }

    const json = JSON.parse(text)
    const rows: Record<string, string>[] = json.rows ?? []

    const properties = rows.map((r) => ({
      lmkKey:          r["lmk-key"],
      address:         [r.address1, r.address2, r.address3].filter(Boolean).join(", "),
      postcode:        r.postcode,
      posttown:        r.posttown,
      currentRating:   r["current-energy-rating"],
      currentScore:    Number(r["current-energy-efficiency"]) || 0,
      potentialRating: r["potential-energy-rating"],
      potentialScore:  Number(r["potential-energy-efficiency"]) || 0,
      propertyType:    r["property-type"],
      inspectionDate:  r["inspection-date"],
      heatingCost:     Number(r["heating-cost-current"]) || 0,
      hotWaterCost:    Number(r["hot-water-cost-current"]) || 0,
      lightingCost:    Number(r["lighting-cost-current"]) || 0,
      heatingCostPotential:   Number(r["heating-cost-potential"]) || 0,
      hotWaterCostPotential:  Number(r["hot-water-cost-potential"]) || 0,
      lightingCostPotential:  Number(r["lighting-cost-potential"]) || 0,
      mainheatDescription:    r["mainheat-description"],
      wallsDescription:       r["walls-description"],
      roofDescription:        r["roof-description"],
      co2Current:             Number(r["co2-emissions-current"]) || 0,
    }))

    return NextResponse.json({ configured: true, properties })
  } catch (err) {
    const msg = err instanceof Error ? err.message : "unknown"
    console.error("[epc/search] error:", msg)
    return NextResponse.json(
      { error: "Could not reach EPC service — please try again." },
      { status: 500 }
    )
  }
}
