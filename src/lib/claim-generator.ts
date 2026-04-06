export type ClaimReason =
  | "not-delivered"
  | "administration"
  | "not-as-described"
  | "faulty-refused"
  | "service-not-completed"

export type MerchantContactStatus = "yes" | "no" | "yes-refused"

export type CardProvider =
  | "Barclays"
  | "HSBC"
  | "Lloyds"
  | "NatWest"
  | "Santander"
  | "Halifax"
  | "Nationwide"
  | "American Express"
  | "Monzo"
  | "Starling"
  | "Other"

export interface Section75FormData {
  reason: ClaimReason
  paymentMethod: "credit" | "debit-or-under-100"
  amount: string
  paymentDate: string
  cardProvider: CardProvider | ""
  merchantName: string
  purchaseDescription: string
  merchantContacted: MerchantContactStatus
}

export interface ChargebackFormData {
  reason: ClaimReason
  cardType: "debit" | "credit"
  cardNetwork: "Visa" | "Mastercard" | ""
  amount: string
  paymentDate: string
  merchantName: string
  cardProvider: CardProvider | ""
}

const REASON_LABELS: Record<ClaimReason, string> = {
  "not-delivered": "Merchant didn't deliver goods/service",
  administration: "Merchant went into administration / closed down",
  "not-as-described": "Goods/service significantly not as described",
  "faulty-refused": "Goods faulty and merchant refused refund",
  "service-not-completed": "Service not completed to agreed standard",
}

const REASON_SENTENCES: Record<ClaimReason, string> = {
  "not-delivered":
    "The merchant failed to deliver the goods/service that I paid for.",
  administration:
    "The merchant has gone into administration/ceased trading, and I have not received the goods or services I paid for.",
  "not-as-described":
    "The goods/service received were significantly not as described at the point of sale.",
  "faulty-refused":
    "The goods received were faulty, and the merchant has refused to provide a refund or replacement.",
  "service-not-completed":
    "The service was not completed to the agreed standard as set out at the time of purchase.",
}

function formatDate(dateStr: string): string {
  if (!dateStr) return "[Date]"
  const d = new Date(dateStr)
  return d.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })
}

function merchantContactSentence(status: MerchantContactStatus): string {
  switch (status) {
    case "yes":
      return "I have already contacted the merchant regarding this matter. They have failed to respond satisfactorily."
    case "yes-refused":
      return "I have already contacted the merchant regarding this matter. They have refused to resolve the issue."
    case "no":
      return "I have not yet contacted the merchant directly, as I believe the matter falls squarely within your obligations under Section 75."
  }
}

export function generateSection75Letter(data: Section75FormData): string {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return `[Your Name]
[Your Address]
${date}

The Customer Services Manager
${data.cardProvider || "[Bank Name]"}
[Bank Address — please look this up on your provider's website]

Dear Sir/Madam,

Re: Section 75 Claim — ${data.merchantName || "[Merchant Name]"} — Amount: £${data.amount || "[X]"}

I am writing to make a formal claim under Section 75 of the Consumer Credit Act 1974 in respect of a purchase made using my ${data.cardProvider || "[Bank Name]"} credit card.

Details of the purchase:
- Merchant: ${data.merchantName || "[Merchant Name]"}
- Amount: £${data.amount || "[X]"}
- Date of payment: ${formatDate(data.paymentDate)}
- Nature of purchase: ${data.purchaseDescription || "[Description]"}

The reason for my claim is: ${REASON_SENTENCES[data.reason]}

Under Section 75 of the Consumer Credit Act 1974, you are jointly and severally liable with the supplier for breaches of contract and misrepresentation. This liability is not dependent on you being at fault.

${merchantContactSentence(data.merchantContacted)}

I therefore request that you credit my account with £${data.amount || "[X]"} within 8 weeks.

If I do not receive a satisfactory response within 8 weeks of this letter, I reserve the right to escalate this matter to the Financial Ombudsman Service (FOS) at no cost to me.

Please acknowledge receipt of this claim.

Yours faithfully,
[Your Name]
[Your account number — last 4 digits for reference]
[Your contact email]`
}

export function generateChargebackLetter(data: ChargebackFormData): string {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const network = data.cardNetwork || "Visa/Mastercard"

  return `[Your Name]
[Your Address]
${date}

The Customer Services Manager
${data.cardProvider || "[Bank Name]"}
[Bank Address — please look this up on your provider's website]

Dear Sir/Madam,

Re: Chargeback Request — ${data.merchantName || "[Merchant]"} — £${data.amount || "[X]"} — Transaction Date ${formatDate(data.paymentDate)}

I am writing to request a chargeback on the above transaction under ${network} scheme rules.

${REASON_SENTENCES[data.reason]}

I request that you raise a chargeback dispute for the amount of £${data.amount || "[X]"} with ${data.merchantName || "[Merchant]"}.

Please acknowledge this request within 5 working days.

Yours faithfully,
[Your Name]
[Your account number — last 4 digits for reference]
[Your contact email]`
}

export interface FOSEscalationData {
  bankName: string
  claimDate: string
  amount: string
  merchantName: string
  paymentDate: string
  reason: ClaimReason
}

export function generateFOSEscalationLetter(data: FOSEscalationData): string {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  return `[Your Name]
[Your Address]
${date}

Financial Ombudsman Service
Exchange Tower
London E14 9SR

Dear Sir/Madam,

Re: Complaint against ${data.bankName || "[Bank Name]"} — Section 75 Claim Reference

I am writing to bring a formal complaint against ${data.bankName || "[Bank Name]"} regarding their handling of my Section 75 claim under the Consumer Credit Act 1974.

I made a Section 75 claim on ${formatDate(data.claimDate)} in relation to a purchase of £${data.amount || "[X]"} from ${data.merchantName || "[Merchant]"} on ${formatDate(data.paymentDate)}.

${data.bankName || "[Bank Name]"} rejected my claim on [rejection date — or: has failed to respond within 8 weeks].

I believe this rejection is incorrect because: ${REASON_SENTENCES[data.reason]}

I am seeking: a refund of £${data.amount || "[X]"} to my credit card account.

I have attached:
- Copy of original Section 75 letter sent to bank
- Bank's rejection letter (if received)

Please acknowledge receipt of this complaint.

Yours faithfully,
[Your Name]
[Your reference number from bank, if given]`
}

export { REASON_LABELS }
