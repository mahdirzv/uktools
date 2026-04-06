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
    <div className="grid gap-4">
      {CARDS.map((card) => (
        <Card key={card.service} className={card.pending ? "opacity-60" : ""}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <CardTitle>{card.service}</CardTitle>
              {card.pending && <Badge variant="secondary">Coming soon</Badge>}
            </div>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardFooter>
            {card.pending ? (
              <Button variant="outline" disabled>
                {card.cta}
              </Button>
            ) : (
              <Button
                render={
                  <a
                    href={awinLink(card.merchantId, card.destination)}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
              >
                {card.cta}
                <ExternalLinkIcon />
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}
