"use client"

import { useState, useEffect, useCallback } from "react"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

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

  const phaseProgress = PHASES.map((phase, phaseIndex) => {
    const completed = phase.items.reduce((sum, _, itemIndex) => {
      return sum + (checked[getItemId(phaseIndex, itemIndex)] ? 1 : 0)
    }, 0)

    return {
      title: phase.title,
      items: phase.items,
      completed,
      total: phase.items.length,
      percent: Math.round((completed / phase.items.length) * 100),
      status:
        completed === 0
          ? "not-started"
          : completed === phase.items.length
            ? "complete"
            : "in-progress",
    }
  })

  const totalItems = phaseProgress.reduce((sum, phase) => sum + phase.total, 0)
  const completedItems = phaseProgress.reduce((sum, phase) => sum + phase.completed, 0)
  const overallPercent = totalItems > 0 ? Math.round((completedItems / totalItems) * 100) : 0

  const currentPhaseIndex = phaseProgress.findIndex((phase) => phase.completed < phase.total)

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="space-y-2">
          <CardTitle className="text-base">Progress</CardTitle>
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <span>
              {completedItems} of {totalItems} complete
            </span>
            {completedItems === totalItems ? (
              <span className="font-medium text-green-600">All done!</span>
            ) : (
              <span>{overallPercent}%</span>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-2 w-full rounded-full bg-muted">
            <div
              className="h-2 rounded-full bg-primary transition-all"
              style={{ width: `${overallPercent}%` }}
            />
          </div>
        </CardContent>
      </Card>

      {phaseProgress.map((phase, pi) => {
        const isCurrentPhase = currentPhaseIndex === pi

        return (
          <Card
            key={phase.title}
            className={
              phase.status === "complete"
                ? "border-green-200 bg-green-50/40"
                : isCurrentPhase
                  ? "border-primary/40"
                  : "border-border/70"
            }
          >
            <CardHeader className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <CardTitle className="text-base">{phase.title}</CardTitle>
                <div className="flex items-center gap-2">
                  {isCurrentPhase && phase.status !== "complete" && <Badge>Up next</Badge>}
                  {phase.status === "complete" && <Badge variant="secondary">Phase complete</Badge>}
                  <Badge variant="outline">
                    {phase.completed}/{phase.total}
                  </Badge>
                </div>
              </div>

              <div className="h-1.5 w-full rounded-full bg-muted">
                <div
                  className={phase.status === "complete" ? "h-1.5 rounded-full bg-green-600" : "h-1.5 rounded-full bg-primary"}
                  style={{ width: `${phase.percent}%` }}
                />
              </div>
            </CardHeader>

            <CardContent className="space-y-2">
              {phase.items.map((item, ii) => {
                const id = getItemId(pi, ii)
                const isChecked = !!checked[id]

                return (
                  <div key={id} className="flex items-start gap-3 rounded-md px-1 py-1">
                    <Checkbox
                      checked={isChecked}
                      onCheckedChange={() => toggle(id)}
                      id={id}
                      className="mt-0.5"
                    />
                    <Label
                      htmlFor={id}
                      className={isChecked ? "cursor-pointer text-muted-foreground line-through" : "cursor-pointer"}
                    >
                      {item}
                    </Label>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
