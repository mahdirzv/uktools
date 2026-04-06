import type { Metadata } from "next"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FaqAccordion } from "@/components/claim/FaqAccordion"
import { CreditCard, Wallet, Check } from "lucide-react"

export const metadata: Metadata = {
  title: "Section 75 Claim Letter Builder UK | Free Template + Guide",
  description:
    "Build your Section 75 or chargeback claim letter in 2 minutes. Based on the Consumer Credit Act 1974. Used when merchants fail to deliver or go bust.",
}

export default function ClaimPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-24">
          <div className="text-center">
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              Get your money back.
              <br />
              Draft your claim letter in 2 minutes.
            </h1>
            <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground">
              Section 75 and chargeback claims — the UK&apos;s most underused
              consumer rights, made simple.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <CreditCard className="size-5" />
                  <Badge variant="secondary">Credit card</Badge>
                </div>
                <CardTitle className="text-lg">Section 75 claim</CardTitle>
                <CardDescription>
                  Paid by credit card, £100–£30,000. Your card provider is
                  legally liable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button render={<Link href="/claim/s75" />} className="w-full">
                  Start claim
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <div className="flex items-center gap-2">
                  <Wallet className="size-5" />
                  <Badge variant="secondary">Debit or credit</Badge>
                </div>
                <CardTitle className="text-lg">Chargeback</CardTitle>
                <CardDescription>
                  Debit card, or credit card under £100. Request a reversal
                  through your bank.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button render={<Link href="/claim/chargeback" />} variant="outline" className="w-full">
                  Start claim
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 flex flex-wrap justify-center gap-x-8 gap-y-3 text-sm text-muted-foreground">
            <span className="flex items-center gap-2">
              <Check className="size-4 text-foreground" />
              Based on Consumer Credit Act 1974
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-4 text-foreground" />
              Works against any UK credit card issuer
            </span>
            <span className="flex items-center gap-2">
              <Check className="size-4 text-foreground" />
              If refused, escalate free to the Financial Ombudsman
            </span>
          </div>
        </section>

        <Separator />

        <section className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
          <h2 className="mb-8 text-xl font-semibold">
            Frequently asked questions
          </h2>
          <FaqAccordion />
        </section>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          This tool provides general legal information, not legal advice. It
          does not constitute a legal advice relationship. For complex disputes,
          consult a solicitor.
        </div>
      </footer>
    </div>
  )
}
