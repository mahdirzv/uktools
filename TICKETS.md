# Implementation Tickets — Sprint 1

Read CLAUDE.md before starting any ticket.
Run `npm run build` after each ticket. Fix errors before moving on.
Use `git add -A && git commit -m "fix/feat: <description>"` after each ticket.
At the end: push and deploy with `vercel --prod --yes`.

---

## TICKET-008: S75 amount validation

**Files:** `src/components/claim/S75Wizard.tsx`

On Step 2 (payment details), after the amount field, add inline validation:

```
amount < 100 → amber warning box:
  "Section 75 requires a minimum purchase of £100.
   For purchases under £100, use the Chargeback route instead."
  Show a "Switch to chargeback →" link pointing to /claim/chargeback

amount > 30000 → amber warning box:
  "Section 75 covers purchases up to £30,000.
   For larger amounts, the claim process is the same but you may want
   legal advice — a solicitor can advise on the strongest approach."

amount <= 0 and field touched → red error:
  "Please enter the amount you paid."
```

- Warning boxes use the existing amber/yellow styling or a `bg-amber-50 border-amber-200 text-amber-800` pattern
- Warnings do NOT block progression — user can still continue
- Only show after the field has been touched (onBlur or onChange)
- The "Switch to chargeback" link uses Next.js Link

---

## TICKET-009: CrimeCheck — context layer + data date

**Files:** 
- `src/app/api/crime/route.ts`
- `src/components/crime/CrimeBreakdown.tsx`
- `src/components/crime/PostcodeSearch.tsx`

### Part A: Show data date

The Police UK API returns crime records with a `month` field (e.g. "2025-12").
In the API route response, include the most recent month found in the data:

```typescript
// In route.ts, after aggregating crimes:
const months = allCrimes.map(c => c.month).filter(Boolean)
const latestMonth = months.sort().at(-1) // e.g. "2026-01"
// Include in response: { crimes: {...}, dataMonth: "2026-01" }
```

In `CrimeBreakdown.tsx`, show below the total:
```
"Data covers crimes reported to [month year] — Police UK data typically
 2–3 months behind current date.  Source: data.police.uk"
```
Format month as "January 2026" from "2026-01".

### Part B: Add national average comparison

England & Wales national crime rate per 1,000 population (2024/25, ONS/Home Office):
Use these hardcoded annual per-1,000 rates (Home Office Crime outcomes in England and Wales 2024/25):

```typescript
// src/lib/crime-benchmarks.ts
export const NATIONAL_RATES_PER_1000: Record<string, number> = {
  "anti-social-behaviour":     19.2,
  "burglary":                   5.1,
  "criminal-damage-arson":      7.8,
  "drugs":                      3.2,
  "other-theft":                9.4,
  "public-order":               6.7,
  "robbery":                    1.8,
  "shoplifting":                6.3,
  "theft-from-the-person":      3.9,
  "vehicle-crime":              7.4,
  "violent-crime":             20.1,
  "bicycle-theft":              1.9,
  "other-crime":                2.1,
  "possession-of-weapons":      0.8,
}

// Average UK local authority population served by a police beat area: ~2,500
export const BENCHMARK_POPULATION = 2500
```

In `CrimeBreakdown.tsx`, for each crime category show a small label:
- If count > national_rate * population * 1.2: `↑ above average`  (red text, small)
- If count < national_rate * population * 0.8: `↓ below average` (green text, small)
- Otherwise: nothing shown (don't clutter with "average" labels)

Keep it subtle — a small coloured text tag after the bar, not a full badge.

Add a footnote: "Compared to England & Wales average (Home Office, 2024/25)"

---

## TICKET-010: IR35 — add Mutuality of Obligation (MOO) question

**Files:**
- `src/components/freelance/IR35Wizard.tsx`
- `src/lib/ir35-scorer.ts`

### Why this matters
HMRC's CEST tool does NOT assess Mutuality of Obligation — a known gap criticised by professional bodies. Adding MOO makes this tool more thorough than CEST.

### Add to IR35Wizard.tsx

After the existing Section 3 (Mutuality) radio group, ensure there's a dedicated question:

**Section 3 should read:**
```
"Mutuality of Obligation"
Question: "Is there an ongoing obligation for the client to offer you work,
           and for you to accept it?"

Options:
○ No — each project is discrete; no obligation either way (Outside signal)
○ Unclear — there's an expectation of ongoing work but nothing contractual (Neutral)
○ Yes — there's a continuing obligation or rolling contract (Inside signal)
```

If this question already exists, verify the text matches exactly above and the scoring is correct.

### Update ir35-scorer.ts

Ensure MOO scores correctly:
- "no" → +1 (Outside signal)
- "unclear" → 0
- "yes" → -1 (Inside signal)

Add a note in the result explanation section: "Note: HMRC's CEST tool does not assess Mutuality of Obligation. This question is based on key tribunal cases including Carmichael v National Power [1999] and Stringfellow Restaurants v Quashie [2012]."

Show this note on the result page, below the main verdict.

---

## TICKET-012: TrustCheck — plain-English company signals

**Files:**
- `src/components/company/TrustSignals.tsx`
- `src/components/company/CompanyResult.tsx`
- `src/lib/companies-house.ts`

### Changes

**1. Company age in plain English**
Currently shows incorporation date as a raw date string.
Change to: "Incorporated [date] — [X years / X months] ago"

```typescript
function companyAge(incorporatedDate: string): string {
  const d = new Date(incorporatedDate)
  const now = new Date()
  const years = now.getFullYear() - d.getFullYear()
  const months = now.getMonth() - d.getMonth() + years * 12
  if (months < 1) return "incorporated less than a month ago"
  if (months < 12) return `${months} months old`
  return `${Math.floor(months / 12)} year${Math.floor(months / 12) !== 1 ? "s" : ""} old`
}
```

If company < 12 months old: show a red flag signal "⚠ Less than 12 months old — exercise caution"

**2. Accounts status in plain English**
Currently raw status strings from Companies House.
Map to user-friendly signals:
- `accounts_next_due` is in the future → ✓ green "Accounts filed on time"
- `accounts_next_due` is in the past → ✗ red "Accounts OVERDUE — check with caution"
- `accounts_overdue: true` → ✗ red "Accounts OVERDUE"
- No accounts filed yet (new company) → ⚠ amber "No accounts filed yet (new company)"

**3. Director tenure**
In DirectorList.tsx, for each active director show:
"Appointed [date] — [X years]"

**4. New signal: serial director flag**
If any director appears in the `resigned_on` field as having left multiple dissolved companies (you can't easily check this without a second API call), add a note at the bottom of TrustSignals:
"For a full director history including past companies, check the Companies House profile directly."
Link: `https://find-and-update.company-information.service.gov.uk/company/${companyNumber}`

---

## After all tickets

1. `npm run build` — must pass with zero errors
2. `git add -A`
3. `git commit -m "feat: S75 validation, CrimeCheck context, IR35 MOO, TrustCheck signals"`
4. `git push`
5. `vercel --prod --yes`
