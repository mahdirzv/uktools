import { awinLink } from "@/lib/awin"
import { OfferCard } from "@/components/shared/OfferCard"

export function BroadbandAffiliate() {
  const url = awinLink("3655", "https://www.uswitch.com/broadband/")

  return (
    <OfferCard
      title="Switching broadband could save you £200+/year"
      description="We noticed you're paying for a broadband provider. Compare deals to see if you could save."
      ctaLabel="Compare broadband deals →"
      href={url}
      buttonVariant="default"
      buttonClassName="sm:w-auto"
      className="border-primary/25 bg-primary/[0.03]"
    />
  )
}
