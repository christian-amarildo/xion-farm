import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ContactHero } from "@/components/contact/contact-hero"
import { ContactForm } from "@/components/contact/contact-form"
import { ContactInfo } from "@/components/contact/contact-info"
import { ContactFaq } from "@/components/contact/contact-faq"
import { SocialShare } from "@/components/social-share"

export const metadata = {
  title: "Contact XionFarm - Get in Touch",
  description:
    "Contact our team for questions, support, or partnership opportunities with XionFarm's blockchain agriculture platform.",
}

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <ContactHero />
        <div className="container py-12 grid grid-cols-1 md:grid-cols-2 gap-12">
          <ContactForm />
          <ContactInfo />
        </div>
        <ContactFaq />
        <SocialShare />
      </main>
      <Footer />
    </div>
  )
}

