import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "About — UK Tools",
  description: "UK Tools builds free, accurate calculators and guides for UK consumers.",
}

export default function AboutPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold tracking-tight">About UK Tools</h1>

      <div className="mt-8 space-y-6 text-muted-foreground">
        <p>
          UK Tools builds free, accurate calculators and guides for UK consumers.
          Every tool is built around a specific problem — not a generic template.
        </p>

        <div>
          <h2 className="mb-3 text-base font-semibold text-foreground">Data sources</h2>
          <ul className="space-y-2 text-sm">
            <li><strong className="text-foreground">Stamp Duty (SDLT)</strong> — <a href="https://www.gov.uk/stamp-duty-land-tax" className="underline" target="_blank" rel="noopener noreferrer">gov.uk/stamp-duty-land-tax</a>. Rates verified April 2026.</li>
            <li><strong className="text-foreground">Section 75 / Chargeback</strong> — Consumer Credit Act 1974. FOS complaint data from <a href="https://www.financial-ombudsman.org.uk/about-us/annual-review" className="underline" target="_blank" rel="noopener noreferrer">FOS Annual Review 2023/24</a>.</li>
            <li><strong className="text-foreground">IR35</strong> — HMRC off-payroll working guidance and tribunal case law (Ready Mixed Concrete 1968, Carmichael 1999).</li>
            <li><strong className="text-foreground">Crime statistics</strong> — <a href="https://data.police.uk" className="underline" target="_blank" rel="noopener noreferrer">data.police.uk</a> (Police UK open data, typically 2–3 months behind current date).</li>
            <li><strong className="text-foreground">Company data</strong> — <a href="https://developer.company-information.service.gov.uk" className="underline" target="_blank" rel="noopener noreferrer">Companies House API</a> (official UK company register).</li>
          </ul>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-foreground">Disclaimers</h2>
          <p className="text-sm">
            UK Tools provides general information only. Nothing on this site constitutes
            legal, financial, or tax advice. Tax rates change — always verify current
            rates at <a href="https://www.gov.uk" className="underline" target="_blank" rel="noopener noreferrer">gov.uk</a> before making decisions.
            For complex matters, consult a qualified solicitor or financial adviser.
          </p>
        </div>

        <div>
          <h2 className="mb-3 text-base font-semibold text-foreground">Contact</h2>
          <p className="text-sm">
            Found an error or outdated rate?{" "}
            <a href="https://github.com/mahdirzv/uktools/issues" className="underline" target="_blank" rel="noopener noreferrer">Open an issue on GitHub</a>.
          </p>
        </div>
      </div>

      <div className="mt-10 flex gap-4 text-sm">
        <Link href="/" className="underline text-muted-foreground hover:text-foreground">← Back to tools</Link>
        <Link href="/privacy" className="underline text-muted-foreground hover:text-foreground">Privacy policy</Link>
      </div>
    </div>
  )
}
