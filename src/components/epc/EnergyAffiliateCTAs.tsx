import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { awinLink, PENDING_MERCHANTS } from "@/lib/awin"

export function EnergyAffiliateCTAs() {
  const uswitchUrl = awinLink("3655", "https://www.uswitch.com/gas-electricity/")
  const boxtUrl = awinLink("PENDING_BOXT", "https://www.boxt.co.uk/")
  const boxtPending = PENDING_MERCHANTS.has("PENDING_BOXT")

  return (
    <div className="space-y-3">
      <h3 className="font-semibold">Reduce your bills</h3>

      <div className="rounded-xl border p-5">
        <p className="font-medium">Compare energy tariffs</p>
        <p className="mt-1 text-sm text-muted-foreground">
          Could save £300+/year on gas and electricity.
        </p>
        <div className="mt-3">
          <Button
            render={
              <a href={uswitchUrl} target="_blank" rel="noopener noreferrer" />
            }
          >
            Compare via Uswitch →
          </Button>
        </div>
      </div>

      <div className={`rounded-xl border p-5 ${boxtPending ? "opacity-60" : ""}`}>
        <div className="flex items-center gap-2">
          <p className="font-medium">Get a new boiler quote</p>
          {boxtPending && <Badge variant="secondary">Coming soon</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
          From £1,799 installed. Could cut your heating costs significantly.
        </p>
        <div className="mt-3">
          <Button
            variant="outline"
            disabled={boxtPending}
            render={
              boxtPending ? undefined : (
                <a href={boxtUrl} target="_blank" rel="noopener noreferrer" />
              )
            }
          >
            Get boiler quote
          </Button>
        </div>
      </div>
    </div>
  )
}
