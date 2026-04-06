import { awinLink } from "@/lib/awin"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export function BroadbandAffiliate() {
  const url = awinLink("3655", "https://www.uswitch.com/broadband/")

  return (
    <Card className="border-blue-200 bg-blue-50/50 dark:border-blue-800 dark:bg-blue-950/20">
      <CardContent className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <p className="font-medium">
            Switching broadband could save you £200+/year
          </p>
          <p className="mt-1 text-sm text-muted-foreground">
            We noticed you're paying for a broadband provider. Compare deals to
            see if you could save.
          </p>
        </div>
        <Button
          className="shrink-0"
          render={
            <a href={url} target="_blank" rel="noopener noreferrer" />
          }
        >
          Compare broadband deals →
        </Button>
      </CardContent>
    </Card>
  )
}
