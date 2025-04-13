"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function FeaturesShowcase() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  return (
    <section className="py-20 bg-muted/30" ref={ref}>
      <div className="container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl font-bold tracking-tight mb-6">{t("features.page.blockchain.title")}</h2>
            <p className="text-lg text-muted-foreground mb-6">{t("features.page.blockchain.description")}</p>

            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1 mt-1">
                  <svg
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Zero Gas Fees</h3>
                  <p className="text-sm text-muted-foreground">
                    All transactions on our platform are processed with zero gas fees.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1 mt-1">
                  <svg
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Complete Transparency</h3>
                  <p className="text-sm text-muted-foreground">
                    Every transaction is recorded on the blockchain for full transparency.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="bg-green-100 dark:bg-green-900/50 rounded-full p-1 mt-1">
                  <svg
                    className="h-5 w-5 text-green-600 dark:text-green-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-medium">Immutable Records</h3>
                  <p className="text-sm text-muted-foreground">
                    All data is securely stored and cannot be altered or deleted.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative h-[400px] rounded-lg overflow-hidden shadow-xl">
              <Image src="/images/blockchain.png" alt="Blockchain Technology" fill className="object-cover" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

