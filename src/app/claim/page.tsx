import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, CreditCard, Wallet, Check } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { FaqAccordion } from "@/components/claim/FaqAccordion"
import { VideoPlayer } from "@/components/shared/VideoPlayer"

export const metadata: Metadata = {
  title: "Section 75 Claim Letter Builder UK | Free Template + Guide",
  description:
    "Build your Section 75 or chargeback claim letter in 2 minutes. Based on the Consumer Credit Act 1974. Used when merchants fail to deliver or go bust.",
}

export default function ClaimPage() {
  return (
    <div className="flex flex-1 flex-col">
      <main className="flex-1">
        <section className="tool-page-padding mx-auto max-w-[720px]">
          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5" />
              Back to UK Tools
            </Link>

            <div>
              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Get your money back. Draft your claim letter in 2 minutes.
              </h1>
              <p className="mt-3 max-w-xl text-lg text-muted-foreground">
                Section 75 and chargeback claims — the UK&apos;s most underused
                consumer rights, made simple.
              </p>
            </div>
          </div>

          <VideoPlayer
            src="/s75-explainer.mp4"
            title="How Section 75 works"
            duration="25 sec"
            className="mt-8"
          />

          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            <Card className="border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                  <CreditCard className="size-5 text-primary" />
                  <Badge variant="secondary">Credit card</Badge>
                </div>
                <CardTitle className="text-lg">Section 75 claim</CardTitle>
                <CardDescription className="leading-relaxed">
                  Paid by credit card, £100–£30,000. Your card provider is legally liable.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button render={<Link href="/claim/s75" />} className="w-full justify-between">
                  Start Section 75 claim
                </Button>
              </CardContent>
            </Card>

            <Card className="border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm">
              <CardHeader className="space-y-3">
                <div className="flex items-center gap-2">
                  <Wallet className="size-5 text-primary" />
                  <Badge variant="secondary">Debit or credit</Badge>
                </div>
                <CardTitle className="text-lg">Chargeback</CardTitle>
                <CardDescription className="leading-relaxed">
                  Debit card, or credit card under £100. Request a reversal through your bank.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button render={<Link href="/claim/chargeback" />} variant="outline" className="w-full justify-between">
                  Start chargeback claim
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="mt-12 grid gap-3 text-sm sm:grid-cols-3">
            <div className="rounded-lg border border-border/70 bg-card px-3 py-2.5 text-muted-foreground">
              <span className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 text-foreground" />
                Based on Consumer Credit Act 1974
              </span>
            </div>
            <div className="rounded-lg border border-border/70 bg-card px-3 py-2.5 text-muted-foreground">
              <span className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 text-foreground" />
                Works against any UK credit card issuer
              </span>
            </div>
            <div className="rounded-lg border border-border/70 bg-card px-3 py-2.5 text-muted-foreground">
              <span className="flex items-start gap-2">
                <Check className="mt-0.5 size-4 text-foreground" />
                If refused, escalate free to the Financial Ombudsman
              </span>
            </div>
          </div>
        </section>

        <Separator />

        <section className="tool-page-padding mx-auto max-w-[720px]">
          <h2 className="mb-8 text-xl font-semibold">
            Frequently asked questions
          </h2>
          <FaqAccordion />
        </section>
      </main>

      <footer className="border-t py-6 text-center text-xs text-muted-foreground">
        <div className="tool-page-x mx-auto max-w-[720px]">
          This tool provides general legal information, not legal advice. It
          does not constitute a legal advice relationship. For complex disputes,
          consult a solicitor.
        </div>
      </footer>
    </div>
  )
}
