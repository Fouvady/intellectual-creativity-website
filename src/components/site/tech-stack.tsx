'use client'

import * as React from 'react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal } from '@/components/motion/stagger-group'
import { cn } from '@/lib/utils'

const ROW_A = [
  'Unified Communication',
  'Cisco Webex Calling',
  'PABX & IP Telephony',
  'VoIP Gateways',
  'SD-WAN',
  'Network Security',
  'Edge Routing',
  'Wi-Fi 6E',
]
const ROW_B = [
  'Data Center Fabric',
  'Structured Cabling',
  'Power Over Ethernet',
  'CCTV & VMS',
  'Access Control',
  'AV Conferencing',
  'Public Address',
  'Building Automation',
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
            className="liquid-glass whitespace-nowrap rounded-full px-4 py-2 text-sm font-medium text-foreground/80 font-display"
          >
            {it}
          </span>
        ))}
      </div>
    </div>
  )
}

export function TechStack() {
  return (
    <section
      id="tech-stack"
      aria-label="IT portfolio"
      className="relative scroll-mt-20 overflow-hidden py-20 sm:py-24"
    >
      <div className="mx-auto mb-12 max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              IT Portfolio
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="Technologies we deploy"
            highlightRange={[0, 1]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
        </div>
      </div>

      <div className="flex flex-col gap-3 [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]">
        <MarqueeRow items={ROW_A} />
        <MarqueeRow items={ROW_B} reverse />
      </div>
    </section>
  )
}
