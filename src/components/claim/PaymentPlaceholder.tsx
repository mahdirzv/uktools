"use client"

import { Button } from "@/components/ui/button"

interface PaymentPlaceholderProps {
  onSuccess: () => void
}

export function PaymentPlaceholder({ onSuccess }: PaymentPlaceholderProps) {
  {/* TODO: Wire Stripe or LemonSqueezy payment. On success, reveal <LetterDownload letter={generatedLetter} /> */}
  return (
    <div className="flex flex-col items-center gap-4 rounded-lg border border-dashed p-6 text-center">
      <p className="text-sm text-muted-foreground">
        Payment integration coming soon
      </p>
      <p className="text-2xl font-semibold">£9.99</p>
      <Button disabled size="lg" className="w-full max-w-xs">
        Pay £9.99
      </Button>
      <p className="text-xs text-muted-foreground">
        Stripe / LemonSqueezy — TODO
      </p>
      {/* Dev bypass: triggered via ?preview=1 in the parent page */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onSuccess}
        className="text-xs text-muted-foreground"
      >
        (Dev: bypass payment)
      </Button>
    </div>
  )
}
