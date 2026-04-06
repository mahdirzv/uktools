export const CATEGORIES = [
  "Entertainment",
  "Utilities",
  "Software",
  "Health",
  "Other",
] as const

export type Category = (typeof CATEGORIES)[number]

export interface Subscription {
  id: string
  name: string
  costPerMonth: number
  renewalDate: string
  category: Category
}

const STORAGE_KEY = "uktools_subscriptions"

export function getSubscriptions(): Subscription[] {
  if (typeof window === "undefined") return []
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? (JSON.parse(raw) as Subscription[]) : []
  } catch {
    return []
  }
}

export function saveSubscriptions(subs: Subscription[]): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(subs))
}

export function addSubscription(
  sub: Omit<Subscription, "id">
): Subscription[] {
  const subs = getSubscriptions()
  const newSub: Subscription = { ...sub, id: crypto.randomUUID() }
  const updated = [...subs, newSub]
  saveSubscriptions(updated)
  return updated
}

export function deleteSubscription(id: string): Subscription[] {
  const subs = getSubscriptions().filter((s) => s.id !== id)
  saveSubscriptions(subs)
  return subs
}

export function daysUntilRenewal(renewalDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const renewal = new Date(renewalDate)
  renewal.setHours(0, 0, 0, 0)

  let target = new Date(renewal)
  target.setFullYear(today.getFullYear())
  target.setMonth(renewal.getMonth())
  target.setDate(renewal.getDate())

  if (target < today) {
    target.setFullYear(target.getFullYear() + 1)
  }

  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

const BROADBAND_KEYWORDS = ["sky", "bt", "virgin", "talk", "now", "plusnet"]

export function hasBroadbandSubscription(subs: Subscription[]): boolean {
  return subs.some((sub) =>
    BROADBAND_KEYWORDS.some((kw) => sub.name.toLowerCase().includes(kw))
  )
}
