# ClaimKit — Build Spec

## What to build

A tool at `/claim` that helps UK consumers exercise their legal rights to recover money. Two flows: Section 75 (credit card) and Chargeback (debit/credit card). Generates a ready-to-send letter. Revenue: £9.99 one-time payment to download the full letter pack.

## Stack
- Next.js 15 App Router, TypeScript, Tailwind, shadcn/ui
- No database. No auth. Client-side logic only.
- Stripe payment for letter download (or Lemon Squeezy — use a placeholder/mock for now, mark TODO)

## Routes

### `/claim` — landing page with two paths

---

## Flow 1: Section 75 Claim (credit card, £100–£30,000)

Section 75 of the Consumer Credit Act 1974: if you paid by **credit card** for goods/services between £100 and £30,000 and the merchant fails to deliver, goes bust, or the goods are faulty, your **credit card company is equally liable**.

### Step-by-step wizard (multi-step form, progress bar at top):

**Step 1: What happened?**
Radio buttons:
- Merchant didn't deliver goods/service
- Merchant went into administration / closed down
- Goods/service significantly not as described
- Goods faulty and merchant refused refund
- Service not completed to agreed standard

**Step 2: Payment details**
- How did you pay? → Credit card (this is Section 75) / Debit card or credit card under £100 (→ redirect to Chargeback flow)
- Amount paid: £___
- Date of payment: date picker
- Your card provider: dropdown (Barclays, HSBC, Lloyds, NatWest, Santander, Halifax, Nationwide, American Express, Monzo, Starling, Other)

**Step 3: Merchant details**
- Merchant / company name
- Brief description of what was purchased (text area, 1–2 sentences)
- Have you already contacted the merchant? Yes / No / Yes and they refused

**Step 4: Preview (paywall)**
Show a blurred/redacted preview of the generated letter. Show:
- Letter structure (headings visible, body text blurred)
- "Your letter includes: ✓ Section 75 legal basis ✓ Timeline and escalation path ✓ FOS escalation instructions"
- Price: £9.99
- CTA: "Download your claim pack" → payment (placeholder/TODO for Stripe)

**Generated letter content (shown after payment):**

```
[Your Name]
[Your Address]
[Date]

The Customer Services Manager
[Bank Name]
[Bank Address — user told to look this up]

Dear Sir/Madam,

Re: Section 75 Claim — [Merchant Name] — Amount: £[X]

I am writing to make a formal claim under Section 75 of the Consumer Credit Act 1974 in respect of a purchase made using my [Bank Name] credit card.

Details of the purchase:
- Merchant: [Merchant Name]
- Amount: £[X]
- Date of payment: [Date]
- Nature of purchase: [Description]

The reason for my claim is: [Reason selected in Step 1 — expanded into a sentence].

Under Section 75 of the Consumer Credit Act 1974, you are jointly and severally liable with the supplier for breaches of contract and misrepresentation. This liability is not dependent on you being at fault.

I have [already contacted the merchant / not yet contacted the merchant — adapt based on Step 3]. [If contacted: They have refused to resolve the matter / failed to respond.]

I therefore request that you credit my account with £[X] within 8 weeks.

If I do not receive a satisfactory response within 8 weeks of this letter, I reserve the right to escalate this matter to the Financial Ombudsman Service (FOS) at no cost to me.

Please acknowledge receipt of this claim.

Yours faithfully,
[Your Name]
[Your account number — last 4 digits for reference]
[Your contact email]
```

---

## Flow 2: Chargeback (debit card or credit card under £100)

Simplified 3-step wizard.

**Step 1:** What happened? (same options as above)
**Step 2:** Card type, amount, date, merchant
**Step 3:** Preview → £9.99 to download

Letter is simpler — references Visa/Mastercard chargeback scheme rules, not statute.

```
Dear Sir/Madam,

Re: Chargeback Request — [Merchant] — £[X] — Transaction Date [Date]

I am writing to request a chargeback on the above transaction under [Visa/Mastercard] scheme rules.

[Reason paragraph based on selected reason]

I request that you raise a chargeback dispute for the amount of £[X] with [Merchant].

Please acknowledge this request within 5 working days.
```

---

## Landing page `/claim`

### Hero section:
**Headline:** "Get your money back. Draft your claim letter in 2 minutes."
**Subheadline:** "Section 75 and chargeback claims — the UK's most underused consumer rights, made simple."

**Two cards:**
1. "Section 75 claim" — Paid by credit card, £100–£30,000 → Start →
2. "Chargeback" → Start →

### Below hero: 3 trust points
- ✓ Based on Consumer Credit Act 1974
- ✓ Works against any UK credit card issuer
- ✓ If refused, escalate free to the Financial Ombudsman

### FAQ section (static, for SEO):
- What is Section 75?
- How long does a Section 75 claim take?
- What if the bank refuses my claim?
- What's the difference between Section 75 and chargeback?
- Is this legal advice? (No — information only, disclaimer)

---

## SEO metadata

```typescript
export const metadata = {
  title: 'Section 75 Claim Letter Builder UK | Free Template + Guide',
  description: 'Build your Section 75 or chargeback claim letter in 2 minutes. Based on the Consumer Credit Act 1974. Used when merchants fail to deliver or go bust.',
}
```

---

## Disclaimer (footer of every page)

> This tool provides general legal information, not legal advice. It does not constitute a legal advice relationship. For complex disputes, consult a solicitor.

---

## Payment (placeholder for now)

Add a `PaymentPlaceholder` component that shows the £9.99 price, a disabled "Pay £9.99" button, and a TODO comment:
```tsx
{/* TODO: Wire Stripe or LemonSqueezy payment. On success, reveal <LetterDownload letter={generatedLetter} /> */}
```

For MVP: add a dev bypass — if `?preview=1` in URL, show the letter without payment. Remove before launch.

---

## File structure

```
src/app/claim/
  page.tsx              ← landing with two flow cards + FAQ
  s75/
    page.tsx            ← Section 75 wizard
  chargeback/
    page.tsx            ← Chargeback wizard

src/lib/
  claim-generator.ts    ← generates letter text from form state

src/components/claim/
  ClaimWizard.tsx       ← multi-step form shell with progress bar
  LetterPreview.tsx     ← blurred preview + paywall
  PaymentPlaceholder.tsx
  FaqAccordion.tsx
```

---

## Done criteria

1. `/claim` loads with two flow cards and FAQ
2. Section 75 wizard: all 4 steps work, letter generates with correct variables
3. Chargeback wizard: all 3 steps work
4. Paywall shows blurred preview + £9.99 CTA (payment TODO)
5. `?preview=1` bypass shows full letter for dev testing
6. `npm run build` passes
7. Commit to `feat/claimkit`
