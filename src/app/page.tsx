import { ScrollProgress } from '@/components/motion/scroll-progress'
import { GooFilter } from '@/components/motion/goo-filter'
import { Navbar } from '@/components/site/navbar'
import { Hero } from '@/components/site/hero'
import { TrustBar } from '@/components/site/trust-bar'
import { Services } from '@/components/site/services'
import { Stats } from '@/components/site/stats'
import { WhyUs } from '@/components/site/why-us'
import { Process } from '@/components/site/process'
import { TechStack } from '@/components/site/tech-stack'
import { Work } from '@/components/site/work'
import { Testimonials } from '@/components/site/testimonials'
import { About } from '@/components/site/team'
import { Contact } from '@/components/site/contact'
import { Footer } from '@/components/site/footer'

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
        <TrustBar />
        <Services />
        <Stats />
        <WhyUs />
        <Process />
        <TechStack />
        <Work />
        <Testimonials />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
