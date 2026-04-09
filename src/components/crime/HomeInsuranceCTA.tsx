import { OfferCard } from "@/components/shared/OfferCard"

export function HomeInsuranceCTA() {
  return (
    <OfferCard
      title="Protect your home"
      description="Get home insurance quotes from top UK providers and compare prices in minutes."
      ctaLabel="Get home insurance quotes"
      pending
      className="border-primary/20 bg-primary/[0.02]"
    />
  )
}