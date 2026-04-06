"use client"

export function PrivateParkingInfo() {
  return (
    <div className="rounded-lg border border-amber-200 bg-amber-50 p-5 dark:border-amber-800 dark:bg-amber-950/30">
      <h3 className="font-semibold text-amber-900 dark:text-amber-200">
        Private parking tickets are different
      </h3>
      <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
        Private parking tickets (from companies like ParkingEye, UKPC, Euro Car
        Parks) are <strong>NOT</strong> the same as council PCNs. They are
        invoices, not fines. Do <strong>NOT</strong> ignore them — they can
        escalate to debt — but the appeal process is different.
      </p>
      <p className="mt-2 text-sm text-amber-800 dark:text-amber-300">
        The main appeal body is{" "}
        <strong>POPLA</strong> (for BPAA members) or <strong>IPC</strong>.
      </p>
      <a
        href="https://www.popla.co.uk"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-3 inline-flex items-center gap-1 text-sm font-medium text-amber-900 underline hover:no-underline dark:text-amber-200"
      >
        Appeal via POPLA →
      </a>
    </div>
  )
}
