"use client"

import { useState } from "react"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { StampDutyCalc } from "@/components/moving/StampDutyCalc"
import { MovingChecklist } from "@/components/moving/MovingChecklist"
import { UtilitySwitchHub } from "@/components/moving/UtilitySwitchHub"

const TAB_VALUES = { calculate: "calculate", checklist: "checklist", switch: "switch" } as const

export function MovingTabs() {
  const [activeTab, setActiveTab] = useState<string>(TAB_VALUES.calculate)

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-8">
      <TabsList className="w-full">
        <TabsTrigger value={TAB_VALUES.calculate}>Calculate</TabsTrigger>
        <TabsTrigger value={TAB_VALUES.checklist}>Checklist</TabsTrigger>
        <TabsTrigger value={TAB_VALUES.switch}>Switch</TabsTrigger>
      </TabsList>
      <TabsContent value={TAB_VALUES.calculate} className="mt-6">
        <StampDutyCalc switchTabAction={() => setActiveTab(TAB_VALUES.switch)} />
      </TabsContent>
      <TabsContent value={TAB_VALUES.checklist} className="mt-6">
        <MovingChecklist />
      </TabsContent>
      <TabsContent value={TAB_VALUES.switch} className="mt-6">
        <UtilitySwitchHub />
      </TabsContent>
    </Tabs>
  )
}
