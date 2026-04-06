import type { Metadata } from "next"
import { AddressSearch } from "@/components/epc/AddressSearch"

export const metadata: Metadata = {
  title: "EPC Rating Checker UK — Energy Performance Certificate Lookup",
  description:
    "Look up the EPC rating for any UK property. See energy efficiency score, annual heating costs, CO2 emissions, and how much you could save with improvements.",
}

export default function EpcPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        EPC Checker
      </h1>
      <p className="mt-3 text-muted-foreground">
        Look up the Energy Performance Certificate for any English or Welsh
        property. See your current rating, estimated energy costs, and what
        improvements could save you money.
      </p>
      <AddressSearch />
    </div>
  )
}
