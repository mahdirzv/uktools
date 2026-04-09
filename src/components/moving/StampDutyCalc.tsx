"use client"

import { useMemo, useState } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { calculateStampDuty, SDLT_META, type BuyerType } from "@/lib/stamp-duty"
import { DEFAULT_COSTS, totalOtherCosts } from "@/lib/moving-costs"
import { CostBreakdownTable } from "./CostBreakdownTable"

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: "GBP",
    maximumFractionDigits: 0,
  }).format(amount)
}

export function StampDutyCalc({ switchTabAction }: { switchTabAction: () => void }) {
  const [priceInput, setPriceInput] = useState("")
  const [buyerType, setBuyerType] = useState<BuyerType>("first-time")
  const [includeOtherCosts, setIncludeOtherCosts] = useState(true)
  const [otherCosts, setOtherCosts] = useState<Record<string, number>>(() =>
    Object.fromEntries(DEFAULT_COSTS.map((c) => [c.key, c.defaultValue]))
  )

  const rawPrice = Number(priceInput)
  const price = priceInput !== "" && rawPrice > 0 ? rawPrice : 0
  const priceError =
    priceInput !== "" && (rawPrice <= 0 || isNaN(rawPrice))
      ? "Please enter a valid property price greater than £0"
      : null

  const sdlt = useMemo(() => calculateStampDuty(price, buyerType), [price, buyerType])
  const otherTotal = useMemo(
    () => (includeOtherCosts ? totalOtherCosts(otherCosts) : 0),
    [includeOtherCosts, otherCosts]
  )
  const grandTotal = sdlt.total + otherTotal

  const firstTimeBuyerReliefMessage =
    buyerType === "first-time"
      ? price <= 500000
        ? "First-time buyer relief applied."
        : "First-time buyer relief is not available above £500,000, so standard rates are used."
      : null

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-1">
          <CardTitle className="text-base">1. Property details</CardTitle>
          <CardDescription>Enter your property price and buyer type to estimate SDLT.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="price">Property price (£)</Label>
              <Input
                id="price"
                type="number"
                min={0}
                step={1000}
                placeholder="e.g. 300000"
                value={priceInput}
                onChange={(e) => setPriceInput(e.target.value)}
              />
              {priceError && <p className="text-xs text-destructive">{priceError}</p>}
              <p className="text-xs text-muted-foreground">Use whole pounds (for example: 425000).</p>
            </div>

            <div className="space-y-2">
              <Label>Buyer type</Label>
              <Select value={buyerType} onValueChange={(v) => setBuyerType(v as BuyerType)}>
                <SelectTrigger className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="first-time">First-time buyer</SelectItem>
                  <SelectItem value="standard">Existing homeowner</SelectItem>
                  <SelectItem value="additional">Additional property</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {price > 0 && (
        <>
          <Card className="border-primary/20 bg-primary/[0.03]">
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">2. Estimated costs</CardTitle>
              <CardDescription>Grand total = SDLT + other moving costs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-3 sm:grid-cols-3">
                <SummaryStat label="Stamp Duty (SDLT)" value={formatCurrency(sdlt.total)} />
                <SummaryStat
                  label="Other moving costs"
                  value={includeOtherCosts ? formatCurrency(otherTotal) : "Not included"}
                />
                <SummaryStat label="Grand total" value={formatCurrency(grandTotal)} highlight />
              </div>

              {firstTimeBuyerReliefMessage && (
                <p className="text-xs text-muted-foreground">{firstTimeBuyerReliefMessage}</p>
              )}

              <p className="text-xs text-muted-foreground">
                England &amp; Northern Ireland only. Scotland/Wales have different taxes (LBTT/LTT).
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">Detailed tax breakdown</CardTitle>
              <CardDescription>Band-by-band SDLT calculation.</CardDescription>
            </CardHeader>
            <CardContent>
              <CostBreakdownTable bands={sdlt.bands} total={sdlt.total} />
              <p className="mt-3 text-xs text-muted-foreground">
                Rates effective {SDLT_META.effectiveFrom} ·{" "}
                <a
                  href={SDLT_META.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Source: gov.uk
                </a>
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                Scotland or Wales?{" "}
                <a
                  href="https://revenue.scot/taxes/land-and-buildings-transaction-tax"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  LBTT
                </a>
                {" · "}
                <a
                  href="https://www.gov.wales/land-transaction-tax-guide"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  LTT
                </a>
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">Other moving costs</CardTitle>
              <CardDescription>Toggle and edit optional non-tax costs.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-start gap-3">
                <Checkbox
                  id="include-costs"
                  checked={includeOtherCosts}
                  onCheckedChange={(v) => setIncludeOtherCosts(!!v)}
                  className="mt-0.5"
                />
                <Label htmlFor="include-costs">Include other moving costs</Label>
              </div>

              {includeOtherCosts && (
                <>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {DEFAULT_COSTS.map((cost) => (
                      <div key={cost.key} className="space-y-1">
                        <Label htmlFor={cost.key} className="text-xs text-muted-foreground">
                          {cost.label}
                        </Label>
                        <Input
                          id={cost.key}
                          type="number"
                          min={0}
                          value={otherCosts[cost.key]}
                          onChange={(e) =>
                            setOtherCosts((prev) => ({
                              ...prev,
                              [cost.key]: Number(e.target.value) || 0,
                            }))
                          }
                        />
                      </div>
                    ))}
                  </div>

                  <div className="flex items-center justify-between rounded-md border bg-muted/30 px-3 py-2 text-sm">
                    <span className="text-muted-foreground">Total other costs</span>
                    <span className="font-medium">{formatCurrency(otherTotal)}</span>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="space-y-1">
              <CardTitle className="text-base">3. Next step</CardTitle>
              <CardDescription>Cut monthly bills before move-in day.</CardDescription>
            </CardHeader>
            <CardContent>
              <Button type="button" onClick={switchTabAction} className="w-full sm:w-auto">
                Compare utility deals before you move
              </Button>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}

function SummaryStat({
  label,
  value,
  highlight = false,
}: {
  label: string
  value: string
  highlight?: boolean
}) {
  return (
    <div
      className={
        highlight
          ? "rounded-lg border border-green-200 bg-green-50 p-3"
          : "rounded-lg border border-border/70 bg-background/80 p-3"
      }
    >
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={highlight ? "mt-1 text-lg font-semibold text-green-700" : "mt-1 text-lg font-semibold"}>
        {value}
      </p>
    </div>
  )
}
