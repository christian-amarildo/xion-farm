import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { AboutContent } from "@/components/about/about-content"
import { TeamSection } from "@/components/about/team-section"
import { ValuesSection } from "@/components/about/values-section"
import { StorySection } from "@/components/about/story-section"
import { CtaSection } from "@/components/landing/cta-section"
import { SocialShare } from "@/components/social-share"

export const metadata = {
  title: "About XionFarm - Our Mission and Vision",
  description:
    "Learn about XionFarm's mission to revolutionize agriculture through blockchain technology and sustainable practices.",
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <AboutContent />
        <StorySection />
        <ValuesSection />
        <TeamSection />
        <CtaSection />
        <SocialShare />
      </main>
      <Footer />
    </div>
  )
}

