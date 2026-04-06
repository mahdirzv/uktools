"use client"

import { useState } from "react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { IR35Result } from "./IR35Result"
import {
  calculateIR35,
  isComplete,
  type IR35Answers,
  type SubstitutionAnswer,
  type ControlAnswer,
  type MutualityAnswer,
  type BinaryAnswer,
} from "@/lib/ir35-scorer"

export function IR35Wizard() {
  const [answers, setAnswers] = useState<IR35Answers>({})
  const [showResult, setShowResult] = useState(false)

  function set<K extends keyof IR35Answers>(key: K, value: IR35Answers[K]) {
    setAnswers((prev) => ({ ...prev, [key]: value }))
    setShowResult(false)
  }

  const result = isComplete(answers) ? calculateIR35(answers) : null

  return (
    <div className="flex flex-col gap-8">
      <Section
        number={1}
        title="Substitution"
        description="Can you send a substitute to do your work instead of you?"
      >
        <RadioGroup
          value={answers.substitution ?? ""}
          onValueChange={(v) => set("substitution", v as SubstitutionAnswer)}
        >
          <RadioOption
            value="unrestricted"
            label="Yes, I have an unrestricted right to send a substitute"
          />
          <RadioOption
            value="client-approval"
            label="Yes, but client approval is needed"
          />
          <RadioOption
            value="personal"
            label="No, I must personally do all the work"
          />
        </RadioGroup>
      </Section>

      <Section
        number={2}
        title="Control"
        description="Who decides HOW you do your work?"
      >
        <RadioGroup
          value={answers.control ?? ""}
          onValueChange={(v) => set("control", v as ControlAnswer)}
        >
          <RadioOption
            value="full-control"
            label="I decide entirely how the work is done"
          />
          <RadioOption
            value="partial"
            label="The client sets process and hours but I control method"
          />
          <RadioOption
            value="client-control"
            label="The client controls my hours, location, and how I work"
          />
        </RadioGroup>
      </Section>

      <Section
        number={3}
        title="Mutuality of Obligation"
        description="Is there an ongoing obligation for the client to offer work and for you to accept it?"
      >
        <RadioGroup
          value={answers.mutuality ?? ""}
          onValueChange={(v) => set("mutuality", v as MutualityAnswer)}
        >
          <RadioOption
            value="discrete"
            label="No — each project is discrete, no obligation either way"
          />
          <RadioOption
            value="expectation"
            label="There's an expectation of ongoing work but no contract to that effect"
          />
          <RadioOption
            value="ongoing"
            label="There's an ongoing obligation / I'm on a rolling contract"
          />
        </RadioGroup>
      </Section>

      <Section
        number={4}
        title="Other factors"
        description="These additional factors help determine your status."
      >
        <div className="flex flex-col gap-6">
          <BinaryQuestion
            label="Do you use your own equipment?"
            value={answers.ownEquipment}
            onChange={(v) => set("ownEquipment", v)}
            yesLabel="Yes, my own equipment"
            noLabel="No, client provides equipment"
          />
          <BinaryQuestion
            label="Do you bear financial risk?"
            value={answers.financialRisk}
            onChange={(v) => set("financialRisk", v)}
            yesLabel="Yes, I bear financial risk"
            noLabel="No financial risk"
          />
          <BinaryQuestion
            label="Are you integrated into the client's organisation (staff meetings, org chart, email)?"
            value={answers.integrated}
            onChange={(v) => set("integrated", v)}
            yesLabel="Yes, I'm integrated"
            noLabel="No, I'm not integrated"
            inverted
          />
          <BinaryQuestion
            label="Do you have multiple clients simultaneously?"
            value={answers.multipleClients}
            onChange={(v) => set("multipleClients", v)}
            yesLabel="Yes, multiple clients"
            noLabel="Exclusively one client"
          />
        </div>
      </Section>

      {isComplete(answers) && !showResult && (
        <Button size="lg" onClick={() => setShowResult(true)} className="w-full">
          See my IR35 result
        </Button>
      )}

      {showResult && result && <IR35Result result={result} />}
    </div>
  )
}

function Section({
  number,
  title,
  description,
  children,
}: {
  number: number
  title: string
  description: string
  children: React.ReactNode
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h3 className="text-sm font-medium">
          Section {number}: {title}
        </h3>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      {children}
    </div>
  )
}

function RadioOption({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex items-start gap-2">
      <RadioGroupItem value={value} className="mt-0.5" />
      <Label className="font-normal leading-snug">{label}</Label>
    </div>
  )
}

function BinaryQuestion({
  label,
  value,
  onChange,
  yesLabel,
  noLabel,
  inverted,
}: {
  label: string
  value?: BinaryAnswer
  onChange: (v: BinaryAnswer) => void
  yesLabel: string
  noLabel: string
  inverted?: boolean
}) {
  const yesValue: BinaryAnswer = inverted ? "inside" : "outside"
  const noValue: BinaryAnswer = inverted ? "outside" : "inside"

  return (
    <div className="flex flex-col gap-2">
      <p className="text-sm font-medium">{label}</p>
      <RadioGroup
        value={value ?? ""}
        onValueChange={(v) => onChange(v as BinaryAnswer)}
        className="flex gap-4"
      >
        <div className="flex items-center gap-2">
          <RadioGroupItem value={yesValue} />
          <Label className="font-normal">{yesLabel}</Label>
        </div>
        <div className="flex items-center gap-2">
          <RadioGroupItem value={noValue} />
          <Label className="font-normal">{noLabel}</Label>
        </div>
      </RadioGroup>
    </div>
  )
}
