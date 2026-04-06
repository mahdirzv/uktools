import type { TrustSignal } from "@/lib/companies-house"
import { CheckCircle2, AlertTriangle, XCircle } from "lucide-react"

const ICON_MAP = {
  green: CheckCircle2,
  amber: AlertTriangle,
  red: XCircle,
} as const

const COLOR_MAP = {
  green: "text-emerald-600 bg-emerald-50 border-emerald-200",
  amber: "text-amber-600 bg-amber-50 border-amber-200",
  red: "text-red-600 bg-red-50 border-red-200",
} as const

export function TrustSignals({ signals }: { signals: TrustSignal[] }) {
  const grouped = {
    green: signals.filter((s) => s.level === "green"),
    amber: signals.filter((s) => s.level === "amber"),
    red: signals.filter((s) => s.level === "red"),
  }

  return (
    <div className="flex flex-col gap-3">
      <h3 className="text-sm font-semibold">Trust Signals</h3>
      <div className="flex flex-col gap-2">
        {(["red", "amber", "green"] as const).map((level) =>
          grouped[level].map((signal, i) => {
            const Icon = ICON_MAP[level]
            return (
              <div
                key={`${level}-${i}`}
                className={`flex items-center gap-3 rounded-lg border p-3 text-sm ${COLOR_MAP[level]}`}
              >
                <Icon className="size-4 shrink-0" />
                <span>{signal.label}</span>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}
