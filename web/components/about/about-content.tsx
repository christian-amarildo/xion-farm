"use client"

import { useRef } from "react"
import Image from "next/image"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"

export function AboutContent() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-gradient-to-b from-background to-muted/30" ref={ref}>
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-6">{t("about.title")}</h1>
          <p className="text-xl text-muted-foreground">{t("about.description")}</p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/farm-hero.png" alt="XionFarm Vision" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">{t("about.vision.title")}</h3>
                  <p className="text-sm text-white/80">{t("about.vision.description")}</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div>
              <h2 className="text-3xl font-bold tracking-tighter mb-4">{t("about.mission")}</h2>
              <p className="text-lg text-muted-foreground">{t("about.description")}</p>
            </div>

            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25"></div>
              <div className="relative bg-background rounded-lg p-6 shadow-xl">
                <div className="flex items-center gap-4 mb-4">
                  <Image src="/branding-logo.svg" alt="XionFarm Icon" width={40} height={40} className="dark:invert" />
                  <h3 className="text-xl font-semibold">{t("about.vision.title")}</h3>
                </div>
                <p className="text-muted-foreground">{t("about.vision.description")}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

