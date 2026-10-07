'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { ShieldCheck, Sparkles, Heart, Globe, Award } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal, StaggerGroup, StaggerItem } from '@/components/motion/stagger-group'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { cn } from '@/lib/utils'

type Diff = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
  featured?: boolean
}

const DIFFS: Diff[] = [
  {
    icon: Award,
    title: 'Distinguished References',
    desc: 'A portfolio of trusted clients across commercial, retail, masjid and enterprise estates in Saudi Arabia.'
  },
  {
    icon: Sparkles,
    title: 'Intellectual Creativity for Information Technology',
    desc: 'AI for Advanced Threat Protection — signature + behavioural detection that keeps networks ahead of attackers.',
    featured: true,
  },
  {
    icon: ShieldCheck,
    title: 'Why Intellectual Creativity for Information Technology',
    desc: 'Engineers and technicians with deep field experience across the brands we support.',
  },
  {
    icon: Heart,
    title: 'Fostering Relationships',
    desc: 'Long-term partnerships built on trust, integrity and consistent delivery.',
  },
  {
    icon: Globe,
    title: 'World Class Vendors',
    desc: 'Cisco, Nokia, Siemens-Unify, Lucent-Alcatel and Avaya — the best of breed in every install.',
  },
]

export function WhyUs() {
  return (
    <section
      id="why-us"
      aria-label="Why us"
      className="cv-auto relative scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              Differentiators
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="Why Intellectual"
            highlightRange={[1, 1]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
        </div>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {DIFFS.map((d) => (
            <StaggerItem
              key={d.title}
              className={cn(d.featured && 'lg:row-span-2')}
            >
              <SpotlightCard
                className={cn(
                  'card-airy group h-full',
                  d.featured && 'liquid-border animate-breathe',
                )}
              >
                <div className="relative z-[2] flex h-full flex-col gap-4 p-6">
                  <div
                    className={cn(
                      'inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-foreground/10 bg-foreground/5 transition-colors',
                      d.featured && 'bg-gradient-to-br from-brand-gold/30 to-brand-gold/5 text-accent-gold',
                    )}
                  >
                    <d.icon
                      className={cn(
                        'h-6 w-6',
                        d.featured ? 'text-accent-gold' : 'text-accent-cyan',
                      )}
                      aria-hidden
                    />
                  </div>
                  <h3 className="font-display text-lg font-semibold leading-snug">
                    {d.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {d.desc}
                  </p>
                  {d.featured && (
                    <div className="mt-auto pt-4">
                      <span className="inline-flex items-center gap-2 rounded-full border border-brand-gold/30 bg-brand-gold/10 px-3 py-1 text-xs font-semibold text-accent-gold">
                        <ShieldCheck className="h-3.5 w-3.5" aria-hidden />
                        AI · Advanced Threat Protection
                      </span>
                    </div>
                  )}
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
