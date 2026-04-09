import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { CompanySearch } from "@/components/company/CompanySearch"

export const metadata: Metadata = {
  title:
    "Check a UK Company — Is This Business Legit? | Companies House Lookup",
  description:
    "Free UK company checker. Search any business on Companies House and see plain-English trust signals — active status, accounts, directors, and red flags.",
}

export default function CompanyPage() {
  return (
    <div className="mx-auto w-full max-w-[720px] tool-page-padding">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to UK Tools
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            Check a UK Company
          </h1>
          <p className="mt-3 text-muted-foreground">
            Search any UK business on Companies House and see plain-English trust
            signals — is it active, how old is it, are accounts filed on time, and
            are there any red flags?
          </p>
        </div>
      </div>
      <CompanySearch />
    </div>
  )
}
