"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useLanguage } from "@/components/language-provider"
import Image from "next/image"

export default function AiInsightsPage() {
  const { t } = useLanguage()
  const [selectedCrop, setSelectedCrop] = useState("corn")
  const [selectedRegion, setSelectedRegion] = useState("midwest")
  const [selectedTimeframe, setSelectedTimeframe] = useState("3months")

  const crops = [
    { value: "corn", label: "Corn" },
    { value: "wheat", label: "Wheat" },
    { value: "soybeans", label: "Soybeans" },
    { value: "rice", label: "Rice" },
    { value: "cotton", label: "Cotton" },
  ]

  const regions = [
    { value: "midwest", label: "Midwest" },
    { value: "south", label: "South" },
    { value: "west", label: "West" },
    { value: "northeast", label: "Northeast" },
    { value: "global", label: "Global" },
  ]

  const timeframes = [
    { value: "1month", label: "1 Month" },
    { value: "3months", label: "3 Months" },
    { value: "6months", label: "6 Months" },
    { value: "1year", label: "1 Year" },
  ]

  const insights = [
    {
      title: "Price Trend Analysis",
      description: "AI-powered price predictions based on historical data, market trends, and external factors",
      image: "/images/ai-insights.png",
    },
    {
      title: "Yield Optimization",
      description:
        "Recommendations for optimizing crop yields based on soil conditions, weather patterns, and farming practices",
      image: "/images/farm-hero.png",
    },
    {
      title: "Market Demand Forecast",
      description: "Predictions of future market demand for specific crops and agricultural products",
      image: "/images/marketplace.png",
    },
    {
      title: "Risk Assessment",
      description: "Analysis of potential risks including weather events, pests, diseases, and market volatility",
      image: "/images/investment.png",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">AI Insights</h1>
          <p className="text-muted-foreground">Leverage artificial intelligence to optimize your farming decisions</p>
        </div>
        <Button>Export Report</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Select Crop</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger>
                <SelectValue placeholder="Select crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop.value} value={crop.value}>
                    {crop.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Select Region</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedRegion} onValueChange={setSelectedRegion}>
              <SelectTrigger>
                <SelectValue placeholder="Select region" />
              </SelectTrigger>
              <SelectContent>
                {regions.map((region) => (
                  <SelectItem key={region.value} value={region.value}>
                    {region.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Timeframe</CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
              <SelectTrigger>
                <SelectValue placeholder="Select timeframe" />
              </SelectTrigger>
              <SelectContent>
                {timeframes.map((timeframe) => (
                  <SelectItem key={timeframe.value} value={timeframe.value}>
                    {timeframe.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="price" className="space-y-4">
        <TabsList>
          <TabsTrigger value="price">Price Predictions</TabsTrigger>
          <TabsTrigger value="yield">Yield Optimization</TabsTrigger>
          <TabsTrigger value="market">Market Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
        </TabsList>

        <TabsContent value="price" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Price Prediction for {crops.find((c) => c.value === selectedCrop)?.label}</CardTitle>
              <CardDescription>
                AI-powered price forecast for the next {timeframes.find((t) => t.value === selectedTimeframe)?.label} in
                the {regions.find((r) => r.value === selectedRegion)?.label} region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                <div className="text-center p-8 text-muted-foreground">
                  <p>Price Prediction Chart</p>
                  <p className="text-xs mt-2">(Placeholder for actual chart implementation)</p>
                </div>
              </div>

              <div className="mt-6 space-y-4">
                <h3 className="text-lg font-medium">Key Insights</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Current Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$4.25/bushel</div>
                      <p className="text-xs text-muted-foreground">As of today</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Predicted Price</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">$4.78/bushel</div>
                      <p className="text-xs text-muted-foreground">+12.5% increase expected</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Confidence Level</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">85%</div>
                      <p className="text-xs text-muted-foreground">Based on historical accuracy</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="bg-muted p-4 rounded-md">
                  <h4 className="font-medium mb-2">AI Recommendation</h4>
                  <p className="text-sm">
                    Based on our analysis, we recommend holding your{" "}
                    {crops.find((c) => c.value === selectedCrop)?.label} inventory for the next 4-6 weeks to maximize
                    profit. Market indicators suggest increasing demand due to export opportunities and
                    lower-than-expected production in competing regions.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="yield" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Yield Optimization for {crops.find((c) => c.value === selectedCrop)?.label}</CardTitle>
              <CardDescription>AI-powered recommendations to maximize your crop yield</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Yield Potential Analysis</h3>
                  <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="text-center p-8 text-muted-foreground">
                      <p>Yield Potential Chart</p>
                      <p className="text-xs mt-2">(Placeholder for actual chart implementation)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Optimization Recommendations</h3>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Planting Density</h4>
                      <p className="text-sm">
                        Increase planting density to 34,000 plants per acre for optimal yield based on soil conditions
                        and rainfall patterns in your region.
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Fertilizer Application</h4>
                      <p className="text-sm">
                        Apply nitrogen at 180 lbs/acre in split applications: 60% at planting and 40% at V6 growth stage
                        for maximum efficiency.
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Irrigation Schedule</h4>
                      <p className="text-sm">
                        Implement precision irrigation with 1.2 inches of water per week during critical growth stages
                        to optimize water usage.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Expected Outcome</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Current Yield</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">175 bu/acre</div>
                      <p className="text-xs text-muted-foreground">Based on last season</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">Potential Yield</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">210 bu/acre</div>
                      <p className="text-xs text-muted-foreground">+20% increase expected</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardHeader className="pb-2">
                      <CardTitle className="text-sm font-medium">ROI</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3.5x</div>
                      <p className="text-xs text-muted-foreground">On optimization investments</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="market" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Market Analysis for {crops.find((c) => c.value === selectedCrop)?.label}</CardTitle>
              <CardDescription>Comprehensive market insights and demand forecasting</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Supply & Demand Forecast</h3>
                  <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="text-center p-8 text-muted-foreground">
                      <p>Supply & Demand Chart</p>
                      <p className="text-xs mt-2">(Placeholder for actual chart implementation)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Market Trends</h3>
                  <div className="space-y-4">
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Global Production</h4>
                      <p className="text-sm">
                        Global {crops.find((c) => c.value === selectedCrop)?.label} production is expected to decrease
                        by 3.2% due to adverse weather conditions in major producing regions.
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Export Opportunities</h4>
                      <p className="text-sm">
                        Emerging export opportunities to Southeast Asian markets with projected 15% increase in demand
                        over the next quarter.
                      </p>
                    </div>
                    <div className="bg-muted p-4 rounded-md">
                      <h4 className="font-medium mb-2">Consumer Preferences</h4>
                      <p className="text-sm">
                        Growing consumer preference for sustainably produced crops with transparent supply chains,
                        creating premium pricing opportunities.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Strategic Recommendations</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Timing Strategy</h4>
                    <p className="text-sm">
                      Consider staggered selling approach with 40% of inventory in the next month and 60% held for 3-4
                      months to capitalize on projected price increases.
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Certification Opportunity</h4>
                    <p className="text-sm">
                      Pursue sustainable farming certification to access premium markets with 15-20% higher prices for
                      certified products.
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Value-Added Processing</h4>
                    <p className="text-sm">
                      Consider on-farm processing to create value-added products with 30-40% higher margins than raw
                      commodity sales.
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Contract Farming</h4>
                    <p className="text-sm">
                      Explore forward contracts with food processors seeking guaranteed supply of sustainably produced
                      ingredients.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="risk" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Risk Assessment for {crops.find((c) => c.value === selectedCrop)?.label}</CardTitle>
              <CardDescription>Comprehensive analysis of potential risks and mitigation strategies</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-medium mb-4">Risk Probability Matrix</h3>
                  <div className="h-[300px] w-full flex items-center justify-center bg-muted/20 rounded-md">
                    <div className="text-center p-8 text-muted-foreground">
                      <p>Risk Matrix Visualization</p>
                      <p className="text-xs mt-2">(Placeholder for actual visualization)</p>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4">Top Risk Factors</h3>
                  <div className="space-y-4">
                    <div className="bg-red-50 dark:bg-red-950/30 p-4 rounded-md border border-red-200 dark:border-red-900">
                      <h4 className="font-medium mb-2 text-red-700 dark:text-red-400">Weather Risks</h4>
                      <p className="text-sm">
                        70% probability of drought conditions in the{" "}
                        {regions.find((r) => r.value === selectedRegion)?.label} region during critical growth stages.
                      </p>
                    </div>
                    <div className="bg-amber-50 dark:bg-amber-950/30 p-4 rounded-md border border-amber-200 dark:border-amber-900">
                      <h4 className="font-medium mb-2 text-amber-700 dark:text-amber-400">Pest & Disease Risks</h4>
                      <p className="text-sm">
                        Moderate risk (45%) of corn borer infestation based on current climate conditions and pest
                        population trends.
                      </p>
                    </div>
                    <div className="bg-blue-50 dark:bg-blue-950/30 p-4 rounded-md border border-blue-200 dark:border-blue-900">
                      <h4 className="font-medium mb-2 text-blue-700 dark:text-blue-400">Market Volatility</h4>
                      <p className="text-sm">
                        30% risk of price volatility due to potential changes in trade policies and global supply chain
                        disruptions.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Mitigation Strategies</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Drought Mitigation</h4>
                    <p className="text-sm">
                      Implement precision irrigation system with soil moisture sensors to optimize water usage during
                      critical growth stages.
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Pest Management</h4>
                    <p className="text-sm">
                      Deploy integrated pest management with beneficial insects and targeted applications of organic
                      pesticides.
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Price Risk Hedging</h4>
                    <p className="text-sm">
                      Consider futures contracts or options to lock in prices for 40-50% of expected production.
                    </p>
                  </div>
                  <div className="bg-muted p-4 rounded-md">
                    <h4 className="font-medium mb-2">Crop Insurance</h4>
                    <p className="text-sm">
                      Evaluate revenue protection insurance with 75% coverage level to protect against yield and price
                      risks.
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {insights.map((insight, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="h-40 relative">
              <Image src={insight.image || "/placeholder.svg"} alt={insight.title} fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
            </div>
            <CardHeader>
              <CardTitle className="text-lg">{insight.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{insight.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

