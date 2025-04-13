"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

interface Transaction {
  id: string
  name: string
  email: string
  amount: string
  status: "completed" | "pending" | "failed"
  date: string
}

const transactions: Transaction[] = [
  {
    id: "1",
    name: "John Smith",
    email: "john@example.com",
    amount: "$350.00",
    status: "completed",
    date: "2023-04-01",
  },
  {
    id: "2",
    name: "Maria Garcia",
    email: "maria@example.com",
    amount: "$125.50",
    status: "pending",
    date: "2023-04-02",
  },
  {
    id: "3",
    name: "Robert Johnson",
    email: "robert@example.com",
    amount: "$450.00",
    status: "completed",
    date: "2023-04-03",
  },
  {
    id: "4",
    name: "Lisa Chen",
    email: "lisa@example.com",
    amount: "$200.00",
    status: "failed",
    date: "2023-04-04",
  },
  {
    id: "5",
    name: "Michael Brown",
    email: "michael@example.com",
    amount: "$750.00",
    status: "completed",
    date: "2023-04-05",
  },
]

export function RecentTransactions({ extended = false }: { extended?: boolean }) {
  const displayTransactions = extended ? transactions : transactions.slice(0, 4)

  return (
    <div className="space-y-4">
      {displayTransactions.map((transaction) => (
        <div key={transaction.id} className="flex items-center gap-4">
          <Avatar className="h-9 w-9">
            <AvatarImage src={`/placeholder.svg?height=36&width=36`} alt={transaction.name} />
            <AvatarFallback>{transaction.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <p className="text-sm font-medium leading-none">{transaction.name}</p>
            <p className="text-sm text-muted-foreground">{transaction.email}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-medium">{transaction.amount}</p>
            <Badge
              variant={
                transaction.status === "completed"
                  ? "default"
                  : transaction.status === "pending"
                    ? "outline"
                    : "destructive"
              }
            >
              {transaction.status}
            </Badge>
          </div>
        </div>
      ))}
      {!extended && (
        <Button variant="outline" className="w-full">
          View All
        </Button>
      )}
    </div>
  )
}

