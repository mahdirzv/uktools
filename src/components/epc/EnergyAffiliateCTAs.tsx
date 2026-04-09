import { awinLink, PENDING_MERCHANTS } from "@/lib/awin"
import { OfferCard } from "@/components/shared/OfferCard"

export function EnergyAffiliateCTAs() {
  const uswitchUrl = awinLink("3655", "https://www.uswitch.com/gas-electricity/")
  const boxtUrl = awinLink("PENDING_BOXT", "https://www.boxt.co.uk/")
  const boxtPending = PENDING_MERCHANTS.has("PENDING_BOXT")

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Reduce your bills</h3>

      <OfferCard
        title="Compare energy tariffs"
        description="Could save £300+/year on gas and electricity."
        ctaLabel="Compare via Uswitch →"
        href={uswitchUrl}
      />

      <OfferCard
        title="Get a new boiler quote"
        description="From £1,799 installed. Could cut your heating costs significantly."
        ctaLabel="Get boiler quote"
        href={boxtUrl}
        pending={boxtPending}
      />
    </div>
  )
}
