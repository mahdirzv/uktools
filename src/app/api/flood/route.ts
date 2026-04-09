import { NextRequest, NextResponse } from "next/server"

interface PostcodeResult {
  result: {
    latitude: number
    longitude: number
  } | null
}

interface EAWarning {
  description: string
  message: string
  severity: string
  severityLevel: number
  timeMessageChanged: string
  floodArea: {
    description: string
    label: string
  }
}

interface EAStation {
  "@id": string
  label: string
  RLOIid?: string
  notation: string
  riverName?: string
  lat: number
  long: number
  measures?: { latestReading?: { value: number; dateTime: string } }[]
}

interface EAReading {
  value: number
  dateTime: string
}

function haversineKm(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLng = ((lng2 - lng1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

async function fetchJson<T>(url: string, timeoutMs = 15000): Promise<T> {
  const res = await fetch(url, {
    signal: AbortSignal.timeout(timeoutMs),
    next: { revalidate: 300 },
  })

  if (!res.ok) {
    throw new Error(`Upstream request failed: ${res.status}`)
  }

  return res.json() as Promise<T>
}

export async function GET(req: NextRequest) {
  const postcode = req.nextUrl.searchParams.get("postcode")
  if (!postcode) {
    return NextResponse.json({ error: "postcode is required" }, { status: 400 })
  }

  const clean = postcode.replace(/\s+/g, "").toUpperCase()

  try {
    const pcJson = await fetchJson<PostcodeResult>(
      `https://api.postcodes.io/postcodes/${clean}`,
      10000
    )

    if (!pcJson.result) {
      return NextResponse.json(
        { error: "Postcode not found. Please check and try again." },
        { status: 404 }
      )
    }

    const { latitude: lat, longitude: lng } = pcJson.result

    const [warningsResult, stationsResult] = await Promise.allSettled([
      fetchJson<{ items?: EAWarning[] }>(
        `https://environment.data.gov.uk/flood-monitoring/id/floods?lat=${lat}&long=${lng}&dist=5`,
        15000
      ),
      fetchJson<{ items?: EAStation[] }>(
        `https://environment.data.gov.uk/flood-monitoring/id/stations?lat=${lat}&long=${lng}&dist=5`,
        15000
      ),
    ])

    const warningsJson =
      warningsResult.status === "fulfilled" ? warningsResult.value : { items: [] }
    const stationsJson =
      stationsResult.status === "fulfilled" ? stationsResult.value : { items: [] }

    const warnings = (warningsJson.items ?? []).map((w: EAWarning) => ({
      description: w.description,
      message: w.message,
      severity: w.severity,
      severityLevel: w.severityLevel,
      lastUpdated: w.timeMessageChanged,
      area: w.floodArea?.label ?? w.floodArea?.description ?? "",
    }))

    const stations: EAStation[] = stationsJson.items ?? []
    const topStations = stations
      .filter((s) => s.lat && s.long)
      .map((s) => ({
        ...s,
        distKm: haversineKm(lat, lng, s.lat, s.long),
      }))
      .sort((a, b) => a.distKm - b.distKm)
      .slice(0, 3)

    const gauges = await Promise.all(
      topStations.map(async (station) => {
        try {
          const ref = station.notation
          const readingsJson = await fetchJson<{ items?: EAReading[] }>(
            `https://environment.data.gov.uk/flood-monitoring/id/stations/${ref}/readings?_limit=24&_sorted`,
            10000
          )
          const readings: EAReading[] = readingsJson.items ?? []

          const latest = readings[0]?.value ?? null
          const previous = readings[1]?.value ?? null

          let trend: "rising" | "falling" | "stable" = "stable"
          if (latest !== null && previous !== null) {
            if (latest > previous + 0.005) trend = "rising"
            else if (latest < previous - 0.005) trend = "falling"
          }

          return {
            name: station.label,
            riverName: station.riverName ?? null,
            currentLevel: latest,
            trend,
            distKm: Math.round(station.distKm * 10) / 10,
          }
        } catch {
          return null
        }
      })
    )

    return NextResponse.json({
      postcode: clean,
      lat,
      lng,
      warnings,
      gauges: gauges.filter(Boolean),
      lastUpdated: new Date().toISOString(),
    })
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch flood data. Please try again." },
      { status: 500 }
    )
  }
}
