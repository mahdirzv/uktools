import type { Metadata } from "next"
import { CompanySearch } from "@/components/company/CompanySearch"

export const metadata: Metadata = {
  title:
    "Check a UK Company — Is This Business Legit? | Companies House Lookup",
  description:
    "Free UK company checker. Search any business on Companies House and see plain-English trust signals — active status, accounts, directors, and red flags.",
}

export default function CompanyPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] px-4 py-10 sm:py-16">
      <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
        Check a UK Company
      </h1>
      <p className="mt-3 text-muted-foreground">
        Search any UK business on Companies House and see plain-English trust
        signals — is it active, how old is it, are accounts filed on time, and
        are there any red flags?
      </p>
      <CompanySearch />
    </div>
  )
}
