import { daysUntilRenewal } from "@/lib/subscriptions"

interface RenewalBadgeProps {
  renewalDate: string
}

export function RenewalBadge({ renewalDate }: RenewalBadgeProps) {
  const days = daysUntilRenewal(renewalDate)

  let color: string
  if (days < 7) {
    color = "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
  } else if (days <= 30) {
    color = "bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400"
  } else {
    color = "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
  }

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${color}`}
    >
      {days === 0 ? "Today" : days === 1 ? "1 day" : `${days} days`}
    </span>
  )
}
