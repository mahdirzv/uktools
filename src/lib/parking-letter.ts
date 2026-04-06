export type GroundKey =
  | "SIGNS_MARKINGS"
  | "PAYMENT_FAULTY"
  | "LOADING"
  | "PASSENGER"
  | "BREAKDOWN"
  | "BLUE_BADGE"
  | "CONSENT"
  | "PCN_ERROR"
  | "MEDICAL"
  | "SOLD"
  | "OTHER"

export const GROUND_LABELS: Record<GroundKey, string> = {
  SIGNS_MARKINGS: "The signs or road markings were not clearly visible or adequate",
  PAYMENT_FAULTY: "I paid correctly but the machine, app, or meter was faulty",
  LOADING: "I was loading or unloading goods (exemption applies)",
  PASSENGER: "I was picking up or dropping off a passenger",
  BREAKDOWN: "The vehicle had broken down",
  BLUE_BADGE: "I hold a Blue Badge and displayed it correctly",
  CONSENT: "The vehicle was taken without my knowledge or consent",
  PCN_ERROR: "The PCN contains an error (wrong date, time, or registration)",
  MEDICAL: "I had a medical emergency",
  SOLD: "I was not the driver and have since sold / transferred the vehicle",
  OTHER: "Other reason",
}

const GROUND_PARAGRAPHS: Partial<Record<GroundKey, string>> = {
  SIGNS_MARKINGS:
    "At the time of the alleged contravention, the signs and/or road markings were not sufficiently clear or visible to indicate the parking restriction in force. I would ask you to provide photographic evidence of the signage in place at the time.",
  PAYMENT_FAULTY:
    "I made a valid attempt to pay for parking at the time of the alleged contravention. However, the payment machine / payment app was faulty and failed to process my payment correctly. I have [evidence — e.g. bank records / screenshots] demonstrating my payment attempt.",
  LOADING:
    "At the time of the alleged contravention I was engaged in a continuous process of loading and unloading goods to/from the vehicle. Loading and unloading is a statutory exemption to the parking restriction in force at this location.",
  PASSENGER:
    "At the time of the alleged contravention I was picking up or setting down a passenger. This activity took only a brief period and I did not leave the vehicle unattended.",
  BREAKDOWN:
    "At the time of the alleged contravention the vehicle had suffered a mechanical breakdown and was unable to be moved. I was in the process of arranging recovery. I can provide [evidence — e.g. recovery service records, AA/RAC callout confirmation] on request.",
  BLUE_BADGE:
    "I am the holder of a valid Blue Badge (number: [to be completed]) which was displayed correctly and prominently in the vehicle at the time of the alleged contravention.",
  CONSENT:
    "The vehicle was taken and used without my knowledge or consent at the time of the alleged contravention. I reported this matter to the police [reference number if available].",
  PCN_ERROR:
    "The Penalty Charge Notice contains an error. [Describe specific error — wrong date / time / registration]. This error renders the notice invalid.",
  MEDICAL:
    "At the time of the alleged contravention there was a medical emergency involving [myself / a passenger] which necessitated stopping the vehicle at that location.",
  SOLD:
    "I was not the driver of the vehicle at the time of the alleged contravention. I transferred ownership of the vehicle on [date] to [name — optional] and am therefore not liable for this charge.",
}

export interface LetterData {
  pcnRef: string
  dateOfIssue: string
  registration: string
  council: string
  grounds: GroundKey[]
  otherReason: string
  description: string
}

export function generateAppealLetter(data: LetterData): string {
  const today = new Date().toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  })

  const groundParagraphs = data.grounds
    .filter((g) => g !== "OTHER")
    .map((g) => GROUND_PARAGRAPHS[g])
    .filter(Boolean)
    .join("\n\n")

  const otherPara =
    data.grounds.includes("OTHER") && data.otherReason.trim()
      ? data.otherReason.trim()
      : ""

  const descriptionPara = data.description.trim()

  const bodyParts = [groundParagraphs, otherPara, descriptionPara]
    .filter(Boolean)
    .join("\n\n")

  return `${today}

Parking Appeals
${data.council}
[Use address shown on your PCN]

Dear Sir/Madam,

Re: Penalty Charge Notice ${data.pcnRef} — Vehicle Registration ${data.registration}
PCN issued: ${data.dateOfIssue}

I am writing to make an informal challenge to the above Penalty Charge Notice.

${bodyParts}

I therefore respectfully request that this Penalty Charge Notice be cancelled.

If you are unable to cancel this notice at the informal stage, please send me a Notice to Owner so that I may make a formal representation.

I would be grateful for a response within 28 days.

Yours faithfully,
[Your name]
[Your address]
[Your email / phone]`
}
