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

const FOS_REASON_PARAGRAPHS: Record<ClaimReason, string> = {
  "not-delivered":
    "The merchant failed to deliver the goods/service I paid for. Despite payment being made in full, {merchantName} has not provided what was agreed.",
  administration:
    "The merchant, {merchantName}, has entered administration/closed down without fulfilling their contractual obligation. My funds are at risk.",
  "not-as-described":
    "The goods/service provided by {merchantName} were significantly not as described at the point of sale, constituting a misrepresentation under the Misrepresentation Act 1967.",
  "faulty-refused":
    "The goods provided by {merchantName} were faulty. Despite my request for a remedy, {merchantName} has refused to provide a repair, replacement, or refund as required under the Consumer Rights Act 2015.",
  "service-not-completed":
    "The service contracted with {merchantName} was not completed to the agreed standard, representing a material breach of contract.",
}

const FOS_BREACH_SENTENCES: Record<ClaimReason, string> = {
  "not-delivered":
    "The merchant failed to deliver the goods/service that I paid for, constituting a clear breach of contract.",
  administration:
    "The merchant ceased trading without fulfilling their contractual obligation, leaving me without the goods/services I paid for.",
  "not-as-described":
    "The goods/service received were significantly not as described, constituting misrepresentation under the Misrepresentation Act 1967.",
  "faulty-refused":
    "The goods received were faulty and the merchant refused a remedy, breaching the Consumer Rights Act 2015.",
  "service-not-completed":
    "The service was not completed to the agreed standard, representing a material breach of the contract.",
}

const FOS_MERCHANT_CONTACT_SENTENCES: Record<MerchantContactStatus, string> = {
  no: "I have not yet contacted the merchant as I understand my right to claim directly against the credit provider under Section 75 is independent of any action against the merchant.",
  yes: "I contacted {merchantName} prior to raising this claim. They were unable to resolve the matter satisfactorily.",
  "yes-refused":
    "I contacted {merchantName} prior to raising this claim. They refused to provide any remedy.",
}

export function generateFOSLetter(data: Section75FormData): string {
  const date = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const provider = data.cardProvider || "[Card Provider]"
  const merchant = data.merchantName || "[Merchant Name]"
  const amount = data.amount || "[X]"

  const reasonParagraph = FOS_REASON_PARAGRAPHS[data.reason].replaceAll(
    "{merchantName}",
    merchant
  )

  const breachSentence = FOS_BREACH_SENTENCES[data.reason]

  const contactSentence = FOS_MERCHANT_CONTACT_SENTENCES[
    data.merchantContacted
  ].replaceAll("{merchantName}", merchant)

  return `[Your Name]
[Your Address]
${date}

Financial Ombudsman Service
Exchange Tower
London E14 9SR
complaints@financial-ombudsman.org.uk

Dear Sir/Madam,

Re: Complaint against ${provider} — Ref: Section 75 Claim, ${merchant}, £${amount}

I am writing to bring a formal complaint against ${provider} regarding their handling of my Section 75 claim under the Consumer Credit Act 1974, and to request the Financial Ombudsman Service investigates this matter.

BACKGROUND

On ${formatDate(data.paymentDate)}, I paid £${amount} to ${merchant} using my ${provider} credit card for: ${data.purchaseDescription || "[Description of purchase]"}.

${reasonParagraph}

I submitted a formal Section 75 claim to ${provider} on the basis that, as a credit provider, they are jointly and severally liable under Section 75(1) of the Consumer Credit Act 1974.

${provider}'s response was unsatisfactory. ${contactSentence}

WHY I BELIEVE ${provider}'S POSITION IS INCORRECT

Under Section 75 of the Consumer Credit Act 1974, the credit provider bears equal liability with the supplier for any misrepresentation or breach of contract. This liability is strict — it does not require negligence or fault on the part of the credit provider.

The facts of my case clearly establish a breach of contract: ${breachSentence}

I therefore request that the Financial Ombudsman Service:
1. Investigates ${provider}'s refusal to honour their Section 75 liability
2. Directs ${provider} to credit my account with £${amount}
3. Considers whether ${provider}'s handling of my complaint was fair and reasonable

I am available to provide further documentation as required.

Yours faithfully,
[Your Name]
[Your Address]
[Your Phone Number]
[Your Email Address]
[Your ${provider} account — last 4 digits: XXXX]

Enc: Copy of original Section 75 letter sent to ${provider}
     [Any correspondence from ${provider}]`
}

export { REASON_LABELS }
