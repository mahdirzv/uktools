import { awinLink } from "@/lib/awin"
import { OfferCard } from "@/components/shared/OfferCard"

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
        <OfferCard
          key={card.service}
          title={card.service}
          description={card.description}
          ctaLabel={card.cta}
          href={awinLink(card.merchantId, card.destination)}
          pending={card.pending}
          className={
            card.pending
              ? "bg-muted/20"
              : "transition-colors duration-200 hover:border-primary/25 hover:bg-card/95"
          }
        />
      ))}
    </div>
  )
}
