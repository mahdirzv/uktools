import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft, Calculator, Scale } from "lucide-react"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export const metadata: Metadata = {
  title: "UK Freelance Day Rate Calculator & IR35 Checker 2026",
  description:
    "Free tools for UK contractors and freelancers. Calculate your day rate from your salary, and check your IR35 status with our plain-English guide.",
}

export default function FreelancePage() {
  return (
    <div className="flex flex-col flex-1 items-center">
      <main className="tool-page-padding flex w-full max-w-[720px] flex-col gap-12">
        <div className="space-y-4">
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="size-3.5" />
            Back to UK Tools
          </Link>

          <div className="flex flex-col gap-3">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Free tools for UK freelancers and contractors
            </h1>
            <p className="text-lg text-muted-foreground">
              Day rate calculator and IR35 checker — built for UK tax rules.
            </p>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 sm:auto-rows-fr">
          <Card className="flex h-full flex-col border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm">
            <CardHeader className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Calculator className="size-5 text-primary" />
                <CardTitle className="text-lg">Day Rate Calculator</CardTitle>
              </div>
              <CardDescription className="leading-relaxed">
                Find out what to charge based on your target salary, accounting
                for NI, pension, and downtime.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button className="w-full justify-between" render={<Link href="/freelance/day-rate" />}>
                Calculate your day rate
              </Button>
            </CardContent>
          </Card>

          <Card className="flex h-full flex-col border-border/70 bg-card transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/25 hover:shadow-sm">
            <CardHeader className="flex-1 space-y-3">
              <div className="flex items-center gap-2">
                <Scale className="size-5 text-primary" />
                <CardTitle className="text-lg">IR35 Checker</CardTitle>
              </div>
              <CardDescription className="leading-relaxed">
                Find out your IR35 status with plain-English questions based on
                the three key tests from case law.
              </CardDescription>
            </CardHeader>
            <CardContent className="mt-auto">
              <Button className="w-full justify-between" render={<Link href="/freelance/ir35" />}>
                Check your IR35 status
              </Button>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-3 sm:grid-cols-3">
          <Stat value="4.4 million" label="self-employed people in the UK" />
          <Stat
            value="IR35 reform"
            label="(2021) affects all medium/large private sector engagements"
          />
          <Stat
            value="CEST tool"
            label="criticised by professional bodies for bias"
          />
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Frequently asked questions</h2>
          <Accordion>
            <AccordionItem value="what-is-ir35">
              <AccordionTrigger>What is IR35?</AccordionTrigger>
              <AccordionContent>
                <p>
                  IR35 is UK tax legislation that determines whether a
                  contractor is &quot;disguised employment.&quot; If you&apos;re
                  inside IR35, the fee-payer must deduct income tax and National
                  Insurance as if you were an employee. If you&apos;re outside
                  IR35, you can operate through a limited company and manage your
                  own tax affairs.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="day-rate">
              <AccordionTrigger>
                How is my day rate calculated?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  Your day rate is based on your target annual income, plus the
                  additional costs of being self-employed: employer NI
                  contributions, pension, a downtime buffer for gaps between
                  contracts, and limited company running costs (accountant,
                  insurance). The total is divided by the number of billable days
                  in a year.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="inside-outside">
              <AccordionTrigger>
                What&apos;s the difference between inside and outside IR35?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  <strong>Outside IR35:</strong> You operate as a genuine
                  business through your limited company, control how you do your
                  work, and can send a substitute. You pay corporation tax and
                  take dividends.
                </p>
                <p>
                  <strong>Inside IR35:</strong> The relationship looks more like
                  employment. The fee-payer deducts tax and NI from your pay,
                  similar to a permanent employee, but without the employment
                  rights.
                </p>
              </AccordionContent>
            </AccordionItem>
            <AccordionItem value="legal-advice">
              <AccordionTrigger>
                Is this legal or tax advice?
              </AccordionTrigger>
              <AccordionContent>
                <p>
                  No. These tools are for informational purposes only and do not
                  constitute legal or tax advice. The IR35 checker is based on
                  publicly available case law principles but cannot replace a
                  professional assessment. Always consult a qualified accountant
                  or tax advisor for advice on your specific circumstances.
                </p>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </main>
    </div>
  )
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-lg border border-border/70 bg-card px-4 py-3">
      <p className="text-base font-semibold tracking-tight">{value}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{label}</p>
    </div>
  )
}
