import type { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Privacy Policy — UK Tools",
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto w-full max-w-2xl px-4 py-16">
      <h1 className="text-2xl font-bold tracking-tight">Privacy Policy</h1>
      <p className="mt-2 text-sm text-muted-foreground">Last updated: April 2026</p>

      <div className="mt-8 space-y-6 text-sm text-muted-foreground">
        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">What data we collect</h2>
          <p>UK Tools does not require an account. We do not collect names, email addresses, or payment details (the £9.99 ClaimKit pack is not yet live).</p>
          <p className="mt-2">The Subscription Tracker stores data only in your browser&apos;s localStorage — it never leaves your device.</p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">Vercel analytics</h2>
          <p>This site is hosted on Vercel. Vercel may collect standard web server logs (IP address, user agent, request path) for infrastructure purposes. We do not use third-party analytics or advertising cookies.</p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">Third-party APIs</h2>
          <p>When you use CrimeCheck or TrustCheck, your postcode or search query is sent to the Police UK API (data.police.uk) or Companies House API respectively. These are official UK government APIs. No personal data is stored by UK Tools as a result of these searches.</p>
        </div>

        <div>
          <h2 className="mb-2 text-base font-semibold text-foreground">Affiliate links</h2>
          <p>Some links on this site are affiliate links (Awin publisher ID 2836020). If you click through and make a purchase, we may receive a commission at no cost to you. We only link to services we consider relevant to the tool context.</p>
        </div>
      </div>

      <div className="mt-10">
        <Link href="/" className="text-sm underline text-muted-foreground hover:text-foreground">← Back to tools</Link>
      </div>
    </div>
  )
}
