"use client"

import { useState, useCallback, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { DayRateResult } from "./DayRateResult"
import {
  calculateDayRate,
  DEFAULT_INPUTS,
  type DayRateInputs,
} from "@/lib/day-rate-calc"
import { Share2, Check } from "lucide-react"

export function DayRateCalculator() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const [copied, setCopied] = useState(false)

  const [inputs, setInputs] = useState<DayRateInputs>(() => {
    const salary = searchParams.get("salary")
    const days = searchParams.get("days")
    const ir35 = searchParams.get("ir35")
    const vat = searchParams.get("vat")

    return {
      ...DEFAULT_INPUTS,
      ...(salary && !isNaN(Number(salary))
        ? { targetSalary: Number(salary) }
        : {}),
      ...(days && !isNaN(Number(days)) ? { billableDays: Number(days) } : {}),
      ...(ir35 === "inside" || ir35 === "outside" ? { ir35Status: ir35 } : {}),
      ...(vat === "1" ? { vatRegistered: true } : {}),
    }
  })

  const breakdown = calculateDayRate(inputs)

  const update = useCallback(
    <K extends keyof DayRateInputs>(key: K, value: DayRateInputs[K]) => {
      setInputs((prev) => ({ ...prev, [key]: value }))
    },
    []
  )

  const handleShare = useCallback(() => {
    const params = new URLSearchParams()
    params.set("salary", String(inputs.targetSalary))
    params.set("days", String(inputs.billableDays))
    params.set("ir35", inputs.ir35Status)
    if (inputs.vatRegistered) params.set("vat", "1")

    const url = `${window.location.origin}/freelance/day-rate?${params.toString()}`
    navigator.clipboard.writeText(url)
    setCopied(true)
  }, [inputs])

  useEffect(() => {
    if (copied) {
      const timer = setTimeout(() => setCopied(false), 2000)
      return () => clearTimeout(timer)
    }
  }, [copied])

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="salary">
            Current employed salary (or target annual income)
          </Label>
          <div className="relative">
            <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              £
            </span>
            <Input
              id="salary"
              type="number"
              min={0}
              step={1000}
              value={inputs.targetSalary || ""}
              onChange={(e) =>
                update("targetSalary", Number(e.target.value) || 0)
              }
              className="pl-6"
              placeholder="50000"
            />
            <span className="absolute right-2.5 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              /year
            </span>
          </div>
        </div>

        <Accordion>
          <AccordionItem value="advanced">
            <AccordionTrigger>Advanced options</AccordionTrigger>
            <AccordionContent>
              <div className="flex flex-col gap-4 pt-2">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="days">Billable days per year</Label>
                  <Input
                    id="days"
                    type="number"
                    min={1}
                    max={365}
                    value={inputs.billableDays || ""}
                    onChange={(e) =>
                      update("billableDays", Number(e.target.value) || 220)
                    }
                    placeholder="220"
                  />
                  <p className="text-xs text-muted-foreground">
                    Default: 220 (assumes 4 weeks holiday, 8 bank holidays,
                    10 sick/admin days)
                  </p>
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="ni">Employer NI contribution (%)</Label>
                  <Input
                    id="ni"
                    type="number"
                    min={0}
                    max={100}
                    step={0.1}
                    value={inputs.employerNIRate || ""}
                    onChange={(e) =>
                      update("employerNIRate", Number(e.target.value) || 13.8)
                    }
                    placeholder="13.8"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="pension">Pension contribution (%)</Label>
                  <Input
                    id="pension"
                    type="number"
                    min={0}
                    max={100}
                    step={0.5}
                    value={inputs.pensionRate || ""}
                    onChange={(e) =>
                      update("pensionRate", Number(e.target.value) || 5)
                    }
                    placeholder="5"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <Label>IR35 status</Label>
                  <RadioGroup
                    value={inputs.ir35Status}
                    onValueChange={(val) =>
                      update("ir35Status", val as "outside" | "inside")
                    }
                    className="flex gap-4"
                  >
                    <Label htmlFor="ir35-outside" className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-0.5 font-normal">
                      <RadioGroupItem id="ir35-outside" value="outside" />
                      <span>Outside IR35 (Ltd Co)</span>
                    </Label>
                    <Label htmlFor="ir35-inside" className="flex cursor-pointer items-center gap-2 rounded-md px-1 py-0.5 font-normal">
                      <RadioGroupItem id="ir35-inside" value="inside" />
                      <span>Inside IR35 (on payroll)</span>
                    </Label>
                  </RadioGroup>
                </div>

                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    id="vat"
                    checked={inputs.vatRegistered}
                    onChange={(e) =>
                      update("vatRegistered", e.target.checked)
                    }
                    className="size-4 rounded border-input"
                  />
                  <Label htmlFor="vat" className="font-normal">
                    VAT registered?
                  </Label>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>

      {inputs.targetSalary > 0 && <DayRateResult breakdown={breakdown} />}

      <Button
        variant="outline"
        size="lg"
        className="w-full gap-2"
        onClick={handleShare}
      >
        {copied ? (
          <>
            <Check className="size-4" />
            Link copied!
          </>
        ) : (
          <>
            <Share2 className="size-4" />
            Share my day rate calculation
          </>
        )}
      </Button>
    </div>
  )
}
