"use client"

import { useRef } from "react"
import { Cpu, LineChart, FileText, Trophy, Coins } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function FeaturesSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const features = [
    {
      icon: <Cpu className="h-10 w-10 text-green-600" />,
      title: t("features.blockchain.title"),
      description: t("features.blockchain.description"),
      id: "blockchain",
      image: "/images/blockchain.png",
    },
    {
      icon: <LineChart className="h-10 w-10 text-green-600" />,
      title: t("features.ai.title"),
      description: t("features.ai.description"),
      id: "ai",
      image: "/images/ai-insights.png",
    },
    {
      icon: <FileText className="h-10 w-10 text-green-600" />,
      title: t("features.smart.title"),
      description: t("features.smart.description"),
      id: "smart",
      image: "/images/investment.png",
    },
    {
      icon: <Trophy className="h-10 w-10 text-green-600" />,
      title: t("features.gamification.title"),
      description: t("features.gamification.description"),
      id: "gamification",
      image: "/images/marketplace.png",
    },
    {
      icon: <Coins className="h-10 w-10 text-green-600" />,
      title: "Tokenization",
      description: "Convert agricultural assets into digital tokens for fractional ownership and trading",
      id: "tokenization",
      image: "/images/farm-hero.png",
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
    <section id="features" className="py-20 bg-muted/50">
      <div className="container" ref={ref}>
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("features.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            Our platform combines cutting-edge technologies to revolutionize agriculture
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={item} className="h-full">
              <Card
                id={feature.id}
                className="border-none shadow-md hover:shadow-lg transition-all h-full overflow-hidden group"
              >
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

