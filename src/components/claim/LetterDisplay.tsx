"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Check, Copy } from "lucide-react"

interface LetterDisplayProps {
  letter: string
}

export function LetterDisplay({ letter }: LetterDisplayProps) {
  const [copied, setCopied] = useState(false)

  function handleCopy() {
    navigator.clipboard.writeText(letter).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Your claim letter</h2>
      <div className="rounded-lg border bg-card p-6">
        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed text-card-foreground">
          {letter}
        </pre>
      </div>
      <div className="flex items-center gap-3">
        <Button variant="outline" onClick={handleCopy} className="gap-2">
          {copied ? (
            <>
              <Check className="size-4" />
              Copied
            </>
          ) : (
            <>
              <Copy className="size-4" />
              Copy letter
            </>
          )}
        </Button>
        <p className="text-xs text-muted-foreground">
          Copy this letter and send it to your card provider. Replace the
          bracketed fields with your personal details.
        </p>
      </div>
    </div>
  )
}
