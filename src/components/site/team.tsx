'use client'

import * as React from 'react'
import { ShieldCheck, Handshake, Users, Server } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal, StaggerGroup, StaggerItem } from '@/components/motion/stagger-group'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { cn } from '@/lib/utils'

const VALUES = [
  {
    icon: ShieldCheck,
    title: 'Trust',
    desc: 'We earn it every install, every service call, every quarter we keep systems healthy.',
  },
  {
    icon: Handshake,
    title: 'Integrity',
    desc: 'Honest advice, transparent pricing, and recommendations that fit the business — not the invoice.',
  },
  {
    icon: Users,
    title: 'Teamwork',
    desc: 'Engineers, technicians and account managers working as one team with the customer.',
  },
] as const

const MISSION =
  'Our mission is to enhance the economic business value of our customers by delivering best-of-breed products and solutions and to become a synonym for the best service and quality. Innovation is the ability to see change as an opportunity.'

export function About() {
  return (
    <section
      id="about"
      aria-label="About"
      className="cv-auto relative scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              Who we are
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="Intellectual Creativity for Information Technology"
            highlightRange={[0, 2]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
        </div>

        {/* Values */}
        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {VALUES.map((v) => (
            <StaggerItem key={v.title}>
              <SpotlightCard className="card-airy group h-full">
                <div className="relative z-[2] flex h-full flex-col gap-4 p-6">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-brand-cyan/30 to-brand-cyan/5 text-accent-cyan shadow-lg shadow-brand-cyan/20">
                    <v.icon className="h-6 w-6" aria-hidden />
                  </div>
                  <h3 className="font-display text-lg font-semibold">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {v.desc}
                  </p>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Mission */}
        <div className="mt-10 grid gap-6 md:grid-cols-5 md:items-stretch">
          <SectionReveal className="md:col-span-3">
            <div className="card-airy h-full p-8 sm:p-10">
              <p className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/55 font-display">
                Our mission
              </p>
              <AnimatedText
                as="p"
                text={MISSION}
                stagger={0.012}
                className="mt-4 text-balance text-base leading-relaxed text-foreground/85 sm:text-lg"
              />
            </div>
          </SectionReveal>
          <SectionReveal delay={0.1} className="md:col-span-2">
            <SpotlightCard className="card-airy liquid-border h-full overflow-hidden">
              <div className="aurora" aria-hidden />
              <div className="relative z-[2] flex h-full flex-col justify-between gap-6 p-8 sm:p-10">
                <Server className="h-9 w-9 text-accent-cyan" aria-hidden />
                <div>
                  <h3 className="font-display text-2xl font-semibold">
                    Efficient servers
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    Engineered infrastructure that scales with the business —
                    secure, observable, and built for 99.9% uptime SLOs.
                  </p>
                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-accent-cyan">
                    <span className="h-2 w-2 rounded-full bg-brand-cyan animate-status" aria-hidden />
                    All systems operational
                  </div>
                </div>
              </div>
            </SpotlightCard>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
