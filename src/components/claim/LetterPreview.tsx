"use client"

import { Button } from "@/components/ui/button"
import { Check } from "lucide-react"

interface LetterPreviewProps {
  letter: string
  showFull: boolean
  onPayClick: () => void
}

export function LetterPreview({
  letter,
  showFull,
  onPayClick,
}: LetterPreviewProps) {
  if (showFull) {
    return (
      <div className="space-y-4">
        <h2 className="text-lg font-medium">Your claim letter</h2>
        <div className="rounded-lg border bg-card p-6">
          <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-card-foreground">
            {letter}
          </pre>
        </div>
        <p className="text-xs text-muted-foreground">
          Copy this letter and send it to your card provider. Replace the
          bracketed fields with your personal details.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-medium">Your letter is ready</h2>

      <div className="relative overflow-hidden rounded-lg border bg-card p-6">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-card-foreground select-none blur-[6px]">
          {letter}
        </pre>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-card/60 to-card" />
      </div>

      <div className="space-y-3 rounded-lg border bg-muted/50 p-4">
        <p className="text-sm font-medium">Your letter includes:</p>
        <ul className="space-y-2 text-sm text-muted-foreground">
          <li className="flex items-center gap-2">
            <Check className="size-4 text-foreground" />
            Section 75 legal basis
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 text-foreground" />
            Timeline and escalation path
          </li>
          <li className="flex items-center gap-2">
            <Check className="size-4 text-foreground" />
            FOS escalation instructions
          </li>
        </ul>
      </div>

      <div className="flex flex-col items-center gap-3">
        <p className="text-2xl font-semibold">£9.99</p>
        <Button size="lg" onClick={onPayClick} className="w-full max-w-xs">
          Download your claim pack
        </Button>
        <p className="text-xs text-muted-foreground">
          One-time payment. Instant download.
        </p>
      </div>
    </div>
  )
}
