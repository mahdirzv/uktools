import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { S75Wizard } from "@/components/claim/S75Wizard"

export const metadata: Metadata = {
  title: "Section 75 Claim Letter Builder UK | Free Template 2026",
  description:
    "Build your Section 75 claim letter in 2 minutes. Based on the Consumer Credit Act 1974. Works when merchants fail to deliver or go bust.",
}

export default function Section75Page() {
  return (
    <div className="mx-auto w-full max-w-[720px] tool-page-padding">
      <Link
        href="/claim"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="size-3.5" />
        Back to Claim Toolkit
      </Link>
      <S75Wizard />
    </div>
  )
}
