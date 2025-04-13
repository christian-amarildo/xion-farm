import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { FeaturesHero } from "@/components/features/features-hero"
import { FeaturesGrid } from "@/components/features/features-grid"
import { FeaturesShowcase } from "@/components/features/features-showcase"
import { FeaturesTechnology } from "@/components/features/features-technology"
import { CtaSection } from "@/components/landing/cta-section"
import { SocialShare } from "@/components/social-share"

export const metadata = {
  title: "XionFarm Features - Blockchain Agriculture Platform",
  description:
    "Explore XionFarm's innovative features including blockchain technology, AI insights, smart contracts, and more.",
}

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <FeaturesHero />
        <FeaturesGrid />
        <FeaturesShowcase />
        <FeaturesTechnology />
        <CtaSection />
        <SocialShare />
      </main>
      <Footer />
    </div>
  )
}

