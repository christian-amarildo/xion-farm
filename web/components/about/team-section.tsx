"use client"

import { useRef } from "react"
import { useLanguage } from "@/components/language-provider"
import { motion, useInView } from "framer-motion"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Linkedin, Twitter, Globe } from "lucide-react"

export function TeamSection() {
  const { t } = useLanguage()
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.2 })

  const team = [
    {
      name: "Maria Garcia",
      role: "CEO & Co-Founder",
      bio: "Agricultural expert with 15+ years of experience in sustainable farming",
      image: "/images/farmer1.png",
      social: {
        linkedin: "#",
        twitter: "#",
        website: "#",
      },
    },
    {
      name: "Robert Johnson",
      role: "CTO & Co-Founder",
      bio: "Blockchain developer with a passion for agricultural innovation",
      image: "/images/farmer2.png",
      social: {
        linkedin: "#",
        twitter: "#",
        website: "#",
      },
    },
    {
      name: "Lisa Chen",
      role: "Chief Sustainability Officer",
      bio: "Environmental scientist specializing in sustainable agricultural practices",
      image: "/images/farmer3.png",
      social: {
        linkedin: "#",
        twitter: "#",
        website: "#",
      },
    },
    {
      name: "Michael Brown",
      role: "Head of AI & Analytics",
      bio: "AI specialist with expertise in predictive analytics for agriculture",
      image: "/placeholder.svg?height=200&width=200",
      social: {
        linkedin: "#",
        twitter: "#",
        website: "#",
      },
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
    <section className="py-20 bg-muted/30" ref={ref}>
      <div className="container">
        <motion.div
          className="max-w-3xl mx-auto text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-4">{t("about.team.title")}</h2>
          <p className="text-lg text-muted-foreground">{t("about.team.description")}</p>
        </motion.div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
        >
          {team.map((member, index) => (
            <motion.div key={index} variants={item}>
              <Card className="h-full">
                <CardHeader className="text-center pb-2">
                  <Avatar className="h-24 w-24 mx-auto mb-4">
                    <AvatarImage src={member.image} alt={member.name} />
                    <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <CardTitle>{member.name}</CardTitle>
                  <CardDescription>{member.role}</CardDescription>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                  <div className="flex justify-center gap-4">
                    <a
                      href={member.social.linkedin}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Linkedin className="h-5 w-5" />
                      <span className="sr-only">LinkedIn</span>
                    </a>
                    <a
                      href={member.social.twitter}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Twitter className="h-5 w-5" />
                      <span className="sr-only">Twitter</span>
                    </a>
                    <a
                      href={member.social.website}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span className="sr-only">Website</span>
                    </a>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

