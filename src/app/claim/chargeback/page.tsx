import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { ChargebackWizard } from "@/components/claim/ChargebackWizard"

export const metadata: Metadata = {
  title: "Chargeback Claim Letter Builder UK | Free Template 2026",
  description:
    "Build your chargeback claim letter for debit or credit card disputes. Covers Visa and Mastercard scheme rules.",
}

export default function ChargebackPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] tool-page-padding">
      <Link
        href="/claim"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to Claim Toolkit
      </Link>
      <ChargebackWizard />
    </div>
  )
}
