'use client'

import * as React from 'react'
import { ArrowUpRight, Phone, AudioLines, Network, Cctv, HouseWifi, LifeBuoy } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal, StaggerGroup, StaggerItem } from '@/components/motion/stagger-group'
import { TiltCard } from '@/components/motion/tilt-card'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { cn } from '@/lib/utils'

type Service = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  accent: 'cyan' | 'sky' | 'gold'
}

const SERVICES: Service[] = [
  {
    icon: Phone,
    title: 'Telephone IP / Analog, Call Centers & PABX System',
    desc: 'Telephone system installation, supply and maintenance. Experienced engineers & technicians. Brands: Cisco, Nokia, Siemens-Unify, Lucent-Alcatel & Avaya.',
    accent: 'cyan',
  },
  {
    icon: AudioLines,
    title: 'AVC Audio-Video Communication & PA Public Address',
    desc: 'Audio & video systems, conference theaters, home music systems, music control, and public address systems for commercial buildings, shopping malls, private halls, masjids and offices.',
    accent: 'sky',
  },
  {
    icon: Network,
    title: 'Networking / Structured Cabling',
    desc: 'We set up your voice and data infrastructure to the highest standards — from a small office install to a large-scale installation.',
    accent: 'gold',
  },
  {
    icon: Cctv,
    title: 'CCTV System',
    desc: 'With our innovations and use of the latest technology available, we design multifaceted systems to meet all your business needs.',
    accent: 'cyan',
  },
  {
    icon: HouseWifi,
    title: 'Smart Electronic System',
    desc: 'Luxury villa intercom solutions and multi-apartment solutions, in IP and analog modes, with mobile app support for your devices.',
    accent: 'sky',
  },
  {
    icon: LifeBuoy,
    title: 'Help & Support / Building Automation',
    desc: 'Lighting control, A/C control, curtain control, music control, and pump control.',
    accent: 'gold',
  },
]

const ACCENT = {
  cyan: {
    chip: 'from-brand-cyan/30 to-brand-cyan/5 text-accent-cyan',
    icon: 'text-accent-cyan',
    glow: 'shadow-brand-cyan/30',
  },
  sky: {
    chip: 'from-brand-sky/30 to-brand-sky/5 text-accent-sky',
    icon: 'text-accent-sky',
    glow: 'shadow-brand-sky/30',
  },
  gold: {
    chip: 'from-brand-gold/30 to-brand-gold/5 text-accent-gold',
    icon: 'text-accent-gold',
    glow: 'shadow-brand-gold/30',
  },
} as const

export function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="relative scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              What we do
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="We provide a wide range of services"
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
          <SectionReveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              From telephony and structured cabling to security and smart
              automation — engineered to the highest standards.
            </p>
          </SectionReveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const a = ACCENT[s.accent]
            return (
              <StaggerItem key={s.title}>
                <TiltCard max={5} className="h-full">
                  <SpotlightCard className="liquid-glass group h-full">
                    <div className="relative z-[2] flex h-full flex-col gap-4 p-6">
                      <div
                        className={cn(
                          'inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br shadow-lg',
                          a.chip,
                          a.glow,
                        )}
                      >
                        <s.icon className={cn('h-6 w-6', a.icon)} aria-hidden />
                      </div>
                      <h3 className="font-display text-lg font-semibold leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-sm leading-relaxed text-muted-foreground">
                        {s.desc}
                      </p>
                      <div className="mt-auto flex items-center justify-between pt-2">
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/45">
                          0{i + 1}
                        </span>
                        <ArrowUpRight
                          className="h-4 w-4 text-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/80"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
