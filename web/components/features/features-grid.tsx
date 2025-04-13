"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cpu, LineChart, FileText, Trophy, Coins, ShoppingCart, Wallet, Search } from "lucide-react"
import Image from "next/image"

export function FeaturesGrid() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Cpu className="h-10 w-10 text-green-600" />,
      title: t("features.page.blockchain.title"),
      description: t("features.page.blockchain.description"),
      image: "/images/blockchain.png",
    },
    {
      icon: <LineChart className="h-10 w-10 text-green-600" />,
      title: t("features.page.ai.title"),
      description: t("features.page.ai.description"),
      image: "/images/ai-insights.png",
    },
    {
      icon: <FileText className="h-10 w-10 text-green-600" />,
      title: t("features.page.smart.title"),
      description: t("features.page.smart.description"),
      image: "/images/investment.png",
    },
    {
      icon: <Trophy className="h-10 w-10 text-green-600" />,
      title: t("features.page.gamification.title"),
      description: t("features.page.gamification.description"),
      image: "/images/marketplace.png",
    },
    {
      icon: <Coins className="h-10 w-10 text-green-600" />,
      title: t("features.page.tokenization.title"),
      description: t("features.page.tokenization.description"),
      image: "/images/farm-hero.png",
    },
    {
      icon: <ShoppingCart className="h-10 w-10 text-green-600" />,
      title: t("features.page.marketplace.title"),
      description: t("features.page.marketplace.description"),
      image: "/images/corn.png",
    },
    {
      icon: <Wallet className="h-10 w-10 text-green-600" />,
      title: t("features.page.investment.title"),
      description: t("features.page.investment.description"),
      image: "/images/beef.png",
    },
    {
      icon: <Search className="h-10 w-10 text-green-600" />,
      title: t("features.page.traceability.title"),
      description: t("features.page.traceability.description"),
      image: "/images/milk.png",
    },
  ]

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20" ref={ref}>
      <div className="container">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <Card className="border-none shadow-md hover:shadow-lg transition-all h-full overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={feature.image || "/placeholder.svg"}
                    alt={feature.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle>{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{feature.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

