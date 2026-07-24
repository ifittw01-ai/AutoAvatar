import { useEffect } from 'react'
import { AnnouncementBar } from '../components/AnnouncementBar'
import { Header } from '../components/Header'
import { HeroSection } from '../components/HeroSection'
import { ProofSection } from '../components/ProofSection'
import { FounderStorySection } from '../components/FounderStorySection'
import { ObjectionSection } from '../components/ObjectionSection'
import { OutcomeSection } from '../components/OutcomeSection'
import { CurriculumSection } from '../components/CurriculumSection'
import { TestimonialSection } from '../components/TestimonialSection'
import { FAQSection } from '../components/FAQSection'
import { FinalCTA } from '../components/FinalCTA'
import { MobileStickyCTA } from '../components/MobileStickyCTA'
import { Footer } from '../components/Footer'
import { siteContent } from '../content/siteContent'

export function SalesPage() {
  useEffect(() => {
    document.title = siteContent.seo.title

    const jsonLd = {
      '@context': 'https://schema.org',
      '@type': 'Course',
      name: siteContent.brand.courseName,
      description: siteContent.seo.description,
      provider: {
        '@type': 'Organization',
        name: siteContent.brand.name,
      },
      inLanguage: 'zh-Hant',
      offers: {
        '@type': 'Offer',
        priceCurrency: 'USD',
        // 價格由 paymentConfig 維護；此處不重複硬編碼邏輯細節
        category: 'Education',
      },
    }

    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.text = JSON.stringify(jsonLd)
    script.id = 'course-jsonld'
    document.getElementById('course-jsonld')?.remove()
    document.head.appendChild(script)

    return () => {
      document.getElementById('course-jsonld')?.remove()
    }
  }, [])

  return (
    <div id="top" className="min-h-screen bg-paper pb-24 md:pb-0">
      <AnnouncementBar />
      <Header />
      <main>
        <HeroSection />
        <ProofSection />
        <FounderStorySection />
        <ObjectionSection />
        <OutcomeSection />
        <CurriculumSection />
        <TestimonialSection />
        <FAQSection />
        <FinalCTA />
      </main>
      <Footer />
      <MobileStickyCTA />
    </div>
  )
}
