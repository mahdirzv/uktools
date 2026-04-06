"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Lock } from "lucide-react"
import { useSearchParams } from "next/navigation"

interface PaymentPlaceholderProps {
  price: string
  title: string
  description: string
  ctaLabel: string
}

export function PaymentPlaceholder({
  price,
  title,
  description,
  ctaLabel,
}: PaymentPlaceholderProps) {
  const searchParams = useSearchParams()
  const isPreview = searchParams.get("preview") === "1"

  if (isPreview) {
    return (
      <Card className="border-green-200 bg-green-50">
        <CardHeader>
          <CardTitle className="text-green-800">Preview Mode</CardTitle>
          <CardDescription className="text-green-700">
            This content would be unlocked after payment.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-green-700">
            Payment flow is not yet implemented. This preview shows what the
            user would receive.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <Button size="lg" className="w-full gap-2">
          <Lock className="size-4" />
          {ctaLabel} — {price}
        </Button>
        <p className="text-xs text-muted-foreground text-center">
          One-time payment. No subscription. Instant download.
        </p>
      </CardContent>
    </Card>
  )
}
