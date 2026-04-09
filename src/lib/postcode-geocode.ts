interface OsPlacesResponse {
  results?: Array<{
    DPA?: {
      LAT?: number | string
      LNG?: number | string
      LATITUDE?: number | string
      LONGITUDE?: number | string
    }
  }>
}

interface PostcodeCoordinates {
  latitude: number
  longitude: number
}

function parseCoord(value: number | string | undefined): number | null {
  if (value === undefined || value === null) return null
  const n = typeof value === "number" ? value : Number(value)
  return Number.isFinite(n) ? n : null
}

export async function geocodeUkPostcode(
  postcode: string,
  timeoutMs = 10000
): Promise<PostcodeCoordinates | null> {
  const apiKey = process.env.OS_PLACES_API_KEY?.trim()
  if (!apiKey) {
    throw new Error("OS Places API key is not configured")
  }

  const url = new URL("https://api.os.uk/search/places/v1/postcode")
  url.searchParams.set("postcode", postcode)
  url.searchParams.set("maxresults", "1")
  url.searchParams.set("key", apiKey)

  const res = await fetch(url.toString(), {
    signal: AbortSignal.timeout(timeoutMs),
    next: { revalidate: 86400 },
  })

  if (!res.ok) {
    if (res.status === 401 || res.status === 403) {
      throw new Error("OS Places API authentication failed")
    }
    if (res.status === 404) {
      return null
    }
    throw new Error(`OS Places lookup failed: ${res.status}`)
  }

  const json = (await res.json()) as OsPlacesResponse
  const dpa = json.results?.[0]?.DPA
  const latitude = parseCoord(dpa?.LATITUDE ?? dpa?.LAT)
  const longitude = parseCoord(dpa?.LONGITUDE ?? dpa?.LNG)

  if (latitude === null || longitude === null) {
    return null
  }

  return { latitude, longitude }
}
