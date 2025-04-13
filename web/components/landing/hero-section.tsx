"use client"

import { useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/components/language-provider"
import { motion } from "framer-motion"

export function HeroSection() {
  const { t } = useLanguage()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = 0.7
    }
  }, [])

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">
      {/* Video Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-green-900/80 to-green-800/70 dark:from-green-950/90 dark:to-green-900/80 z-10" />
        <video ref={videoRef} autoPlay muted loop playsInline className="w-full h-full object-cover">
          <source src="https://v0.blob.com/pjtmy8OGJ.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-2 items-center">
          <motion.div
            className="space-y-6 text-center md:text-left text-white"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2, duration: 0.5 }}>
              <Image
                src="/branding-logo.svg"
                alt="XionFarm Icon"
                width={80}
                height={80}
                className="mx-auto md:mx-0 mb-6 rounded-lg"
              />
            </motion.div>
            <motion.h1
              className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {t("hero.title")}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl text-white/90"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t("hero.subtitle")}
            </motion.p>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Link href="/signup">
                <Button
                  size="lg"
                  className="w-full sm:w-auto bg-white text-green-700 hover:bg-white/90 dark:bg-green-600 dark:text-white dark:hover:bg-green-500"
                >
                  {t("hero.cta")}
                </Button>
              </Link>
              <Link href="#features">
                <Button
                  size="lg"
                  variant="outline"
                  className="w-full sm:w-auto border-white text-white hover:bg-white/20"
                >
                  {t("hero.secondary")}
                </Button>
              </Link>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative hidden md:block"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="relative h-[500px] w-full">
              <div className="absolute top-0 right-0 w-[90%] h-[90%] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-2">
                      <div className="h-3 w-3 rounded-full bg-green-500"></div>
                      <div className="text-white font-medium">XionFarm Platform</div>
                    </div>
                    <div className="flex gap-2">
                      <div className="h-3 w-3 rounded-full bg-white/30"></div>
                      <div className="h-3 w-3 rounded-full bg-white/30"></div>
                      <div className="h-3 w-3 rounded-full bg-white/30"></div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="h-24 bg-white/5 rounded-lg flex items-center justify-center">
                      <div className="text-white text-center">
                        <div className="text-3xl font-bold">$12.5M</div>
                        <div className="text-white/70 text-sm">Total Value Locked</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="h-20 bg-white/5 rounded-lg flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-2xl font-bold">5,280</div>
                          <div className="text-white/70 text-sm">Farmers</div>
                        </div>
                      </div>
                      <div className="h-20 bg-white/5 rounded-lg flex items-center justify-center">
                        <div className="text-white text-center">
                          <div className="text-2xl font-bold">12,450</div>
                          <div className="text-white/70 text-sm">Products</div>
                        </div>
                      </div>
                    </div>

                    <div className="h-32 bg-white/5 rounded-lg p-4">
                      <div className="text-white/70 text-sm mb-2">Recent Transactions</div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <div className="text-white text-sm">Organic Corn Sale</div>
                          <div className="text-green-400 text-sm">+$4,500</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-white text-sm">Farm Investment</div>
                          <div className="text-green-400 text-sm">+$12,000</div>
                        </div>
                        <div className="flex justify-between items-center">
                          <div className="text-white text-sm">Tokenization</div>
                          <div className="text-green-400 text-sm">+$8,750</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 w-[70%] h-[60%] bg-white/10 backdrop-blur-sm rounded-lg overflow-hidden shadow-2xl">
                <div className="p-6">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-3 w-3 rounded-full bg-green-500"></div>
                    <div className="text-white font-medium">AI Insights</div>
                  </div>

                  <div className="space-y-3">
                    <div className="h-6 bg-white/5 rounded-full w-full"></div>
                    <div className="h-6 bg-white/5 rounded-full w-[85%]"></div>
                    <div className="h-6 bg-white/5 rounded-full w-[70%]"></div>
                  </div>

                  <div className="mt-4 flex justify-between items-center">
                    <div className="text-white/70 text-xs">Corn price prediction</div>
                    <div className="text-green-400 text-xs">+12% next month</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      <div className="absolute bottom-10 left-0 right-0 z-10 flex justify-center">
        <motion.div
          className="animate-bounce"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          <Link href="#features" className="text-white flex flex-col items-center">
            <span className="text-sm mb-2">Scroll Down</span>
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
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

