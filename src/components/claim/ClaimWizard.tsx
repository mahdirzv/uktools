"use client"

import * as React from "react"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from "lucide-react"

interface ClaimWizardProps {
  steps: string[]
  currentStep: number
  onBack: () => void
  children: React.ReactNode
}

export function ClaimWizard({
  steps,
  currentStep,
  onBack,
  children,
}: ClaimWizardProps) {
  const progressValue = ((currentStep + 1) / steps.length) * 100

  return (
    <div className="mx-auto w-full max-w-2xl">
      <div className="mb-8">
        <div className="mb-3 flex items-center justify-between text-sm text-muted-foreground">
          <span>
            Step {currentStep + 1} of {steps.length}
          </span>
          <span>{steps[currentStep]}</span>
        </div>
        <Progress value={progressValue} />
      </div>

      {currentStep > 0 && (
        <Button
          variant="ghost"
          size="sm"
          onClick={onBack}
          className="mb-4"
        >
          <ChevronLeft data-icon="inline-start" />
          Back
        </Button>
      )}

      {children}
    </div>
  )
}
