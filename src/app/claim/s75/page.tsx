import type { Metadata } from "next"
import { S75Wizard } from "@/components/claim/S75Wizard"

export const metadata: Metadata = {
  title: "Section 75 Claim Letter Builder UK | Free Template 2026",
  description:
    "Build your Section 75 claim letter in 2 minutes. Based on the Consumer Credit Act 1974. Works when merchants fail to deliver or go bust.",
}

export default function Section75Page() {
  return <S75Wizard />
}
