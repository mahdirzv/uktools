import { OfferCard } from "@/components/shared/OfferCard"

export function HomeInsuranceCTA() {
  return (
    <OfferCard
      title="Protect your home"
      description="Compare home insurance quotes — protect against flood and other risks."
      ctaLabel="Compare home insurance quotes"
      pending
      className="border-primary/20 bg-primary/[0.02]"
    />
  )
}