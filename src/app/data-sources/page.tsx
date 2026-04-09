import type { Metadata } from "next"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

export const metadata: Metadata = {
  title: "Data sources & licensing — UK Tools",
  description:
    "Official data sources, licences and legal caveats used by UK Tools.",
}

export default function DataSourcesPage() {
  const year = new Date().getFullYear()

  return (
    <div className="mx-auto w-full max-w-[760px] tool-page-padding">
      <div className="space-y-4">
        <Link
          href="/"
          className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="size-3.5" />
          Back to UK Tools
        </Link>
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">Data sources & licensing</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            UK Tools uses official UK public-sector datasets and APIs. No scraping.
          </p>
        </div>
      </div>

      <div className="mt-8 space-y-6 text-sm">
        <section className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">Flood tool</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Source: <a className="underline underline-offset-2" href="https://environment.data.gov.uk/flood-monitoring/doc/reference" target="_blank" rel="noopener noreferrer">Environment Agency flood monitoring API</a>
            </li>
            <li>
              Licence: <a className="underline underline-offset-2" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" target="_blank" rel="noopener noreferrer">Open Government Licence v3.0</a>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">Crime tool</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Source: <a className="underline underline-offset-2" href="https://data.police.uk/about/" target="_blank" rel="noopener noreferrer">data.police.uk</a>
            </li>
            <li>
              Licence: <a className="underline underline-offset-2" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" target="_blank" rel="noopener noreferrer">Open Government Licence v3.0</a>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">Company tool</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Source: <a className="underline underline-offset-2" href="https://developer.company-information.service.gov.uk/" target="_blank" rel="noopener noreferrer">Companies House API</a>
            </li>
            <li>
              Guidance: <a className="underline underline-offset-2" href="https://www.gov.uk/guidance/search-the-companies-house-register" target="_blank" rel="noopener noreferrer">Searching the Companies House register</a>
            </li>
          </ul>
        </section>

        <section className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">EPC tool</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Source: <a className="underline underline-offset-2" href="https://epc.opendatacommunities.org" target="_blank" rel="noopener noreferrer">EPC Open Data Communities</a>
            </li>
            <li>
              Licence/copyright notice: <a className="underline underline-offset-2" href="https://epc.opendatacommunities.org/docs/copyright" target="_blank" rel="noopener noreferrer">Data licence & copyright</a>
            </li>
            <li>
              OGL applies to non-address fields; address/postcode fields have additional rights restrictions.
            </li>
          </ul>
        </section>

        <section className="rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
          <h2 className="font-semibold">Postcode geocoding (Flood + Crime tools)</h2>
          <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
            <li>
              Source service: <a className="underline underline-offset-2" href="https://postcodes.io/docs/licences/" target="_blank" rel="noopener noreferrer">postcodes.io licences</a>
            </li>
            <li>
              Source: Office for National Statistics licensed under the <a className="underline underline-offset-2" href="https://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/" target="_blank" rel="noopener noreferrer">Open Government Licence v3.0</a>
            </li>
            <li>Contains OS data © Crown copyright and database right {year}</li>
            <li>Contains Royal Mail data © Royal Mail copyright and database right {year}</li>
            <li>
              Northern Ireland (BT) postcode data requires separate commercial licensing from <a className="underline underline-offset-2" href="https://www.finance-ni.gov.uk/articles/lps-copyright-licensing-and-publishing" target="_blank" rel="noopener noreferrer">Land &amp; Property Services</a>. BT lookups are currently disabled.
            </li>
          </ul>
        </section>
      </div>
    </div>
  )
}
