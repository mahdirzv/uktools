import { NextRequest, NextResponse } from "next/server"

const BASE = "https://epc.opendatacommunities.org/api/v1/domestic"

function getAuth(): string | null {
  const creds = process.env.EPC_API_CREDENTIALS?.trim()
  if (!creds) return null
  return Buffer.from(creds).toString("base64")
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lmk: string }> }
) {
  const { lmk } = await params
  const auth = getAuth()
  if (!auth) return NextResponse.json({ configured: false }, { status: 200 })

  try {
    // EPC API: single certificate fetched via search?lmk-key= (not /domestic/{lmk})
    const res = await fetch(
      `${BASE}/search?lmk-key=${encodeURIComponent(lmk)}&size=1`,
      {
        headers: { Authorization: `Basic ${auth}`, Accept: "application/json" },
        signal: AbortSignal.timeout(10_000),
      }
    )

    if (!res.ok) {
      console.error(`[epc/lmk] ${res.status}`)
      return NextResponse.json({ error: "Certificate not found" }, { status: 502 })
    }

    const text = await res.text()
    if (!text?.trim()) {
      return NextResponse.json({ error: "Certificate not found" }, { status: 404 })
    }

    const json = JSON.parse(text)
    const r: Record<string, string> = (json.rows ?? [])[0]
    if (!r) return NextResponse.json({ error: "Certificate not found" }, { status: 404 })

    return NextResponse.json({
      configured: true,
      record: {
        lmkKey:                r["lmk-key"],
        address:               [r.address1, r.address2, r.address3].filter(Boolean).join(", "),
        postcode:              r.postcode,
        posttown:              r.posttown,
        propertyType:          r["property-type"],
        builtForm:             r["built-form"],
        currentRating:         r["current-energy-rating"],
        currentScore:          Number(r["current-energy-efficiency"]) || 0,
        potentialRating:       r["potential-energy-rating"],
        potentialScore:        Number(r["potential-energy-efficiency"]) || 0,
        co2Current:            Number(r["co2-emissions-current"]) || 0,
        co2Potential:          Number(r["co2-emissions-potential"]) || 0,
        heatingCostCurrent:    Number(r["heating-cost-current"]) || 0,
        heatingCostPotential:  Number(r["heating-cost-potential"]) || 0,
        hotWaterCostCurrent:   Number(r["hot-water-cost-current"]) || 0,
        hotWaterCostPotential: Number(r["hot-water-cost-potential"]) || 0,
        lightingCostCurrent:   Number(r["lighting-cost-current"]) || 0,
        lightingCostPotential: Number(r["lighting-cost-potential"]) || 0,
        mainheatDescription:   r["mainheat-description"],
        wallsDescription:      r["walls-description"],
        roofDescription:       r["roof-description"],
        floorDescription:      r["floor-description"],
        windowsDescription:    r["windows-description"],
        inspectionDate:        r["inspection-date"],
        lodgementDate:         r["lodgement-date"],
      },
    })
  } catch (err) {
    console.error("[epc/lmk] error:", err instanceof Error ? err.message : err)
    return NextResponse.json({ error: "Could not fetch certificate" }, { status: 500 })
  }
}
