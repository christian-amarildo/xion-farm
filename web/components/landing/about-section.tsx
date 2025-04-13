"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function AboutSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const stats = [
    { value: "5,280+", label: "Farmers" },
    { value: "12,450+", label: "Products" },
    { value: "850+", label: "Investors" },
    { value: "120K+", label: "Transactions" },
  ]

  return (
    <section id="about" className="py-20" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">{t("about.title")}</h2>
            <p className="text-lg text-muted-foreground">{t("about.description")}</p>
            <p className="text-lg font-medium">{t("about.mission")}</p>

            <div className="pt-4">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-green-400 rounded-lg blur opacity-25"></div>
                <div className="relative bg-background rounded-lg p-6 shadow-xl">
                  <div className="flex items-center gap-4 mb-4">
                    <Image src="/branding-logo.svg" alt="XionFarm Icon" width={40} height={40} />
                    <h3 className="text-xl font-semibold">Why XionFarm?</h3>
                  </div>
                  <ul className="space-y-2">
                    <li className="flex items-start gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Zero gas fees using XION blockchain</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>AI-powered price predictions and yield optimization</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Gamified rewards for sustainable farming practices</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <svg
                        className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>Fractional ownership through asset tokenization</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="bg-white dark:bg-green-950 rounded-lg p-6 shadow-md text-center"
                >
                  <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </div>

            <div className="relative h-[300px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/farm-hero.png" alt="Farm" fill className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end">
                <div className="p-6 text-white">
                  <h3 className="text-xl font-semibold mb-2">Sustainable Agriculture</h3>
                  <p className="text-sm text-white/80">
                    Our platform promotes environmentally responsible farming practices while ensuring fair compensation
                    for farmers.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

