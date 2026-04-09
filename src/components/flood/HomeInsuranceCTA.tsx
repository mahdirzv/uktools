import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export function HomeInsuranceCTA() {
  return (
    <div className="rounded-xl border border-primary/20 bg-primary/[0.02] p-5 opacity-70">
      <div className="flex items-center gap-2">
        <h3 className="font-semibold">Protect your home</h3>
        <Badge variant="secondary">Coming soon</Badge>
      </div>
      <p className="mt-1 text-sm text-muted-foreground">
        Compare home insurance quotes — protect against flood and other risks.
      </p>
      <div className="mt-3">
        <Button variant="outline" disabled>
          Compare home insurance quotes
        </Button>
      </div>
    </div>
  )
}
