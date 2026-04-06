const RATING_COLOURS: Record<string, string> = {
  A: "#009900",
  B: "#19b200",
  C: "#8dce46",
  D: "#ffd500",
  E: "#fcaa65",
  F: "#ef8023",
  G: "#e9153b",
}

interface EpcRatingBadgeProps {
  rating: string
  score?: number
  size?: "sm" | "lg"
}

export function EpcRatingBadge({ rating, score, size = "sm" }: EpcRatingBadgeProps) {
  const upper = (rating ?? "").toUpperCase()
  const colour = RATING_COLOURS[upper] ?? "#999"

  const dim = size === "lg" ? "w-14 h-14 text-2xl" : "w-9 h-9 text-base"

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        className={`${dim} flex items-center justify-center rounded font-bold text-white`}
        style={{ backgroundColor: colour }}
      >
        {upper || "?"}
      </div>
      {score !== undefined && (
        <span className="text-xs text-muted-foreground">{score}</span>
      )}
    </div>
  )
}
