import type { Metadata } from "next"
import { ChargebackWizard } from "@/components/claim/ChargebackWizard"

export const metadata: Metadata = {
  title: "Chargeback Claim Letter Builder UK | Free Template 2026",
  description:
    "Build your chargeback claim letter for debit or credit card disputes. Covers Visa and Mastercard scheme rules.",
}

export default function ChargebackPage() {
  return <ChargebackWizard />
}
