# uktools — Agent Context

## What this is

Next.js 15 web app serving multiple UK consumer tools under one domain. Each tool lives at its own route. One Vercel deployment, one SEO domain, one Awin affiliate account.

Live: https://uktools.vercel.app

## Stack

- Next.js 15 (App Router), TypeScript, Tailwind CSS
- shadcn/ui (base-ui v4 — note: no `asChild` prop on Button, use `render` prop instead)
- No database. No auth. All tools are stateless client-side logic.
- Vercel deployment. Deploy with: `vercel --prod --yes` from project root.
- Awin affiliate publisher ID: **2836020** — all links go through `src/lib/awin.ts`

## Project structure

```
src/
├── app/
│   ├── page.tsx                    ← homepage directory (list all tools)
│   ├── moving/page.tsx             ← Moving Home Toolkit
│   ├── claim/
│   │   ├── page.tsx                ← ClaimKit landing
│   │   ├── s75/page.tsx            ← Section 75 wizard
│   │   └── chargeback/page.tsx     ← Chargeback wizard
│   └── freelance/
│       ├── page.tsx                ← FreelanceKit landing
│       ├── day-rate/page.tsx       ← Day rate calculator
│       └── ir35/page.tsx           ← IR35 checker
├── components/
│   ├── moving/                     ← StampDutyCalc, MovingChecklist, UtilitySwitchHub, etc.
│   ├── claim/                      ← ClaimWizard, LetterPreview, PaymentPlaceholder, FaqAccordion
│   ├── freelance/                  ← DayRateCalculator, DayRateResult, IR35Wizard, IR35Result
│   ├── shared/                     ← PaymentPlaceholder (shared between claim + freelance)
│   └── ui/                         ← shadcn components
└── lib/
    ├── awin.ts                     ← Awin link builder (ALWAYS use this, never inline URLs)
    ├── stamp-duty.ts               ← SDLT calculation logic
    ├── moving-costs.ts             ← Moving cost defaults
    ├── claim-generator.ts          ← S75 + chargeback letter generation
    ├── day-rate-calc.ts            ← Day rate calculation
    └── ir35-scorer.ts              ← IR35 scoring logic
```

## Tools and monetization

| Route | Tool | Monetization | Status |
|-------|------|-------------|--------|
| `/moving` | Moving Home Toolkit | Awin affiliate (Uswitch £30–70 CPA, mortgage broker) | ✅ Live |
| `/claim/s75` | Section 75 wizard | Show letter FREE → paywall FOS escalation pack (£9.99) | 🔧 Needs fix |
| `/claim/chargeback` | Chargeback wizard | Show letter FREE | 🔧 Needs fix |
| `/freelance/day-rate` | Day rate calculator | Free + shareable URL (viral hook) | ✅ Correct |
| `/freelance/ir35` | IR35 checker | Free verdict → Awin contractor insurance affiliate CTA | 🔧 Needs fix |

## Critical rules

### Metadata on pages with client components
Pages that export `metadata` must be server components. If a route needs client-side state (tabs, forms), create a separate `*Client.tsx` or named component with `"use client"` and import it from the server page.

```typescript
// ✅ Correct pattern
// app/some-route/page.tsx (server)
import type { Metadata } from "next"
import { SomeClientComponent } from "@/components/some/SomeClientComponent"
export const metadata: Metadata = { title: "...", description: "..." }
export default function Page() { return <SomeClientComponent /> }

// ✗ Wrong — metadata + "use client" in same file doesn't work
"use client"
export const metadata = { ... } // This will NOT work
```

### Awin links
Never hardcode Awin URLs. Always use `awinLink(merchantId, destination)` from `src/lib/awin.ts`.

Known live merchant IDs:
- Uswitch energy + broadband: `3655`

PENDING (show as "Coming soon" until approved):
- MoneySupermarket car insurance
- L&C mortgage broker
- AnyVan removals
- GoCompare

### shadcn Button with links
shadcn v4 base-ui Button does NOT support `asChild`. Use the `render` prop:
```tsx
// ✅ Correct
<Button render={<a href={url} target="_blank" rel="noopener noreferrer" />}>
  Click me
</Button>

// ✗ Wrong
<Button asChild><a href={url}>Click me</a></Button>
```

### No unnecessary comments
Only add comments for: complex algorithms, non-obvious business rules (tax thresholds, legal references), regex, or why an empty catch block exists.

## Known issues (fix these)

1. **Page titles show "Create Next App"** on `/claim/s75`, `/claim/chargeback`, `/freelance/day-rate`, `/freelance/ir35` — metadata not being picked up by Next.js on these routes.

2. **ClaimKit paywall is wrong** — currently gates the letter itself at £9.99. Should show the letter free, then offer FOS escalation pack (£9.99) as the paid upsell.

3. **IR35 paywall is wrong** — the £9.99 status letter is just a printout of answers. Remove it. Add Awin contractor insurance CTA (PI + Public Liability) after the result instead.

## Git workflow

- Branch: `feat/<name>`, `fix/<name>`, `chore/<name>`
- Commits: conventional (`feat:`, `fix:`, `chore:`, `refactor:`)
- Always run `npm run build` before committing
- Push and deploy: `git push && vercel --prod --yes`
- Never commit `.env*` files

## Build + deploy

```bash
npm run dev          # local dev
npm run build        # production build check
npm run lint         # lint
vercel --prod --yes  # deploy to production
```

## LESSONS

- shadcn v4 uses base-ui — `asChild` not available on Button. Use `render` prop.
- Metadata export only works in server components. Split client state into child components.
- `?preview=1` bypass for paywalls only works when wizard state is already populated (client-side). It doesn't pre-fill form state from URL.
- `gitnexus analyze` must be re-run after significant file additions to keep the knowledge graph current.
