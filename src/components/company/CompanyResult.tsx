import {
  computeTrustSignals,
  sicCodeToIndustry,
  formatAddress,
  type CompanyReport,
} from "@/lib/companies-house"
import { TrustSignals } from "@/components/company/TrustSignals"
import { DirectorList } from "@/components/company/DirectorList"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export function CompanyResult({ report }: { report: CompanyReport }) {
  const { profile, officers, filings } = report
  const signals = computeTrustSignals(profile)
  const status = profile.company_status?.toLowerCase() ?? ""

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-2">
            <div>
              <CardTitle className="text-lg">{profile.company_name}</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {profile.company_number}
                {profile.company_type && ` · ${profile.company_type.replace(/-/g, " ")}`}
              </p>
            </div>
            <Badge
              variant={
                status === "active"
                  ? "default"
                  : status === "dormant"
                    ? "secondary"
                    : "destructive"
              }
              className="shrink-0 capitalize"
            >
              {status.replace("-", " ")}
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <dl className="grid gap-3 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-xs text-muted-foreground">Incorporated</dt>
              <dd>{profile.date_of_creation ?? "Unknown"}</dd>
            </div>
            <div>
              <dt className="text-xs text-muted-foreground">Registered Address</dt>
              <dd>{formatAddress(profile.registered_office_address)}</dd>
            </div>
            {profile.sic_codes && profile.sic_codes.length > 0 && (
              <div className="sm:col-span-2">
                <dt className="text-xs text-muted-foreground">Industry (SIC)</dt>
                <dd className="flex flex-wrap gap-1.5 mt-1">
                  {profile.sic_codes.map((code) => (
                    <Badge key={code} variant="outline" className="text-xs">
                      {code} — {sicCodeToIndustry(code)}
                    </Badge>
                  ))}
                </dd>
              </div>
            )}
          </dl>
        </CardContent>
      </Card>

      <TrustSignals signals={signals} />

      <DirectorList officers={officers} />

      {filings.length > 0 && (
        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold">Recent Filings</h3>
          <div className="flex flex-col gap-2">
            {filings.map((filing, i) => (
              <div
                key={i}
                className="flex items-start justify-between gap-2 rounded-lg border p-3 text-sm"
              >
                <span>{filing.description ?? filing.type}</span>
                <span className="shrink-0 text-xs text-muted-foreground">
                  {filing.date}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
