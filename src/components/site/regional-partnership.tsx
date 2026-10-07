'use client'

import * as React from 'react'
import { Handshake } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal } from '@/components/motion/stagger-group'
import { cn } from '@/lib/utils'

// Regional partnership list — curated from the company's vendor portfolio.
// Each chip is a real brand we source, install, support or integrate with.
const ROW_A = [
  'Cisco',
  'Microsoft',
  'HP',
  'Dell',
  'IBM',
  'Intel',
  'Samsung',
  'Huawei',
  'Lenovo',
  'Oracle',
  'Adobe',
  'Canon',
  'Fujitsu',
  'NetApp',
  'Kingston',
  'Western Digital',
  'Toshiba',
  'Kodak',
  '3M',
  'NEC',
]

const ROW_B = [
  'Juniper Networks',
  'Palo Alto Networks',
  'SonicWall',
  'Fortinet (Networks)',
  'F5 Networks',
  'Brocade',
  'Extreme Networks',
  'D-Link',
  'Linksys',
  'Netgear',
  'Belkin',
  'Targus',
  'Ciena',
  'Arbor Networks',
  'ForeScout',
  'Proxim',
  'Meru Networks',
  'Avaya',
  'Polycom',
  'Plantronics',
  'Jabra',
  'Logitech',
  'Snom',
  'Sonus',
  'Lifesize',
  'Citrix',
]

const ROW_C = [
  'Kaspersky',
  'Trend Micro',
  'Symantec',
  'Blue Coat',
  'EATON',
  'APC',
  'ATEN',
  'Avocent',
  'HID Global',
  'Pelco (by Schneider Electric)',
  'Zebra Technologies',
  'Datalogic',
  'Datamax-O\'Neil',
  'Motorola Solutions',
  'SMART Technologies',
  'SonicWALL',
  'VSS Monitoring',
  'Brand-Rex',
  'Nexzone',
  'Autodesk (AutoCAD)',
]

function MarqueeRow({ items, reverse = false }: { items: string[]; reverse?: boolean }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-pause overflow-hidden">
      <div
        className={cn(
          'flex w-max gap-3',
          reverse ? 'animate-marquee-reverse' : 'animate-marquee',
        )}
      >
        {doubled.map((it, i) => (
          <span
            key={`${it}-${i}`}
            className="liquid-glass inline-flex items-center gap-2 whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-foreground/80 font-display"
          >
            <span
              className="inline-block h-1.5 w-1.5 rounded-full bg-brand-cyan/80"
              aria-hidden
            />
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}

export function RegionalPartnership() {
  return (
    <section
      id="partners"
      aria-label="Regional partnership"
      className="cv-auto relative scroll-mt-20 overflow-hidden py-20 sm:py-24"
    >
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <Handshake className="h-3.5 w-3.5 text-accent-cyan" aria-hidden />
              Regional Partnership
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="Trusted vendor & brand partnerships"
            highlightRange={[0, 1]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
          <SectionReveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              A curated portfolio of world-class vendors we source, install,
              integrate and support across Riyadh and the wider Kingdom.
            </p>
          </SectionReveal>
        </div>
      </div>

      <div className="flex flex-col gap-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
        <MarqueeRow items={ROW_C} />
      </div>
    </section>
  )
}
