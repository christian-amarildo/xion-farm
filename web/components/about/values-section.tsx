"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { Shield, Leaf, Lightbulb, Scale } from "lucide-react"

export function ValuesSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const values = [
    {
      icon: <Shield className="h-10 w-10 text-green-600" />,
      title: t("about.values.transparency"),
      description: t("about.values.transparency.description"),
    },
    {
      icon: <Leaf className="h-10 w-10 text-green-600" />,
      title: t("about.values.sustainability"),
      description: t("about.values.sustainability.description"),
    },
    {
      icon: <Lightbulb className="h-10 w-10 text-green-600" />,
      title: t("about.values.innovation"),
      description: t("about.values.innovation.description"),
    },
    {
      icon: <Scale className="h-10 w-10 text-green-600" />,
      title: t("about.values.fairness"),
      description: t("about.values.fairness.description"),
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
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t("about.values.title")}</h2>
          <p className="text-lg text-muted-foreground">The principles that guide everything we do at XionFarm</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {values.map((value, index) => (
            <motion.div key={index} variants={item} className="bg-card rounded-lg p-8 shadow-sm border text-center">
              <div className="flex justify-center mb-4">{value.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-muted-foreground">{value.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

