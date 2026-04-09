"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { PrivateParkingInfo } from "./PrivateParkingInfo"
import { PCNLetterDisplay } from "./PCNLetterDisplay"
import {
  GROUND_LABELS,
  GroundKey,
  LetterData,
  generateAppealLetter,
} from "@/lib/parking-letter"

const PCN_AMOUNTS = ["£60", "£80", "£130", "Other"]
const ALL_GROUNDS = Object.keys(GROUND_LABELS) as GroundKey[]

type PCNType = "on-street" | "council-car-park" | "private"

interface Step1Data {
  pcnRef: string
  dateOfIssue: string
  registration: string
  council: string
  amount: string
  amountOther: string
}

export function ParkingWizard() {
  const [step, setStep] = useState(1)
  const [step1, setStep1] = useState<Step1Data>({
    pcnRef: "",
    dateOfIssue: "",
    registration: "",
    council: "",
    amount: "£60",
    amountOther: "",
  })
  const [pcnType, setPcnType] = useState<PCNType | "">("")
  const [grounds, setGrounds] = useState<Set<GroundKey>>(new Set())
  const [otherReason, setOtherReason] = useState("")
  const [description, setDescription] = useState("")
  const [letter, setLetter] = useState("")

  function toggleGround(key: GroundKey) {
    setGrounds((prev) => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  function handleStep1Next() {
    if (
      !step1.pcnRef.trim() ||
      !step1.dateOfIssue ||
      !step1.registration.trim() ||
      !step1.council.trim()
    )
      return
    setStep(2)
  }

  function handleStep2Next() {
    if (!pcnType) return
    if (pcnType === "private") {
      setStep(2)
      return
    }
    setStep(3)
  }

  function handleStep3Next() {
    if (grounds.size === 0) return
    setStep(4)
  }

  function handleGenerate() {
    const data: LetterData = {
      pcnRef: step1.pcnRef.trim(),
      dateOfIssue: step1.dateOfIssue,
      registration: step1.registration.trim().toUpperCase(),
      council: step1.council.trim(),
      grounds: Array.from(grounds),
      otherReason,
      description,
    }
    const generated = generateAppealLetter(data)
    setLetter(generated)
    setStep(5)
  }

  if (step === 5 && letter) {
    return (
      <div className="mt-8">
        <PCNLetterDisplay letter={letter} />
      </div>
    )
  }

  return (
    <div className="mt-8 space-y-6">
      <div className="rounded-xl border bg-card p-3 ring-1 ring-foreground/10">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          {[1, 2, 3, 4].map((s) => (
            <span
              key={s}
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${
                step === s
                  ? "bg-foreground text-background"
                  : step > s
                    ? "bg-muted text-muted-foreground line-through"
                    : "border text-muted-foreground"
              }`}
            >
              {s}
            </span>
          ))}
        </div>
      </div>

      {step === 1 && (
        <div className="space-y-4 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">Step 1 — PCN details</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label htmlFor="pcnRef">PCN reference number</Label>
              <Input
                id="pcnRef"
                value={step1.pcnRef}
                onChange={(e) =>
                  setStep1((p) => ({ ...p, pcnRef: e.target.value }))
                }
                placeholder="e.g. LN12345678"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="dateOfIssue">Date of issue</Label>
              <Input
                id="dateOfIssue"
                type="date"
                value={step1.dateOfIssue}
                onChange={(e) =>
                  setStep1((p) => ({ ...p, dateOfIssue: e.target.value }))
                }
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="registration">Vehicle registration</Label>
              <Input
                id="registration"
                value={step1.registration}
                onChange={(e) =>
                  setStep1((p) => ({ ...p, registration: e.target.value }))
                }
                placeholder="e.g. AB12 CDE"
                className="uppercase"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="council">Council / issuing authority</Label>
              <Input
                id="council"
                value={step1.council}
                onChange={(e) =>
                  setStep1((p) => ({ ...p, council: e.target.value }))
                }
                placeholder="e.g. London Borough of Camden"
              />
            </div>
          </div>
          <div className="space-y-1.5">
            <Label>Fine amount</Label>
            <div className="flex flex-wrap gap-2">
              {PCN_AMOUNTS.map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => setStep1((p) => ({ ...p, amount: amt }))}
                  className={`rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ${
                    step1.amount === amt
                      ? "border-foreground bg-foreground text-background"
                      : "border-border hover:border-foreground/40"
                  }`}
                >
                  {amt}
                </button>
              ))}
            </div>
            {step1.amount === "Other" && (
              <Input
                className="mt-2 max-w-[120px]"
                placeholder="e.g. £100"
                value={step1.amountOther}
                onChange={(e) =>
                  setStep1((p) => ({ ...p, amountOther: e.target.value }))
                }
              />
            )}
          </div>
          <Button
            onClick={handleStep1Next}
            disabled={
              !step1.pcnRef.trim() ||
              !step1.dateOfIssue ||
              !step1.registration.trim() ||
              !step1.council.trim()
            }
          >
            Next →
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="space-y-4 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">Step 2 — What type of PCN?</h2>
          <div className="space-y-3">
            {[
              {
                value: "on-street" as PCNType,
                label: "On-street",
                desc: "Issued by a council civil enforcement officer",
              },
              {
                value: "council-car-park" as PCNType,
                label: "Council car park",
                desc: "Council-operated car park",
              },
              {
                value: "private" as PCNType,
                label: "Private car park",
                desc: "ANPR / private company (ParkingEye, UKPC, etc.)",
              },
            ].map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setPcnType(opt.value)}
                className={`w-full rounded-lg border p-4 text-left transition-colors ${
                  pcnType === opt.value
                    ? "border-foreground bg-accent"
                    : "hover:border-foreground/40"
                }`}
              >
                <div className="font-medium">{opt.label}</div>
                <div className="text-sm text-muted-foreground">{opt.desc}</div>
              </button>
            ))}
          </div>

          {pcnType === "private" && (
            <div className="mt-4">
              <PrivateParkingInfo />
            </div>
          )}

          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(1)}>
              ← Back
            </Button>
            {pcnType && pcnType !== "private" && (
              <Button onClick={handleStep2Next}>Next →</Button>
            )}
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="space-y-4 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">Step 3 — Grounds for appeal</h2>
          <p className="text-sm text-muted-foreground">
            Select all that apply. Each will generate a paragraph in your
            letter.
          </p>
          <div className="space-y-3">
            {ALL_GROUNDS.map((key) => (
              <div key={key} className="flex items-start gap-3">
                <Checkbox
                  id={key}
                  checked={grounds.has(key)}
                  onCheckedChange={() => toggleGround(key)}
                  className="mt-0.5"
                />
                <Label htmlFor={key} className="cursor-pointer leading-snug">
                  {GROUND_LABELS[key]}
                </Label>
              </div>
            ))}
          </div>
          {grounds.has("OTHER") && (
            <div className="space-y-1.5">
              <Label htmlFor="otherReason">Describe your other reason</Label>
              <Textarea
                id="otherReason"
                value={otherReason}
                onChange={(e) => setOtherReason(e.target.value)}
                placeholder="Describe the reason..."
                rows={3}
              />
            </div>
          )}
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(2)}>
              ← Back
            </Button>
            <Button onClick={handleStep3Next} disabled={grounds.size === 0}>
              Next →
            </Button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="space-y-4 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">Step 4 — What happened?</h2>
          <p className="text-sm text-muted-foreground">
            Briefly describe what happened in your own words. This will appear
            in your letter.
          </p>
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="e.g. I paid the meter at 14:32 but the receipt shows the wrong time. I have the receipt as evidence."
            rows={5}
          />
          <div className="flex gap-3">
            <Button variant="outline" onClick={() => setStep(3)}>
              ← Back
            </Button>
            <Button onClick={handleGenerate}>Generate letter →</Button>
          </div>
        </div>
      )}
    </div>
  )
}
