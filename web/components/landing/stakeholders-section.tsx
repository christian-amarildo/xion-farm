"use client"

import { useRef } from "react"
import { User, ShoppingBag, Wallet, Building } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function StakeholdersSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stakeholders = [
    {
      icon: <User className="h-10 w-10 text-green-600" />,
      title: t("stakeholders.farmers.title"),
      description: t("stakeholders.farmers.description"),
      image: "/images/farmer1.png",
    },
    {
      icon: <ShoppingBag className="h-10 w-10 text-green-600" />,
      title: t("stakeholders.consumers.title"),
      description: t("stakeholders.consumers.description"),
      image: "/images/marketplace.png",
    },
    {
      icon: <Wallet className="h-10 w-10 text-green-600" />,
      title: t("stakeholders.investors.title"),
      description: t("stakeholders.investors.description"),
      image: "/images/investment.png",
    },
    {
      icon: <Building className="h-10 w-10 text-green-600" />,
      title: t("stakeholders.regulators.title"),
      description: t("stakeholders.regulators.description"),
      image: "/images/blockchain.png",
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
    <section id="stakeholders" className="py-20 bg-muted/50" ref={ref}>
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">{t("stakeholders.title")}</h2>
          <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
            XionFarm creates value for everyone in the agricultural ecosystem
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {stakeholders.map((stakeholder, index) => (
            <motion.div key={index} variants={item}>
              <Card className="border-none shadow-md hover:shadow-lg transition-all h-full overflow-hidden group">
                <div className="h-48 overflow-hidden relative">
                  <Image
                    src={stakeholder.image || "/placeholder.svg"}
                    alt={stakeholder.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                </div>
                <CardHeader>
                  <div className="mb-4">{stakeholder.icon}</div>
                  <CardTitle>{stakeholder.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base">{stakeholder.description}</CardDescription>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

