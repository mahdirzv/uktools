interface DataSourceFooterProps {
  sourceLabel: string
  sourceUrl: string
  lastChecked?: string | null
  licenceLabel?: string
  licenceUrl?: string
  coverage?: string
  caveat?: string
  className?: string
}

export function DataSourceFooter({
  sourceLabel,
  sourceUrl,
  lastChecked,
  licenceLabel,
  licenceUrl,
  coverage,
  caveat,
  className,
}: DataSourceFooterProps) {
  return (
    <div className={className ?? "space-y-1.5 text-xs text-muted-foreground"}>
      <p>
        Source:{" "}
        <a
          href={sourceUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          {sourceLabel}
        </a>
        {lastChecked && (
          <>
            {" · "}Last checked: {new Date(lastChecked).toLocaleString("en-GB")}
          </>
        )}
      </p>

      {(licenceLabel || coverage) && (
        <p>
          {licenceLabel && (
            <>
              Licence:{" "}
              {licenceUrl ? (
                <a
                  href={licenceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline underline-offset-2"
                >
                  {licenceLabel}
                </a>
              ) : (
                licenceLabel
              )}
            </>
          )}
          {licenceLabel && coverage && " · "}
          {coverage && <>Coverage: {coverage}</>}
        </p>
      )}

      {caveat && <p>{caveat}</p>}
    </div>
  )
}
