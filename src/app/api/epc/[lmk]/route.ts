import { NextRequest, NextResponse } from "next/server"

function getBasicAuth(): string | null {
  const creds = process.env.EPC_API_CREDENTIALS
  if (!creds) return null
  return Buffer.from(creds).toString("base64")
}

export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ lmk: string }> }
) {
  const { lmk } = await params
  const auth = getBasicAuth()
  if (!auth) {
    return NextResponse.json({ configured: false }, { status: 200 })
  }

  try {
    const res = await fetch(
      `https://epc.opendatacommunities.org/api/v1/domestic/${encodeURIComponent(lmk)}`,
      {
        headers: {
          Authorization: `Basic ${auth}`,
          Accept: "application/json",
        },
        signal: AbortSignal.timeout(8000),
      }
    )

    if (!res.ok) {
      const text = await res.text()
      return NextResponse.json(
        { error: `EPC API error: ${res.status} ${text}` },
        { status: 502 }
      )
    }

    const json = await res.json()
    const row = (json.rows ?? [])[0] ?? null

    if (!row) {
      return NextResponse.json({ error: "Record not found" }, { status: 404 })
    }

    const record = {
      lmkKey: row["lmk-key"],
      address: row.address,
      postcode: row.postcode,
      posttown: row.posttown,
      currentRating: row["current-energy-rating"],
      currentScore: Number(row["current-energy-efficiency"] ?? 0),
      potentialRating: row["potential-energy-rating"],
      potentialScore: Number(row["potential-energy-efficiency"] ?? 0),
      co2Emissions: row["co2-emissions-current"],
      heatingCostCurrent: Number(row["heating-cost-current"] ?? 0),
      heatingCostPotential: Number(row["heating-cost-potential"] ?? 0),
      hotWaterCostCurrent: Number(row["hot-water-cost-current"] ?? 0),
      lightingCostCurrent: Number(row["lighting-cost-current"] ?? 0),
      mainheatDescription: row["mainheat-description"],
      wallsDescription: row["walls-description"],
      roofDescription: row["roof-description"],
      floorDescription: row["floor-description"],
      glazedArea: row["glazed-area"],
      inspectionDate: row["inspection-date"],
    }

    return NextResponse.json({ configured: true, record })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch EPC record. Please try again." },
      { status: 500 }
    )
  }
}
