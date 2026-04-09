"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CATEGORIES, type Category } from "@/lib/subscriptions"

interface AddSubscriptionFormProps {
  onAdd: (sub: { name: string; costPerMonth: number; renewalDate: string; category: Category }) => void
  onCancel: () => void
}

export function AddSubscriptionForm({ onAdd, onCancel }: AddSubscriptionFormProps) {
  const [name, setName] = useState("")
  const [cost, setCost] = useState("")
  const [date, setDate] = useState("")
  const [category, setCategory] = useState<Category>("Entertainment")

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const parsed = parseFloat(cost)
    if (!name.trim() || isNaN(parsed) || parsed <= 0 || !date) return

    onAdd({
      name: name.trim(),
      costPerMonth: parsed,
      renewalDate: date,
      category,
    })
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 rounded-xl border bg-card p-4 ring-1 ring-foreground/10 sm:p-5">
      <div>
        <p className="text-sm font-medium">Add subscription</p>
        <p className="mt-1 text-xs text-muted-foreground">Track renewal dates so you can cancel before charges hit.</p>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sub-name">Name</Label>
          <Input
            id="sub-name"
            placeholder="e.g. Netflix"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sub-cost">Cost per month (£)</Label>
          <Input
            id="sub-cost"
            type="number"
            min="0.01"
            step="0.01"
            placeholder="9.99"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label htmlFor="sub-date">Renewal date</Label>
          <Input
            id="sub-date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <Label>Category</Label>
          <Select value={category} onValueChange={(val) => setCategory(val as Category)}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex gap-2">
        <Button type="submit">Add subscription</Button>
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
