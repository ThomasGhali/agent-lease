import { Navbar } from '@/features/landing-page/components/Navbar'
import { About } from '@/features/landing-page/components/About'
import { Hero } from '@/features/landing-page/components/Hero'
import { HowItWorks } from '@/features/landing-page/components/HowItWorks'
import { Pricing } from '@/features/landing-page/components/Pricing'
import { Services } from '@/features/landing-page/components/Services'
import { Sponsors } from '@/features/landing-page/components/Sponsors'
import { Features } from '@/features/landing-page/components/Features'
import { Footer } from '@/features/landing-page/components/Footer'
import { ScrollToTop } from '@/features/landing-page/components/ScrollToTop'
import { Newsletter } from '@/features/landing-page/components/Newsletter'
import { FAQ } from '@/features/landing-page/components/FAQ'
import { Cta } from '@/features/landing-page/components/Cta'
import { Team } from '@/features/landing-page/components/Team'
import { Testimonials } from '@/features/landing-page/components/Testimonials'

const LandingPageComponents = () => {
  return (
    <main className="landing-page">
      <Navbar />
      <Hero />
      <Sponsors />
      <About />
      <HowItWorks />
      <Features />
      <Services />
      <Cta />
      <Testimonials />
      <Team />
      <Pricing />
      <Newsletter />
      <FAQ />
      <Footer />
      <ScrollToTop />
    </main>
  )
}

export default LandingPageComponents
