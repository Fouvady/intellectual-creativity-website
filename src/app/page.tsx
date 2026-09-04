import { ScrollProgress } from '@/components/motion/scroll-progress'
import { GooFilter } from '@/components/motion/goo-filter'
import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { Hero3DScroll } from '@/components/site/hero-3d-scroll'
import { TrustBar } from '@/components/site/trust-bar'
import { Services } from '@/components/site/services'
import { Stats } from '@/components/site/stats'
import { WhyUs } from '@/components/site/why-us'
import { Process } from '@/components/site/process'
import { TechStack } from '@/components/site/tech-stack'
import { Work } from '@/components/site/work'
import { Testimonials } from '@/components/site/testimonials'
import { About } from '@/components/site/team'
import { Footer } from '@/components/site/footer'
import dynamic from 'next/dynamic'

// Lazy-load the Contact section — it pulls in zod (94KB) + react-hook-form
// which aren't needed until the user scrolls to the bottom. This defers
// ~150KB of JS from the initial load.
const Contact = dynamic(() => import('@/components/site/contact').then(m => ({ default: m.Contact })), {
  ssr: true,
  loading: () => <div className="h-[600px]" />,
})

// Lazy-load the Gallery section — it pulls in framer-motion's full
// scroll/transform/spring stack + 28 external images. Defer until scrolled near.
const GallerySection = dynamic(() => import('@/components/site/gallery-section').then(m => ({ default: m.GallerySection })), {
  ssr: true,
  loading: () => <div className="h-[600vh]" />,
})

export default function Home() {
  return (
    <div
      id="top"
      className="relative flex min-h-screen flex-col bg-background text-foreground"
    >
      <ScrollProgress />
      <GooFilter />
      <Navbar />
      <main className="relative flex-1">
        <Hero />
        <Hero3DScroll />
        <TrustBar />
        <Services />
        <Stats />
        <WhyUs />
        <Process />
        <TechStack />
        <Work />
        <Testimonials />
        <About />
        <GallerySection />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
