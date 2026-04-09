import { NextRequest, NextResponse } from "next/server"

const POLICE_API = "https://data.police.uk/api"
const POSTCODES_API = "https://api.postcodes.io/postcodes"

const CATEGORIES: Record<string, string> = {
  "anti-social-behaviour": "Anti-social behaviour",
  "bicycle-theft": "Bicycle theft",
  "burglary": "Burglary",
  "criminal-damage-arson": "Criminal damage & arson",
  "drugs": "Drugs",
  "other-theft": "Other theft",
  "possession-of-weapons": "Weapons",
  "public-order": "Public order",
  "robbery": "Robbery",
  "shoplifting": "Shoplifting",
  "theft-from-the-person": "Theft from person",
  "vehicle-crime": "Vehicle crime",
  "violent-crime": "Violence & sexual offences",
  "other-crime": "Other",
}

function getLast12Months(): string[] {
  const months: string[] = []
  const now = new Date()
  // Police data lags ~2 months, start from 3 months ago to be safe
  const start = new Date(now.getFullYear(), now.getMonth() - 3, 1)
  for (let i = 0; i < 12; i++) {
    const d = new Date(start.getFullYear(), start.getMonth() - i, 1)
    const yyyy = d.getFullYear()
    const mm = String(d.getMonth() + 1).padStart(2, "0")
    months.push(`${yyyy}-${mm}`)
  }
  return months
}

interface PoliceCrime {
  category: string
  month: string
}

export async function GET(request: NextRequest) {
  const postcode = request.nextUrl.searchParams.get("postcode")
  if (!postcode || postcode.trim().length === 0) {
    return NextResponse.json(
      { error: "Query parameter 'postcode' is required" },
      { status: 400 }
    )
  }

  const clean = postcode.replace(/\s+/g, "").toUpperCase()
  if (clean.startsWith("BT")) {
    return NextResponse.json(
      {
        error:
          "BT postcodes are temporarily unavailable while we complete Northern Ireland commercial licensing.",
      },
      { status: 403 }
    )
  }

  const geoRes = await fetch(`${POSTCODES_API}/${encodeURIComponent(clean)}`)
  if (!geoRes.ok) {
    if (geoRes.status === 404) {
      return NextResponse.json({ error: "Invalid UK postcode" }, { status: 400 })
    }
    return NextResponse.json(
      { error: "Failed to look up postcode" },
      { status: 502 }
    )
  }

  const geoData: { result: { latitude: number; longitude: number } | null } =
    await geoRes.json()
  if (!geoData.result) {
    return NextResponse.json({ error: "Invalid UK postcode" }, { status: 400 })
  }

  const { latitude: lat, longitude: lng } = geoData.result
  const months = getLast12Months()

  const results = await Promise.allSettled(
    months.map((date) =>
      fetch(
        `${POLICE_API}/crimes-street/all-crime?lat=${lat}&lng=${lng}&date=${date}`
      ).then((res) => {
        if (!res.ok) return []
        return res.json() as Promise<PoliceCrime[]>
      })
    )
  )

  const counts: Record<string, number> = {}
  let latestMonth = ""

  for (const result of results) {
    if (result.status !== "fulfilled") continue
    const crimes = result.value
    if (!Array.isArray(crimes)) continue

    for (const crime of crimes) {
      const key = crime.category
      if (key in CATEGORIES) {
        counts[key] = (counts[key] || 0) + 1
      }
      if (crime.month > latestMonth) {
        latestMonth = crime.month
      }
    }
  }

  const breakdown = Object.entries(counts)
    .map(([category, count]) => ({
      category,
      label: CATEGORIES[category] || category,
      count,
    }))
    .sort((a, b) => b.count - a.count)

  const total = breakdown.reduce((sum, b) => sum + b.count, 0)

  const response = NextResponse.json({
    postcode: clean,
    total,
    latestMonth,
    months: months.length,
    breakdown,
  })

  response.headers.set("Cache-Control", "public, s-maxage=86400")
  return response
}
