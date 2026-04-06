export interface DayRateInputs {
  targetSalary: number
  billableDays: number
  employerNIRate: number
  pensionRate: number
  ir35Status: "outside" | "inside"
  vatRegistered: boolean
}

export interface DayRateBreakdown {
  targetSalary: number
  employerNI: number
  pensionContribution: number
  downtimeBuffer: number
  ltdCosts: number
  grossNeeded: number
  dayRate: number
  weeklyRate: number
  annualContract: number
  billableDays: number
  ir35Status: "outside" | "inside"
  vatRegistered: boolean
}

const NI_THRESHOLD = 9100

export function calculateDayRate(inputs: DayRateInputs): DayRateBreakdown {
  const {
    targetSalary,
    billableDays,
    employerNIRate,
    pensionRate,
    ir35Status,
    vatRegistered,
  } = inputs

  if (ir35Status === "inside") {
    const grossNeeded = targetSalary / 0.68
    const dayRate = grossNeeded / billableDays

    return {
      targetSalary,
      employerNI: 0,
      pensionContribution: 0,
      downtimeBuffer: 0,
      ltdCosts: 0,
      grossNeeded,
      dayRate,
      weeklyRate: dayRate * 5,
      annualContract: dayRate * billableDays,
      billableDays,
      ir35Status,
      vatRegistered,
    }
  }

  // Outside IR35 (Ltd Co)
  const niableSalary = Math.max(0, targetSalary - NI_THRESHOLD)
  const employerNI = niableSalary * (employerNIRate / 100)
  const pensionContribution = targetSalary * (pensionRate / 100)
  const downtimeBuffer = targetSalary * 0.2
  const ltdCosts = 2000

  const grossNeeded =
    targetSalary + employerNI + pensionContribution + downtimeBuffer + ltdCosts

  const dayRate = grossNeeded / billableDays

  return {
    targetSalary,
    employerNI,
    pensionContribution,
    downtimeBuffer,
    ltdCosts,
    grossNeeded,
    dayRate,
    weeklyRate: dayRate * 5,
    annualContract: dayRate * billableDays,
    billableDays,
    ir35Status,
    vatRegistered,
  }
}

export const DEFAULT_INPUTS: DayRateInputs = {
  targetSalary: 50000,
  billableDays: 220,
  employerNIRate: 13.8,
  pensionRate: 5,
  ir35Status: "outside",
  vatRegistered: false,
}
