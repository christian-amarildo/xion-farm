"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { useLanguage } from "@/components/language-provider"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import Image from "next/image"

export default function GamificationPage() {
  const { t } = useLanguage()
  const [points, setPoints] = useState(1250)
  const [level, setLevel] = useState(4)
  const [nextLevelPoints, setNextLevelPoints] = useState(1500)

  const badges = [
    {
      id: "sustainable-farmer",
      name: "Sustainable Farmer",
      description: "Awarded for implementing sustainable farming practices",
      image: "/images/farm-hero.png",
      earned: true,
      date: "2023-02-15",
    },
    {
      id: "transparency-champion",
      name: "Transparency Champion",
      description: "Awarded for maintaining complete supply chain transparency",
      image: "/images/blockchain.png",
      earned: true,
      date: "2023-03-10",
    },
    {
      id: "quality-producer",
      name: "Quality Producer",
      description: "Awarded for consistently high-quality products",
      image: "/images/corn.png",
      earned: true,
      date: "2023-04-22",
    },
    {
      id: "community-builder",
      name: "Community Builder",
      description: "Awarded for active participation in the XionFarm community",
      image: "/images/farmer1.png",
      earned: false,
      progress: 75,
    },
    {
      id: "innovation-pioneer",
      name: "Innovation Pioneer",
      description: "Awarded for adopting new agricultural technologies",
      image: "/images/ai-insights.png",
      earned: false,
      progress: 40,
    },
    {
      id: "master-investor",
      name: "Master Investor",
      description: "Awarded for successful agricultural investments",
      image: "/images/investment.png",
      earned: false,
      progress: 20,
    },
  ]

  const challenges = [
    {
      id: "sustainable-water",
      name: "Water Conservation Challenge",
      description: "Reduce water usage by 20% through efficient irrigation",
      reward: 200,
      deadline: "2023-06-30",
      progress: 65,
    },
    {
      id: "carbon-footprint",
      name: "Carbon Footprint Reduction",
      description: "Implement practices to reduce carbon emissions by 15%",
      reward: 300,
      deadline: "2023-07-15",
      progress: 40,
    },
    {
      id: "biodiversity",
      name: "Biodiversity Enhancement",
      description: "Plant native species to increase biodiversity on your farm",
      reward: 250,
      deadline: "2023-08-10",
      progress: 20,
    },
  ]

  const leaderboard = [
    { rank: 1, name: "Maria Garcia", farm: "Sunshine Organic Farm", points: 3250, avatar: "/images/farmer1.png" },
    { rank: 2, name: "Robert Johnson", farm: "Green Valley Produce", points: 2980, avatar: "/images/farmer2.png" },
    { rank: 3, name: "Lisa Chen", farm: "Azure Sky Farms", points: 2745, avatar: "/images/farmer3.png" },
    {
      rank: 4,
      name: "John Smith",
      farm: "Meadow Creek Ranch",
      points: 1950,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 5,
      name: "You",
      farm: "Your Farm",
      points: 1250,
      avatar: "/placeholder.svg?height=40&width=40",
      isUser: true,
    },
    {
      rank: 6,
      name: "Michael Brown",
      farm: "Sunset Acres",
      points: 1100,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 7,
      name: "Sarah Wilson",
      farm: "Willow Brook Farm",
      points: 980,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    { rank: 8, name: "David Lee", farm: "Golden Harvest", points: 850, avatar: "/placeholder.svg?height=40&width=40" },
    {
      rank: 9,
      name: "Emily Davis",
      farm: "Silver Creek Farm",
      points: 720,
      avatar: "/placeholder.svg?height=40&width=40",
    },
    {
      rank: 10,
      name: "James Wilson",
      farm: "Riverside Ranch",
      points: 650,
      avatar: "/placeholder.svg?height=40&width=40",
    },
  ]

  const rewards = [
    {
      id: "premium-access",
      name: "Premium AI Insights Access",
      description: "Get exclusive access to advanced AI predictions and analytics",
      points: 1000,
      image: "/images/ai-insights.png",
      available: true,
    },
    {
      id: "marketplace-discount",
      name: "Marketplace Fee Discount",
      description: "50% off marketplace fees for 3 months",
      points: 1500,
      image: "/images/marketplace.png",
      available: false,
    },
    {
      id: "featured-listing",
      name: "Featured Product Listing",
      description: "Get your products featured at the top of the marketplace",
      points: 2000,
      image: "/images/corn.png",
      available: false,
    },
    {
      id: "certification-support",
      name: "Certification Support",
      description: "Assistance with obtaining organic or sustainable certifications",
      points: 2500,
      image: "/images/blockchain.png",
      available: false,
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gamification & Rewards</h1>
          <p className="text-muted-foreground">
            Earn points and rewards for sustainable farming practices and platform engagement
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Your Level</CardTitle>
            <CardDescription>
              Level {level} - {points} points
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress to Level {level + 1}</span>
                <span>
                  {points}/{nextLevelPoints}
                </span>
              </div>
              <Progress value={(points / nextLevelPoints) * 100} />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Badges Earned</CardTitle>
            <CardDescription>
              {badges.filter((b) => b.earned).length}/{badges.length} badges unlocked
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex -space-x-2">
              {badges
                .filter((b) => b.earned)
                .map((badge, index) => (
                  <div
                    key={badge.id}
                    className="relative w-10 h-10 rounded-full overflow-hidden border-2 border-background"
                    style={{ zIndex: 10 - index }}
                  >
                    <Image src={badge.image || "/placeholder.svg"} alt={badge.name} fill className="object-cover" />
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle>Leaderboard Rank</CardTitle>
            <CardDescription>You're ranked #5 out of 1,245 farmers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="text-4xl font-bold text-green-600">#5</div>
              <div>
                <div className="text-sm text-muted-foreground">Points needed for #4</div>
                <div className="font-medium">700 more points</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="badges" className="space-y-4">
        <TabsList>
          <TabsTrigger value="badges">Badges</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="badges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {badges.map((badge) => (
              <Card key={badge.id} className={badge.earned ? "" : "opacity-75"}>
                <div className="p-6 flex items-center gap-4">
                  <div className="relative w-16 h-16 rounded-full overflow-hidden">
                    <Image src={badge.image || "/placeholder.svg"} alt={badge.name} fill className="object-cover" />
                    {!badge.earned && (
                      <div className="absolute inset-0 bg-background/50 flex items-center justify-center">
                        <svg
                          className="w-8 h-8 text-muted-foreground"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium">{badge.name}</h3>
                    <p className="text-sm text-muted-foreground">{badge.description}</p>
                    {badge.earned ? (
                      <div className="mt-2 text-xs text-green-600">Earned on {badge.date}</div>
                    ) : (
                      <div className="mt-2 space-y-1">
                        <div className="text-xs text-muted-foreground">{badge.progress}% complete</div>
                        <Progress value={badge.progress} className="h-1" />
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {challenges.map((challenge) => (
              <Card key={challenge.id}>
                <CardHeader>
                  <CardTitle className="text-lg">{challenge.name}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span>Progress</span>
                    <span>{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} />

                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <p className="text-muted-foreground">Reward</p>
                      <p className="font-medium">{challenge.reward} points</p>
                    </div>
                    <div>
                      <p className="text-muted-foreground">Deadline</p>
                      <p className="font-medium">{challenge.deadline}</p>
                    </div>
                  </div>
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

        <TabsContent value="leaderboard" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sustainability Leaderboard</CardTitle>
              <CardDescription>Top farmers ranked by sustainability points and platform engagement</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((entry) => (
                  <div
                    key={entry.rank}
                    className={`flex items-center gap-4 p-3 rounded-md ${entry.isUser ? "bg-muted" : ""}`}
                  >
                    <div className="w-8 h-8 flex items-center justify-center font-bold">{entry.rank}</div>
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={entry.avatar} alt={entry.name} />
                      <AvatarFallback>{entry.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="font-medium">{entry.name}</div>
                      <div className="text-sm text-muted-foreground">{entry.farm}</div>
                    </div>
                    <div className="font-bold">{entry.points} pts</div>
                  </div>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button variant="outline">View Full Leaderboard</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id} className={!reward.available ? "opacity-75" : ""}>
                <div className="h-40 relative">
                  <Image src={reward.image || "/placeholder.svg"} alt={reward.name} fill className="object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{reward.name}</CardTitle>
                  <CardDescription>{reward.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center">
                    <div className="font-medium">{reward.points} points</div>
                    {reward.available ? (
                      <Badge>Available</Badge>
                    ) : (
                      <Badge variant="outline">Need {reward.points - points} more points</Badge>
                    )}
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full" disabled={!reward.available}>
                    {reward.available ? "Redeem Reward" : "Not Available"}
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

