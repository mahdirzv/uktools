import type { ReactNode } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { cn } from "@/lib/utils"

interface OfferCardProps {
  title: string
  description: string
  ctaLabel: string
  href?: string
  icon?: ReactNode
  pending?: boolean
  badgeText?: string
  className?: string
  buttonVariant?: "default" | "outline"
  buttonClassName?: string
  disclosure?: string
  minHeightClassName?: string
}

export function OfferCard({
  title,
  description,
  ctaLabel,
  href,
  icon,
  pending = false,
  badgeText = "Coming soon",
  className,
  buttonVariant = "outline",
  buttonClassName,
  disclosure,
  minHeightClassName,
}: OfferCardProps) {
  return (
    <Card
      className={cn(
        "flex flex-col border-border/70",
        pending && "opacity-70",
        minHeightClassName,
        className
      )}
    >
      <CardHeader className="flex-1 space-y-2">
        <div className="flex items-center gap-2">
          {icon}
          <CardTitle className="text-base">{title}</CardTitle>
          {pending && <Badge variant="secondary">{badgeText}</Badge>}
        </div>
        <CardDescription className="leading-relaxed">{description}</CardDescription>
      </CardHeader>

      <CardContent className="mt-auto space-y-2 pt-1">
        <Button
          variant={buttonVariant}
          disabled={pending || !href}
          className={cn("w-full justify-between", buttonClassName)}
          render={
            pending || !href ? undefined : (
              <a href={href} target="_blank" rel="noopener noreferrer sponsored" />
            )
          }
        >
          {ctaLabel}
        </Button>
        {disclosure && <p className="text-[10px] text-muted-foreground">{disclosure}</p>}
      </CardContent>
    </Card>
  )
}
