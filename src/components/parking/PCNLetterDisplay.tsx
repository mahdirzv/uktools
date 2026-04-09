"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { OfferCard } from "@/components/shared/OfferCard"
import { awinLink, PENDING_MERCHANTS } from "@/lib/awin"

interface PCNLetterDisplayProps {
  letter: string
}

export function PCNLetterDisplay({ letter }: PCNLetterDisplayProps) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    await navigator.clipboard.writeText(letter)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const insuranceUrl = awinLink(
    "PENDING_COMPARETHEMARKET",
    "https://www.comparethemarket.com/car-insurance/"
  )
  const isPending = PENDING_MERCHANTS.has("PENDING_COMPARETHEMARKET")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold">Your Appeal Letter</h2>
        <Button onClick={handleCopy} variant="outline" size="sm">
          {copied ? "Copied ✓" : "Copy letter"}
        </Button>
      </div>

      <div className="rounded-lg border bg-muted/30 p-6">
        <pre className="whitespace-pre-wrap font-mono text-sm leading-relaxed text-foreground">
          {letter}
        </pre>
      </div>

      <p className="text-sm text-muted-foreground">
        Copy this letter and send it to the address shown on your PCN. Keep a
        copy for your records. The informal challenge deadline is{" "}
        <strong>28 days from the date of issue</strong>.
      </p>

      <OfferCard
        title="While you're dealing with this — is your car insurance up for renewal?"
        description="Compare quotes and potentially save £300+"
        ctaLabel="Compare car insurance quotes"
        href={insuranceUrl}
        pending={isPending}
      />
    </div>
  )
}
