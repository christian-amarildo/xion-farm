"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import Image from "next/image"

export function PartnersSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  // In a real implementation, these would be actual partner logos
  const partners = [
    { name: "AgriTech Solutions", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Green Investments", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Sustainable Farms Co-op", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Future Agriculture Fund", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Eco Certification Group", logo: "/placeholder.svg?height=60&width=180" },
    { name: "Global Food Alliance", logo: "/placeholder.svg?height=60&width=180" },
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
    <section className="py-16 bg-white dark:bg-background" ref={ref}>
      <div className="container">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold tracking-tighter sm:text-3xl mb-4">Our Partners & Supporters</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Working together with industry leaders to transform agriculture
          </p>
        </motion.div>

        <motion.div
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {partners.map((partner, index) => (
            <motion.div key={index} variants={item} className="flex justify-center">
              <div className="h-16 flex items-center justify-center grayscale hover:grayscale-0 transition-all duration-300">
                <Image
                  src={partner.logo || "/placeholder.svg"}
                  alt={partner.name}
                  width={180}
                  height={60}
                  className="max-h-full w-auto"
                />
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

