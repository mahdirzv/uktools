"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ClaimWizard } from "@/components/claim/ClaimWizard"
import { LetterDisplay } from "@/components/claim/LetterDisplay"
import { FOSEscalationPaywall } from "@/components/claim/FOSEscalationPaywall"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  generateSection75Letter,
  REASON_LABELS,
  type Section75FormData,
  type ClaimReason,
  type CardProvider,
  type MerchantContactStatus,
} from "@/lib/claim-generator"

const STEPS = ["What happened?", "Payment details", "Merchant details", "Your letter"]

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

function S75WizardInner() {
  const router = useRouter()

  const [step, setStep] = useState(0)
  const [amountTouched, setAmountTouched] = useState(false)
  const [form, setForm] = useState<Section75FormData>({
    reason: "not-delivered",
    paymentMethod: "credit",
    amount: "",
    paymentDate: "",
    cardProvider: "",
    merchantName: "",
    purchaseDescription: "",
    merchantContacted: "no",
  })

  function update<K extends keyof Section75FormData>(
    key: K,
    value: Section75FormData[K]
  ) {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  function next() {
    if (step < STEPS.length - 1) setStep(step + 1)
  }

  function back() {
    if (step > 0) setStep(step - 1)
  }

  const letter = generateSection75Letter(form)

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="mb-8 text-2xl font-semibold">Section 75 Claim</h1>

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
              <legend className="mb-4 text-sm font-medium">How did you pay?</legend>
              <RadioGroup
                value={form.paymentMethod}
                onValueChange={(val) => {
                  if (val === "debit-or-under-100") {
                    router.push("/claim/chargeback")
                    return
                  }
                  update("paymentMethod", val as "credit" | "debit-or-under-100")
                }}
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="credit" id="credit" />
                  <Label htmlFor="credit" className="font-normal">
                    Credit card (Section 75)
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="debit-or-under-100" id="debit" />
                  <Label htmlFor="debit" className="font-normal">
                    Debit card or credit card under £100 → Chargeback
                  </Label>
                </div>
              </RadioGroup>
            </fieldset>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="amount">Amount paid (£)</Label>
                <Input
                  id="amount"
                  type="number"
                  min="0"
                  placeholder="e.g. 500"
                  value={form.amount}
                  onChange={(e) => {
                    update("amount", e.target.value)
                    if (!amountTouched) setAmountTouched(true)
                  }}
                  onBlur={() => setAmountTouched(true)}
                />
                {amountTouched && form.amount !== "" && Number(form.amount) <= 0 && (
                  <div className="rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                    Please enter the amount you paid.
                  </div>
                )}
                {amountTouched && Number(form.amount) > 0 && Number(form.amount) < 100 && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    <p>
                      Section 75 requires a minimum purchase of £100.
                      For purchases under £100, use the Chargeback route instead.
                    </p>
                    <Link
                      href="/claim/chargeback"
                      className="mt-2 inline-block font-medium underline underline-offset-2"
                    >
                      Switch to chargeback →
                    </Link>
                  </div>
                )}
                {amountTouched && Number(form.amount) > 30000 && (
                  <div className="rounded-md border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
                    Section 75 covers purchases up to £30,000.
                    For larger amounts, the claim process is the same but you may want
                    legal advice — a solicitor can advise on the strongest approach.
                  </div>
                )}
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
                <Label>Card provider</Label>
                <Select
                  value={form.cardProvider}
                  onValueChange={(val) => update("cardProvider", val as CardProvider)}
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

            <Button onClick={next}>Continue</Button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="merchantName">Merchant / company name</Label>
              <Input
                id="merchantName"
                placeholder="e.g. Acme Travel Ltd"
                value={form.merchantName}
                onChange={(e) => update("merchantName", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Brief description of what was purchased
              </Label>
              <Textarea
                id="description"
                placeholder="e.g. Return flights to Paris for 2 people, departing 15 March 2025"
                value={form.purchaseDescription}
                onChange={(e) => update("purchaseDescription", e.target.value)}
              />
            </div>

            <fieldset>
              <legend className="mb-4 text-sm font-medium">
                Have you already contacted the merchant?
              </legend>
              <RadioGroup
                value={form.merchantContacted}
                onValueChange={(val) =>
                  update("merchantContacted", val as MerchantContactStatus)
                }
              >
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="no" id="contact-no" />
                  <Label htmlFor="contact-no" className="font-normal">
                    No
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="yes" id="contact-yes" />
                  <Label htmlFor="contact-yes" className="font-normal">
                    Yes
                  </Label>
                </div>
                <div className="flex items-center gap-3">
                  <RadioGroupItem value="yes-refused" id="contact-refused" />
                  <Label htmlFor="contact-refused" className="font-normal">
                    Yes, and they refused
                  </Label>
                </div>
              </RadioGroup>
            </fieldset>

            <Button onClick={next}>Preview letter</Button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-0">
            <LetterDisplay letter={letter} />
            <FOSEscalationPaywall formData={form} />
          </div>
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

export function S75Wizard() {
  return (
    <Suspense>
      <S75WizardInner />
    </Suspense>
  )
}
