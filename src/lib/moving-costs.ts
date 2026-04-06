export interface MovingCost {
  label: string
  defaultValue: number
  key: string
}

export const DEFAULT_COSTS: MovingCost[] = [
  { label: "Solicitor / conveyancing", defaultValue: 1500, key: "solicitor" },
  { label: "Survey (Homebuyer Report)", defaultValue: 500, key: "survey" },
  { label: "Mortgage arrangement fee", defaultValue: 999, key: "mortgage" },
  { label: "Removal company", defaultValue: 1200, key: "removal" },
  { label: "Buildings insurance (first year)", defaultValue: 200, key: "insurance" },
]

export function totalOtherCosts(costs: Record<string, number>): number {
  return Object.values(costs).reduce((sum, v) => sum + v, 0)
}
