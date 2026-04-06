"use client"

import { useState, useEffect, useCallback } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"

const STORAGE_KEY = "uktools-moving-checklist"

interface ChecklistPhase {
  title: string
  items: string[]
}

const PHASES: ChecklistPhase[] = [
  {
    title: "8+ weeks before",
    items: [
      "Instruct a solicitor/conveyancer",
      "Get a survey booked",
      "Arrange mortgage in principle",
      "Start decluttering / booking storage if needed",
      "Research removal companies and get 3 quotes",
    ],
  },
  {
    title: "4–8 weeks before",
    items: [
      "Exchange contracts",
      "Confirm completion date with solicitor",
      "Book removal company",
      "Give notice to current landlord (if renting)",
      "Notify employer of address change",
      "Start packing non-essentials",
    ],
  },
  {
    title: "2–4 weeks before",
    items: [
      "Redirect Royal Mail post (royalmail.com/personal/receiving-mail/redirection)",
      "Notify bank, HMRC, DVLA, GP, dentist",
      "Contact utility providers at old address (electricity, gas, water, broadband)",
      "Set up utilities at new address",
      "Notify council tax (both councils)",
      "Update electoral register (gov.uk/register-to-vote)",
    ],
  },
  {
    title: "Moving week",
    items: [
      "Final meter readings at old property",
      "Take meter readings at new property",
      "Collect keys",
      "Check all rooms, note any issues",
      "Deep clean old property (if renting — protect deposit)",
    ],
  },
  {
    title: "After moving",
    items: [
      "Update address with all financial institutions",
      "Register with a new GP (if moved area)",
      "Check broadband is live",
      "Apply for council tax discount if applicable (25% single person)",
    ],
  },
]

function getItemId(phaseIndex: number, itemIndex: number): string {
  return `${phaseIndex}-${itemIndex}`
}

export function MovingChecklist() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setChecked(JSON.parse(stored))
    } catch {
      // ignore corrupted data
    }
  }, [])

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = { ...prev, [id]: !prev[id] }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {
        // storage full — state still works in-memory
      }
      return next
    })
  }, [])

  const totalItems = PHASES.reduce((sum, p) => sum + p.items.length, 0)
  const completedItems = Object.values(checked).filter(Boolean).length

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <span>{completedItems} of {totalItems} complete</span>
        {completedItems === totalItems && <span className="font-medium text-green-600">All done!</span>}
      </div>

      {PHASES.map((phase, pi) => (
        <div key={pi} className="space-y-3">
          <h3 className="text-sm font-medium text-muted-foreground">{phase.title}</h3>
          <div className="space-y-2">
            {phase.items.map((item, ii) => {
              const id = getItemId(pi, ii)
              const isChecked = !!checked[id]
              return (
                <div key={id} className="flex items-start gap-3">
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={() => toggle(id)}
                    id={id}
                    className="mt-0.5"
                  />
                  <Label
                    htmlFor={id}
                    className={isChecked ? "line-through text-muted-foreground" : ""}
                  >
                    {item}
                  </Label>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
