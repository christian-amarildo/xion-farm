"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"

export function ContactHero() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30" ref={ref}>
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{t("contact.title")}</h1>
          <p className="text-xl text-muted-foreground">{t("contact.subtitle")}</p>
        </motion.div>
      </div>
    </section>
  )
}

