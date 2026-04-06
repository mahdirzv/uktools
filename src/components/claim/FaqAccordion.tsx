import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const FAQ_ITEMS = [
  {
    question: "What is Section 75?",
    answer:
      "Section 75 of the Consumer Credit Act 1974 makes your credit card provider jointly liable with the retailer for breaches of contract or misrepresentation on purchases between £100 and £30,000. This means if a merchant fails to deliver, goes bust, or sells you faulty goods, you can claim against your credit card company.",
  },
  {
    question: "How long does a Section 75 claim take?",
    answer:
      "Your card provider has 8 weeks to respond to your claim. Most banks aim to resolve claims within 4–6 weeks. If they reject your claim or fail to respond within 8 weeks, you can escalate to the Financial Ombudsman Service (FOS) for free.",
  },
  {
    question: "What if the bank refuses my claim?",
    answer:
      "If your bank refuses your Section 75 claim, you can escalate to the Financial Ombudsman Service (FOS) at no cost. The FOS is an independent body that resolves disputes between consumers and financial businesses. They will review your case and can order the bank to pay.",
  },
  {
    question: "What's the difference between Section 75 and chargeback?",
    answer:
      "Section 75 is a legal right under the Consumer Credit Act 1974 — it only applies to credit card purchases between £100 and £30,000. Chargeback is a voluntary scheme run by card networks (Visa, Mastercard) that applies to both debit and credit cards for any amount. Section 75 is stronger because it's backed by law, while chargeback is at the card network's discretion.",
  },
  {
    question: "Is this legal advice?",
    answer:
      "No. This tool provides general legal information to help you exercise your consumer rights. It does not constitute legal advice and does not create a solicitor-client relationship. For complex disputes or high-value claims, we recommend consulting a solicitor.",
  },
]

export function FaqAccordion() {
  return (
    <Accordion>
      {FAQ_ITEMS.map((item) => (
        <AccordionItem key={item.question} value={item.question}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>
            <p className="text-muted-foreground">{item.answer}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
