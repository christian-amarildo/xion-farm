"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"

export function SustainabilitySection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const sdgs = [
    {
      number: 2,
      title: t("sustainability.sdg2"),
      color: "bg-yellow-500",
      id: "sdg2",
      description: "Reducing price volatility and expanding credit access for small producers",
    },
    {
      number: 8,
      title: t("sustainability.sdg8"),
      color: "bg-red-500",
      id: "sdg8",
      description: "Financial inclusion and digitalization of the agricultural value chain",
    },
    {
      number: 9,
      title: t("sustainability.sdg9"),
      color: "bg-orange-500",
      id: "sdg9",
      description: "Integration of IoT, blockchain and AI for automation and predictability",
    },
    {
      number: 12,
      title: t("sustainability.sdg12"),
      color: "bg-amber-600",
      id: "sdg12",
      description: "Complete transparency in product origin and traceability",
    },
    {
      number: 13,
      title: t("sustainability.sdg13"),
      color: "bg-green-600",
      id: "sdg13",
      description: "Predictive modeling of climate risks and incentives for regenerative agriculture",
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
    <section id="sustainability" className="py-20" ref={ref}>
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl mb-4">
            {t("sustainability.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">{t("sustainability.description")}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {sdgs.map((sdg, index) => (
            <motion.div
              key={sdg.id}
              id={sdg.id}
              variants={item}
              whileHover={{ y: -5 }}
              className="flex flex-col items-center p-6 rounded-lg shadow-md hover:shadow-lg transition-all bg-card"
            >
              <div
                className={`w-16 h-16 ${sdg.color} rounded-full flex items-center justify-center text-white font-bold text-xl mb-4`}
              >
                {sdg.number}
              </div>
              <h3 className="text-lg font-medium text-center mb-2">{sdg.title}</h3>
              <p className="text-sm text-muted-foreground text-center">{sdg.description}</p>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 bg-muted rounded-lg p-8 relative overflow-hidden"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="absolute top-0 right-0 w-64 h-64 bg-green-200 dark:bg-green-900/30 rounded-full -mr-32 -mt-32 opacity-50"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-green-200 dark:bg-green-900/30 rounded-full -ml-32 -mb-32 opacity-50"></div>

          <div className="relative z-10">
            <h3 className="text-2xl font-bold mb-4 text-center">Our Sustainability Commitment</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 2a10 10 0 1 0 10 10H12V2z" />
                    <path d="M21 12a9 9 0 0 0-9-9v9h9z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-2">Carbon Footprint Reduction</h4>
                <p className="text-sm text-muted-foreground">
                  We track and incentivize practices that reduce carbon emissions in agriculture
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-2">Sustainable Supply Chain</h4>
                <p className="text-sm text-muted-foreground">
                  End-to-end transparency ensures ethical and sustainable practices throughout
                </p>
              </div>

              <div className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-100 dark:bg-green-900 text-green-600 dark:text-green-300 mb-4">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                    <circle cx="12" cy="10" r="3" />
                  </svg>
                </div>
                <h4 className="text-lg font-medium mb-2">Local Community Support</h4>
                <p className="text-sm text-muted-foreground">
                  We prioritize local economies and community development in rural areas
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

