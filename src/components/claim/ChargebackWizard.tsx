"use client"

import { useState } from "react"
import { ClaimWizard } from "@/components/claim/ClaimWizard"
import { LetterDisplay } from "@/components/claim/LetterDisplay"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  generateChargebackLetter,
  REASON_LABELS,
  type ChargebackFormData,
  type ClaimReason,
  type CardProvider,
} from "@/lib/claim-generator"

const STEPS = ["What happened?", "Payment details", "Preview"]

const CARD_PROVIDERS: CardProvider[] = [
  "Barclays",
  "HSBC",
  "Lloyds",
  "NatWest",
  "Santander",
  "Halifax",
  "Nationwide",
  "American Express",
  "Monzo",
  "Starling",
  "Other",
]

const REASON_OPTIONS: { value: ClaimReason; label: string }[] = [
  { value: "not-delivered", label: REASON_LABELS["not-delivered"] },
  { value: "administration", label: REASON_LABELS["administration"] },
  { value: "not-as-described", label: REASON_LABELS["not-as-described"] },
  { value: "faulty-refused", label: REASON_LABELS["faulty-refused"] },
  { value: "service-not-completed", label: REASON_LABELS["service-not-completed"] },
]

function ChargebackWizardInner() {
  const [step, setStep] = useState(0)
  const [form, setForm] = useState<ChargebackFormData>({
    reason: "not-delivered",
    cardType: "debit",
    cardNetwork: "",
    amount: "",
    paymentDate: "",
    merchantName: "",
    cardProvider: "",
  })

  function update<K extends keyof ChargebackFormData>(
    key: K,
    value: ChargebackFormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1)
  }

  function back() {
    if (step > 0) setStep(step - 1)
  }

  const letter = generateChargebackLetter(form)

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-2xl font-semibold">Chargeback Claim</h1>

      <ClaimWizard steps={STEPS} currentStep={step} onBack={back}>
        {step === 0 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-4 text-sm font-medium">What happened?</legend>
              <RadioGroup
                value={form.reason}
                onValueChange={(val) => update("reason", val as ClaimReason)}
              >
                {REASON_OPTIONS.map((opt) => (
                  <div key={opt.value} className="flex items-center gap-3">
                    <RadioGroupItem value={opt.value} id={opt.value} />
                    <Label htmlFor={opt.value} className="font-normal">
                      {opt.label}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </fieldset>
            <Button onClick={next}>Continue</Button>
          </div>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <fieldset>
              <legend className="mb-4 text-sm font-medium">Card type</legend>
              <RadioGroup
                value={form.cardType}
                onValueChange={(val) =>
                  update("cardType", val as "debit" | "credit")
                }
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="debit" id="debit" />
                  <Label htmlFor="debit" className="font-normal">
                    Debit card
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="font-normal">
                    Credit card (under £100)
                  </Label>
                </div>
              </RadioGroup>
            </fieldset>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Card network</Label>
                <Select
                  value={form.cardNetwork}
                  onValueChange={(val) =>
                    update("cardNetwork", val as "Visa" | "Mastercard")
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select card network" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Visa">Visa</SelectItem>
                    <SelectItem value="Mastercard">Mastercard</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="amount">Amount (£)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  placeholder="e.g. 49.99"
                  value={form.amount}
                  onChange={(e) => update("amount", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="paymentDate">Date of payment</Label>
                <Input
                  id="paymentDate"
                  type="date"
                  value={form.paymentDate}
                  onChange={(e) => update("paymentDate", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="merchant">Merchant name</Label>
                <Input
                  id="merchant"
                  placeholder="e.g. Acme Travel Ltd"
                  value={form.merchantName}
                  onChange={(e) => update("merchantName", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Card provider</Label>
                <Select
                  value={form.cardProvider}
                  onValueChange={(val) =>
                    update("cardProvider", val as CardProvider)
                  }
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select your card provider" />
                  </SelectTrigger>
                  <SelectContent>
                    {CARD_PROVIDERS.map((p) => (
                      <SelectItem key={p} value={p}>
                        {p}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={next}>Preview letter</Button>
          </div>
        )}

        {step === 2 && (
          <LetterDisplay letter={letter} />
        )}
      </ClaimWizard>

      <footer className="mt-16 border-t pt-6 text-center text-xs text-muted-foreground">
        This tool provides general legal information, not legal advice. It does
        not constitute a legal advice relationship. For complex disputes,
        consult a solicitor.
      </footer>
    </div>
  )
}

import { Suspense } from "react"

export function ChargebackWizard() {
  return (
    <Suspense>
      <ChargebackWizardInner />
    </Suspense>
  )
}
