import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { contractorInsuranceLink } from "@/lib/awin"
import { Shield } from "lucide-react"
import type { DayRateBreakdown } from "@/lib/day-rate-calc"

function formatCurrency(value: number): string {
  return `£${Math.round(value).toLocaleString("en-GB")}`
}

interface DayRateResultProps {
  breakdown: DayRateBreakdown
}

export function DayRateResult({ breakdown }: DayRateResultProps) {
  return (
    <div className="flex flex-col gap-6">
      <div className="rounded-xl bg-primary/5 ring-1 ring-primary/10 p-6 text-center">
        <p className="text-sm text-muted-foreground mb-1">
          Your recommended day rate
        </p>
        <p className="text-4xl font-bold tracking-tight">
          {formatCurrency(breakdown.dayRate)}{" "}
          <span className="text-lg font-normal text-muted-foreground">
            per day
          </span>
        </p>
        <p className="text-lg text-muted-foreground mt-1">
          {formatCurrency(breakdown.weeklyRate)} per week estimate
        </p>
        <div className="mt-4 text-sm text-muted-foreground space-y-0.5">
          <p>Assuming {breakdown.billableDays} billable days/year</p>
          <p>
            Equivalent to {formatCurrency(breakdown.annualContract)} gross
            contract value
          </p>
          {breakdown.vatRegistered && (
            <p className="text-xs mt-2">
              Day rate shown is VAT-exclusive. Add 20% VAT to your invoices.
            </p>
          )}
        </div>
      </div>

      {breakdown.ir35Status === "outside" && (
        <div>
          <h3 className="text-sm font-medium mb-3">
            Where the money goes (annual)
          </h3>
          <table className="w-full text-sm">
            <tbody className="divide-y">
              <Row
                label="Target salary / income"
                value={formatCurrency(breakdown.targetSalary)}
              />
              <Row
                label="Employer NI (13.8% above £9,100)"
                value={formatCurrency(breakdown.employerNI)}
              />
              <Row
                label="Pension contribution"
                value={formatCurrency(breakdown.pensionContribution)}
              />
              <Row
                label="Downtime buffer (20%)"
                value={formatCurrency(breakdown.downtimeBuffer)}
              />
              <Row
                label="Ltd company costs (accountant, insurance)"
                value={formatCurrency(breakdown.ltdCosts)}
              />
              <Row
                label="Total gross needed"
                value={formatCurrency(breakdown.grossNeeded)}
                bold
              />
            </tbody>
          </table>
        </div>
      )}

      {breakdown.ir35Status === "inside" && (
        <div>
          <h3 className="text-sm font-medium mb-3">Inside IR35 estimate</h3>
          <table className="w-full text-sm">
            <tbody className="divide-y">
              <Row
                label="Target take-home salary"
                value={formatCurrency(breakdown.targetSalary)}
              />
              <Row
                label="Gross needed (÷ 0.68 for tax/NI)"
                value={formatCurrency(breakdown.grossNeeded)}
              />
              <Row
                label={`Day rate (÷ ${breakdown.billableDays} days)`}
                value={formatCurrency(breakdown.dayRate)}
                bold
              />
            </tbody>
          </table>
          <p className="text-xs text-muted-foreground mt-3">
            Inside IR35, roughly 32% of your gross is deducted for tax and NI by
            the fee-payer.
          </p>
        </div>
      )}

      <div className="flex min-h-[220px] flex-col rounded-xl border p-5">
        <div className="flex items-center gap-2">
          <Shield className="size-5 text-primary" />
          <h3 className="text-base font-semibold">Contractor insurance</h3>
        </div>
        <p className="mt-3 text-sm text-muted-foreground">
          Most clients require Professional Indemnity and Public Liability
          insurance before you start a contract.
        </p>
        <div className="mt-auto flex items-center gap-2 pt-4">
          <Button
            variant="outline"
            render={
              <a
                href={contractorInsuranceLink()}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
          >
            Compare contractor insurance
          </Button>
          <Badge variant="secondary">Coming soon</Badge>
        </div>
      </div>
    </div>
  )
}

function Row({
  label,
  value,
  bold,
}: {
  label: string
  value: string
  bold?: boolean
}) {
  return (
    <tr>
      <td className={`py-2 ${bold ? "font-medium" : "text-muted-foreground"}`}>
        {label}
      </td>
      <td
        className={`py-2 text-right tabular-nums ${bold ? "font-medium" : ""}`}
      >
        {value}
      </td>
    </tr>
  )
}
