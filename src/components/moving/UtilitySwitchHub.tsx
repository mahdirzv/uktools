import { awinLink } from "@/lib/awin"
import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLinkIcon } from "lucide-react"

interface AffiliateCard {
  service: string
  description: string
  merchantId: string
  destination: string
  cta: string
  pending: boolean
}

const CARDS: AffiliateCard[] = [
  {
    service: "Energy (Uswitch)",
    description: "Compare gas & electricity tariffs and switch to save on your bills.",
    merchantId: "3655",
    destination: "https://www.uswitch.com/gas-electricity/",
    cta: "Compare energy deals",
    pending: false,
  },
  {
    service: "Broadband (Uswitch)",
    description: "Find the best broadband deals for your new home.",
    merchantId: "3655",
    destination: "https://www.uswitch.com/broadband/",
    cta: "Compare broadband",
    pending: false,
  },
  {
    service: "Home Insurance",
    description: "Get quotes from top home insurance providers in minutes.",
    merchantId: "PENDING_COMPARETHEMARKET",
    destination: "https://www.comparethemarket.com/home-insurance/",
    cta: "Get home insurance quotes",
    pending: true,
  },
  {
    service: "Mortgage Broker (L&C)",
    description: "Free, expert mortgage advice from London & Country.",
    merchantId: "PENDING_LC",
    destination: "https://www.landc.co.uk/",
    cta: "Free mortgage advice",
    pending: true,
  },
  {
    service: "Removals (AnyVan)",
    description: "Compare removal company quotes and book online.",
    merchantId: "PENDING_ANYVAN",
    destination: "https://www.anyvan.com/",
    cta: "Compare removal quotes",
    pending: true,
  },
]

export function UtilitySwitchHub() {
  return (
    <div className="grid gap-5 sm:gap-6">
      {CARDS.map((card) => (
        <Card
          key={card.service}
          className={
            card.pending
              ? "border-border/70 bg-muted/20"
              : "border-border/70 bg-card transition-colors duration-200 hover:border-primary/25 hover:bg-card/95"
          }
        >
          <CardHeader className="space-y-3">
            <div className="flex items-start justify-between gap-3">
              <CardTitle className="text-base font-semibold leading-snug sm:text-lg">
                {card.service}
              </CardTitle>
              {card.pending && <Badge variant="secondary">Coming soon</Badge>}
            </div>
            <CardDescription className="text-sm leading-relaxed text-muted-foreground">
              {card.description}
            </CardDescription>
          </CardHeader>

          <CardFooter className="pt-1">
            {card.pending ? (
              <Button variant="outline" disabled className="w-full justify-between">
                {card.cta}
                <ExternalLinkIcon className="size-4 opacity-60" />
              </Button>
            ) : (
              <Button
                className="w-full justify-between"
                render={
                  <a
                    href={awinLink(card.merchantId, card.destination)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {card.cta}
                <ExternalLinkIcon className="size-4" />
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
