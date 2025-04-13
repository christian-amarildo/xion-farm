"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/language-provider"

interface Investment {
  id: string
  name: string
  farmer: string
  location: string
  amount: number
  target: number
  roi: string
  duration: string
  risk: "low" | "medium" | "high"
  status: "active" | "completed" | "funding"
  description: string
  image: string
}

const investments: Investment[] = [
  {
    id: "1",
    name: "Sustainable Corn Farm Expansion",
    farmer: "Green Valley Farms",
    location: "Iowa, USA",
    amount: 35000,
    target: 50000,
    roi: "8-12%",
    duration: "18 months",
    risk: "medium",
    status: "funding",
    description: "Help expand our sustainable corn farm with new irrigation systems and organic fertilization methods.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "2",
    name: "Organic Vegetable Greenhouse",
    farmer: "Sunshine Produce",
    location: "California, USA",
    amount: 75000,
    target: 100000,
    roi: "10-15%",
    duration: "24 months",
    risk: "medium",
    status: "funding",
    description: "Investment in a new greenhouse for year-round organic vegetable production using solar power.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "3",
    name: "Grass-fed Cattle Ranch Expansion",
    farmer: "Rancho Verde",
    location: "Texas, USA",
    amount: 120000,
    target: 150000,
    roi: "7-9%",
    duration: "36 months",
    risk: "low",
    status: "active",
    description:
      "Supporting the expansion of our grass-fed cattle operation with additional grazing land and improved facilities.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "4",
    name: "Dairy Farm Modernization",
    farmer: "Happy Cow Dairy",
    location: "Wisconsin, USA",
    amount: 200000,
    target: 200000,
    roi: "9-11%",
    duration: "30 months",
    risk: "low",
    status: "active",
    description: "Modernizing our dairy farm with automated milking systems and improved animal welfare facilities.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "5",
    name: "Free-range Poultry Farm",
    farmer: "Sunrise Poultry",
    location: "Georgia, USA",
    amount: 45000,
    target: 60000,
    roi: "11-14%",
    duration: "12 months",
    risk: "medium",
    status: "funding",
    description: "Expanding our free-range poultry operation with new housing and organic feed production.",
    image: "/placeholder.svg?height=200&width=200",
  },
  {
    id: "6",
    name: "Apiary Expansion Project",
    farmer: "Busy Bee Apiaries",
    location: "Montana, USA",
    amount: 25000,
    target: 25000,
    roi: "12-16%",
    duration: "24 months",
    risk: "high",
    status: "completed",
    description: "Successfully expanded our honey production with new hives and processing equipment.",
    image: "/placeholder.svg?height=200&width=200",
  },
]

export default function InvestmentsPage() {
  const { t } = useLanguage()
  const [activeTab, setActiveTab] = useState("opportunities")

  const opportunities = investments.filter((inv) => inv.status === "funding")
  const activeInvestments = investments.filter((inv) => inv.status === "active")
  const completedInvestments = investments.filter((inv) => inv.status === "completed")

  const getRiskBadgeVariant = (risk: "low" | "medium" | "high") => {
    switch (risk) {
      case "low":
        return "default"
      case "medium":
        return "outline"
      case "high":
        return "destructive"
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investments</h1>
          <p className="text-muted-foreground">Invest in sustainable agriculture projects and earn returns.</p>
        </div>
      </div>

      <Tabs defaultValue="opportunities" className="space-y-4" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="opportunities">Investment Opportunities</TabsTrigger>
          <TabsTrigger value="active">Active Investments</TabsTrigger>
          <TabsTrigger value="completed">Completed Investments</TabsTrigger>
        </TabsList>

        <TabsContent value="opportunities" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {opportunities.map((investment) => (
              <Card key={investment.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={investment.image || "/placeholder.svg"}
                    alt={investment.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{investment.name}</CardTitle>
                  <CardDescription>
                    {investment.farmer} • {investment.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Progress</span>
                      <span className="font-medium">
                        ${investment.amount.toLocaleString()} / ${investment.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={(investment.amount / investment.target) * 100} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expected ROI</p>
                      <p className="font-medium">{investment.roi}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{investment.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Risk Level</p>
                      <Badge variant={getRiskBadgeVariant(investment.risk)}>
                        {investment.risk.charAt(0).toUpperCase() + investment.risk.slice(1)}
                      </Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{investment.description}</p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full">Invest Now</Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="active" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {activeInvestments.map((investment) => (
              <Card key={investment.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={investment.image || "/placeholder.svg"}
                    alt={investment.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{investment.name}</CardTitle>
                  <CardDescription>
                    {investment.farmer} • {investment.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Funding Complete</span>
                      <span className="font-medium">${investment.target.toLocaleString()}</span>
                    </div>
                    <Progress value={100} />
                  </div>

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Expected ROI</p>
                      <p className="font-medium">{investment.roi}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{investment.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Risk Level</p>
                      <Badge variant={getRiskBadgeVariant(investment.risk)}>
                        {investment.risk.charAt(0).toUpperCase() + investment.risk.slice(1)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge>Active</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{investment.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="completed" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {completedInvestments.map((investment) => (
              <Card key={investment.id} className="overflow-hidden">
                <div className="aspect-video relative">
                  <img
                    src={investment.image || "/placeholder.svg"}
                    alt={investment.name}
                    className="object-cover w-full h-full"
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{investment.name}</CardTitle>
                  <CardDescription>
                    {investment.farmer} • {investment.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Total Investment</p>
                      <p className="font-medium">${investment.target.toLocaleString()}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Actual ROI</p>
                      <p className="font-medium">{investment.roi}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Duration</p>
                      <p className="font-medium">{investment.duration}</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Status</p>
                      <Badge variant="outline">Completed</Badge>
                    </div>
                  </div>

                  <p className="text-sm text-muted-foreground line-clamp-2">{investment.description}</p>
                </CardContent>
                <CardFooter>
                  <Button variant="outline" className="w-full">
                    View Report
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

