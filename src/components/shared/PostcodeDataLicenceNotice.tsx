interface PostcodeDataLicenceNoticeProps {
  className?: string
}

export function PostcodeDataLicenceNotice({ className }: PostcodeDataLicenceNoticeProps) {
  const year = new Date().getFullYear()

  return (
    <div className={className ?? "space-y-1.5 text-xs text-muted-foreground"}>
      <p>
        Postcode geocoding source:{" "}
        <a
          href="https://postcodes.io/docs/licences/"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          postcodes.io licensing
        </a>
      </p>
      <p>
        Source: Office for National Statistics licensed under the Open Government Licence v3.0
      </p>
      <p>Contains OS data © Crown copyright and database right {year}</p>
      <p>Contains Royal Mail data © Royal Mail copyright and database right {year}</p>
      <p>
        BT (Northern Ireland) postcodes are currently disabled pending commercial licensing from{" "}
        <a
          href="https://www.finance-ni.gov.uk/articles/lps-copyright-licensing-and-publishing"
          target="_blank"
          rel="noopener noreferrer"
          className="underline underline-offset-2"
        >
          Land & Property Services
        </a>
        .
      </p>
    </div>
  )
}
