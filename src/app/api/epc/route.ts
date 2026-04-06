import { NextRequest, NextResponse } from "next/server"

function getBasicAuth(): string | null {
  const creds = process.env.EPC_API_CREDENTIALS
  if (!creds) return null
  return Buffer.from(creds).toString("base64")
}

export async function GET(req: NextRequest) {
  const address = req.nextUrl.searchParams.get("address")
  if (!address) {
    return NextResponse.json({ error: "address is required" }, { status: 400 })
  }

  const auth = getBasicAuth()
  if (!auth) {
    return NextResponse.json({ configured: false }, { status: 200 })
  }

  try {
    const res = await fetch(
      `https://epc.opendatacommunities.org/api/v1/domestic/search?address=${encodeURIComponent(address)}&size=5`,
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
    const rows = json.rows ?? []

    const properties = rows.map(
      (r: Record<string, string>) => ({
        lmkKey: r["lmk-key"],
        address: r.address,
        posttown: r.posttown,
        postcode: r.postcode,
        currentRating: r["current-energy-rating"],
        currentScore: r["current-energy-efficiency"],
        potentialRating: r["potential-energy-rating"],
        potentialScore: r["potential-energy-efficiency"],
        inspectionDate: r["inspection-date"],
      })
    )

    return NextResponse.json({ configured: true, properties })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch EPC data. Please try again." },
      { status: 500 }
    )
  }
}
