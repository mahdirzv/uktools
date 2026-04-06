"use client"

import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent } from "@/components/ui/card"
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
  const priceError = priceInput !== "" && (rawPrice <= 0 || isNaN(rawPrice))
    ? "Please enter a valid property price greater than £0"
    : null
  const sdlt = useMemo(() => calculateStampDuty(price, buyerType), [price, buyerType])
  const otherTotal = useMemo(
    () => (includeOtherCosts ? totalOtherCosts(otherCosts) : 0),
    [includeOtherCosts, otherCosts]
  )
  const grandTotal = sdlt.total + otherTotal

  return (
    <div className="space-y-6">
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
          {priceError && (
            <p className="text-xs text-destructive">{priceError}</p>
          )}
          {price > 0 && (
            <p className="text-xs text-muted-foreground">
              Scotland or Wales?{" "}
              <a href="https://revenue.scot/taxes/land-and-buildings-transaction-tax" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">LBTT</a>
              {" · "}
              <a href="https://www.gov.wales/land-transaction-tax-guide" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">LTT</a>
            </p>
          )}
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

      {price > 0 && (
        <>
          <Card>
            <CardContent>
              <CostBreakdownTable bands={sdlt.bands} total={sdlt.total} />
              <p className="mt-3 text-xs text-muted-foreground">
                Rates effective {SDLT_META.effectiveFrom} · England &amp; Northern Ireland only ·{" "}
                <a
                  href={SDLT_META.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2 hover:text-foreground"
                >
                  Source: gov.uk
                </a>
              </p>
            </CardContent>
          </Card>

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
          )}

          {includeOtherCosts && (
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Total other costs</span>
              <span className="font-medium">{formatCurrency(otherTotal)}</span>
            </div>
          )}

          <div className="flex items-center justify-between rounded-lg bg-green-50 p-4">
            <span className="text-lg font-semibold">Grand total</span>
            <span className="text-2xl font-bold text-green-700">{formatCurrency(grandTotal)}</span>
          </div>

          <button
            type="button"
            onClick={switchTabAction}
            className="text-sm text-primary underline-offset-4 hover:underline"
          >
            Save money by switching utilities before you move →
          </button>
        </>
      )}
    </div>
  )
}
