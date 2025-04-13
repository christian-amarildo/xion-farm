"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"

export function StorySection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20" ref={ref}>
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t("about.story.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("about.story.description")}</p>
        </motion.div>

        <div className="relative">
          <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-0.5 bg-muted-foreground/20"></div>

          <motion.div
            className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="md:text-right md:pr-12">
              <div className="absolute left-0 md:left-auto md:right-0 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center md:translate-x-4">
                <span className="text-green-600 dark:text-green-300 text-sm">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2023: The Beginning</h3>
              <p className="text-muted-foreground">
                XionFarm was founded with a vision to transform agriculture through blockchain technology.
              </p>
            </div>
            <div className="hidden md:block"></div>
          </motion.div>

          <motion.div
            className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="hidden md:block"></div>
            <div className="md:pl-12">
              <div className="absolute left-0 md:left-1/2 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center md:-translate-x-4">
                <span className="text-green-600 dark:text-green-300 text-sm">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2023: First Partnerships</h3>
              <p className="text-muted-foreground">
                We established our first partnerships with small and medium farmers, creating a foundation for our
                marketplace.
              </p>
            </div>
          </motion.div>

          <motion.div
            className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="md:text-right md:pr-12">
              <div className="absolute left-0 md:left-auto md:right-0 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center md:translate-x-4">
                <span className="text-green-600 dark:text-green-300 text-sm">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2024: Platform Launch</h3>
              <p className="text-muted-foreground">
                We officially launched our platform, connecting farmers, consumers, and investors through blockchain
                technology.
              </p>
            </div>
            <div className="hidden md:block"></div>
          </motion.div>

          <motion.div
            className="relative pl-12 md:pl-0 md:grid md:grid-cols-2 md:gap-8"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <div className="hidden md:block"></div>
            <div className="md:pl-12">
              <div className="absolute left-0 md:left-1/2 top-1 w-8 h-8 rounded-full bg-green-100 dark:bg-green-900 flex items-center justify-center md:-translate-x-4">
                <span className="text-green-600 dark:text-green-300 text-sm">4</span>
              </div>
              <h3 className="text-xl font-semibold mb-2">2024: The Future</h3>
              <p className="text-muted-foreground">
                We continue to expand our platform, adding new features and reaching more farmers and consumers
                worldwide.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

