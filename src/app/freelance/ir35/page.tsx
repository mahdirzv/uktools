import type { Metadata } from "next"
import Link from "next/link"
import { IR35Wizard } from "@/components/freelance/IR35Wizard"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "IR35 Status Checker UK 2026 — Am I Inside or Outside IR35?",
  description:
    "Check your IR35 status with plain-English questions based on the three key tests. Better than HMRC CEST — no jargon, clear result.",
}

export default function IR35Page() {
  return (
    <div className="flex flex-col flex-1 items-center bg-zinc-50 font-sans">
      <main className="flex w-full max-w-2xl flex-col gap-8 px-4 py-16 sm:px-6">
        <div>
          <Link
            href="/freelance"
            className="inline-flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors mb-4"
          >
            <ArrowLeft className="size-3.5" />
            Back to Freelance Tools
          </Link>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            IR35 Status Checker
          </h1>
          <p className="text-sm text-muted-foreground mt-1">
            Answer these questions based on the three key tests from UK case law
            to determine your IR35 status.
          </p>
        </div>

        <IR35Wizard />
      </main>
    </div>
  )
}
