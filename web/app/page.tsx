import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/landing/hero-section"
import { FeaturesSection } from "@/components/landing/features-section"
import { AboutSection } from "@/components/landing/about-section"
import { StakeholdersSection } from "@/components/landing/stakeholders-section"
import { SustainabilitySection } from "@/components/landing/sustainability-section"
import { TestimonialsSection } from "@/components/landing/testimonials-section"
import { PartnersSection } from "@/components/landing/partners-section"
import { CtaSection } from "@/components/landing/cta-section"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <AboutSection />
        <StakeholdersSection />
        <SustainabilitySection />
        {/* <TestimonialsSection /> */}
        <PartnersSection />
        <CtaSection />
      </main>
      <Footer />
    </div>
  )
}

