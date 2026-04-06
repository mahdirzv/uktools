export type SubstitutionAnswer = "unrestricted" | "client-approval" | "personal"
export type ControlAnswer = "full-control" | "partial" | "client-control"
export type MutualityAnswer = "discrete" | "expectation" | "ongoing"
export type BinaryAnswer = "outside" | "inside"

export interface IR35Answers {
  substitution?: SubstitutionAnswer
  control?: ControlAnswer
  mutuality?: MutualityAnswer
  ownEquipment?: BinaryAnswer
  financialRisk?: BinaryAnswer
  integrated?: BinaryAnswer
  multipleClients?: BinaryAnswer
}

export type IR35Status = "outside" | "borderline" | "inside"

export interface IR35Result {
  score: number
  status: IR35Status
  outsideFactors: string[]
  insideFactors: string[]
}

function scoreSubstitution(answer: SubstitutionAnswer): {
  score: number
  label: string
  direction: "outside" | "inside" | "neutral"
} {
  switch (answer) {
    case "unrestricted":
      return {
        score: 1,
        label: "Unrestricted right to send a substitute",
        direction: "outside",
      }
    case "client-approval":
      return {
        score: 0,
        label: "Substitution requires client approval",
        direction: "neutral",
      }
    case "personal":
      return {
        score: -1,
        label: "Must personally perform all work",
        direction: "inside",
      }
  }
}

function scoreControl(answer: ControlAnswer): {
  score: number
  label: string
  direction: "outside" | "inside" | "neutral"
} {
  switch (answer) {
    case "full-control":
      return {
        score: 1,
        label: "You decide entirely how work is done",
        direction: "outside",
      }
    case "partial":
      return {
        score: 0,
        label: "Client sets process but you control method",
        direction: "neutral",
      }
    case "client-control":
      return {
        score: -1,
        label: "Client controls hours, location, and methods",
        direction: "inside",
      }
  }
}

function scoreMutuality(answer: MutualityAnswer): {
  score: number
  label: string
  direction: "outside" | "inside" | "neutral"
} {
  switch (answer) {
    case "discrete":
      return {
        score: 1,
        label: "Each project is discrete, no ongoing obligation",
        direction: "outside",
      }
    case "expectation":
      return {
        score: 0,
        label: "Expectation of ongoing work but no contractual obligation",
        direction: "neutral",
      }
    case "ongoing":
      return {
        score: -1,
        label: "Ongoing obligation or rolling contract",
        direction: "inside",
      }
  }
}

function scoreBinary(
  answer: BinaryAnswer,
  outsideLabel: string,
  insideLabel: string
): { score: number; label: string; direction: "outside" | "inside" } {
  if (answer === "outside") {
    return { score: 1, label: outsideLabel, direction: "outside" }
  }
  return { score: -1, label: insideLabel, direction: "inside" }
}

export function calculateIR35(answers: IR35Answers): IR35Result {
  const factors: {
    score: number
    label: string
    direction: "outside" | "inside" | "neutral"
  }[] = []

  if (answers.substitution) {
    factors.push(scoreSubstitution(answers.substitution))
  }
  if (answers.control) {
    factors.push(scoreControl(answers.control))
  }
  if (answers.mutuality) {
    factors.push(scoreMutuality(answers.mutuality))
  }
  if (answers.ownEquipment) {
    factors.push(
      scoreBinary(
        answers.ownEquipment,
        "You use your own equipment",
        "You use client equipment"
      )
    )
  }
  if (answers.financialRisk) {
    factors.push(
      scoreBinary(
        answers.financialRisk,
        "You bear financial risk",
        "No financial risk borne"
      )
    )
  }
  if (answers.integrated) {
    factors.push(
      scoreBinary(
        answers.integrated,
        "Integrated into client organisation",
        "Not integrated into client organisation"
      )
    )
  }
  if (answers.multipleClients) {
    factors.push(
      scoreBinary(
        answers.multipleClients,
        "Multiple clients simultaneously",
        "Exclusively one client"
      )
    )
  }

  const score = factors.reduce((sum, f) => sum + f.score, 0)

  const outsideFactors = factors
    .filter((f) => f.direction === "outside")
    .map((f) => f.label)
  const insideFactors = factors
    .filter((f) => f.direction === "inside")
    .map((f) => f.label)

  let status: IR35Status
  if (score >= 3) {
    status = "outside"
  } else if (score >= 0) {
    status = "borderline"
  } else {
    status = "inside"
  }

  return { score, status, outsideFactors, insideFactors }
}

export function isComplete(answers: IR35Answers): boolean {
  return (
    answers.substitution !== undefined &&
    answers.control !== undefined &&
    answers.mutuality !== undefined &&
    answers.ownEquipment !== undefined &&
    answers.financialRisk !== undefined &&
    answers.integrated !== undefined &&
    answers.multipleClients !== undefined
  )
}
