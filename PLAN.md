# uktools — Production Hardening Plan
**Date:** 6 April 2026 | **Status:** In progress

---

## What's wrong right now

| Area | Issue | Impact |
|------|-------|--------|
| FOS data | Using 2023/24 estimates | Wrong per-bank figures shown to users |
| S75 validation | No amount guards | Users get S75 letter for £50 purchase (invalid) |
| CrimeCheck | Raw counts, no context | 200 crimes means nothing without a benchmark |
| IR35 | Missing MOO question | Misses CEST's known blind spot — not better |
| Stamp duty animation | Shows old 0-250k bands | Video contradicts the fixed calculator |
| Stripe | PaymentPlaceholder disabled | £0 revenue from FOS pack |
| Crime data age | No date shown | Users don't know data is 2-3 months old |
| TrustCheck | No CCJ signal | Companies House alone isn't due diligence |

---

## Sprint 1 — Data accuracy + trust signals (this session)

### TICKET-007: Update FOS data to real H2 2024 figures
Real source: FOS Business Complaints Data H2 2024 (Jul–Dec 2024)
Published: 6 May 2025 | URL: financial-ombudsman.org.uk

Banking & Credit upheld rates H2 2024:
- Barclays: 38%
- HSBC: 33%
- Lloyds: 34%
- Halifax (Bank of Scotland): 31%
- NatWest: 37%
- Santander: 35%
- Nationwide: 27%
- Monzo: 39%
- Starling: 22%
- American Express: 30%

### TICKET-008: S75 amount validation
- Amount < £100: redirect to chargeback with explanation
- Amount > £30,000: warning + "may need legal advice"
- Non-numeric input: inline error

### TICKET-009: CrimeCheck — add context layer
- Show "X% above/below England & Wales average" for total crime
- Show Police API data date ("Data covers [month] [year]")
- Use national rates from Police API /crime-categories + ONS data

### TICKET-010: IR35 — add Mutuality of Obligation question
CEST's known gap. Add as question 4 in the checker:
"Is there an ongoing obligation for the client to offer work and for you to accept it?"
- No (each project discrete) → Outside signal
- Yes (expected continuation) → Inside signal
Update scorer to include MOO weight.

---

## Sprint 2 — Revenue + differentiation

### TICKET-011: Stripe for FOS Escalation Pack
Needs: STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET, NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
- Create /api/checkout/fos-pack route
- One-time £9.99 product
- On success: redirect to /claim/success?session_id=...
- On success page: show FOS letter + evidence checklist

### TICKET-012: TrustCheck — add company age signal
- "Incorporated X years ago" in plain English
- Accounts status in plain English ("Accounts up to date" / "OVERDUE")
- Director tenure ("serving for X years")
- Flag companies < 12 months old prominently

---

## What needs external action (not code)

| Item | Action needed |
|------|--------------|
| Custom domain | Buy uktools.co.uk (~£10/yr, Vercel DNS) |
| Stripe keys | Create Stripe account + add keys to Vercel |
| Awin approvals | Chase GoCompare, L&C, AnyVan, contractor insurance |
| FOS data update | Re-run annually when FOS publishes H1/H2 data |

---

## Tickets delegated to OpenCode this session
- TICKET-007 ✅ pending
- TICKET-008 ✅ pending
- TICKET-009 ✅ pending
- TICKET-010 ✅ pending
- TICKET-012 ✅ pending
