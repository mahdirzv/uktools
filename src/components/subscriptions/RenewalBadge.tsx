import { daysUntilRenewal } from "@/lib/subscriptions"

interface RenewalBadgeProps {
  renewalDate: string
}

export function RenewalBadge({ renewalDate }: RenewalBadgeProps) {
  const days = daysUntilRenewal(renewalDate)

  let color: string
  if (days < 7) {
    color = "border-red-300 bg-red-100 text-red-700 dark:border-red-700 dark:bg-red-900/30 dark:text-red-300"
  } else if (days <= 30) {
    color = "border-amber-300 bg-amber-100 text-amber-700 dark:border-amber-700 dark:bg-amber-900/30 dark:text-amber-300"
  } else {
    color = "border-emerald-300 bg-emerald-100 text-emerald-700 dark:border-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300"
  }

  return (
    <span
      className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${color}`}
    >
      {days === 0 ? "Today" : days === 1 ? "1 day" : `${days} days`}
    </span>
  )
}
