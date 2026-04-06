import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export function HomeInsuranceCTA() {
  return (
    <Card className="opacity-60">
      <CardHeader>
        <div className="flex items-center gap-2">
          <CardTitle>Protect your home</CardTitle>
          <Badge variant="secondary">Coming soon</Badge>
        </div>
        <CardDescription>
          Get home insurance quotes from top UK providers and compare prices in minutes.
        </CardDescription>
      </CardHeader>
      <CardFooter>
        <Button variant="outline" disabled>
          Get home insurance quotes
        </Button>
      </CardFooter>
    </Card>
  )
}
