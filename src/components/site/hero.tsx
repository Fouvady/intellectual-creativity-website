'use client'

import * as React from 'react'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, ShieldCheck, Handshake, Users } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal } from '@/components/motion/stagger-group'
import { MagneticButton } from '@/components/motion/magnetic-button'
import { TiltCard } from '@/components/motion/tilt-card'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { useReducedMotionPref } from '@/hooks/use-mounted'

const TRUST_CHIPS = [
  { icon: ShieldCheck, label: 'Trust' },
  { icon: Handshake, label: 'Integrity' },
  { icon: Users, label: 'Teamwork' },
]

const BARS = [42, 68, 35, 82, 58, 92, 48]

export function Hero() {
  const reduced = useReducedMotionPref()
  const { scrollY } = useScroll()
  const orbY = useTransform(scrollY, [0, 600], [0, reduced ? 0 : -80])
  const orbY2 = useTransform(scrollY, [0, 600], [0, reduced ? 0 : 60])

  return (
    <section
      aria-label="Hero"
      className="relative isolate overflow-hidden pt-28 sm:pt-32 md:pt-36"
    >
      {/* Background goo-filtered orbs with scroll parallax */}
      {!reduced && (
        <div
          className="pointer-events-none absolute inset-0 -z-10"
          style={{ filter: 'url(#goo)' }}
          aria-hidden
        >
          <motion.div
            style={{ y: orbY }}
            className="absolute -top-10 left-[10%] h-[42vw] w-[42vw] max-h-[460px] max-w-[460px] rounded-full bg-brand-cyan/30 blur-2xl animate-orb-1"
          />
          <motion.div
            style={{ y: orbY2 }}
            className="absolute -right-[8%] top-[18%] h-[36vw] w-[36vw] max-h-[420px] max-w-[420px] rounded-full bg-brand-sky/30 blur-2xl animate-orb-2"
          />
          <div className="absolute bottom-[-10%] left-1/2 h-[30vw] w-[30vw] max-h-[360px] max-w-[360px] -translate-x-1/2 rounded-full bg-brand-gold/20 blur-3xl animate-orb-3" />
        </div>
      )}
      <div className="absolute inset-0 -z-10 dot-grid opacity-30" aria-hidden />

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 pb-16 sm:px-6 md:grid-cols-2 md:gap-8 md:pb-24">
        {/* Left column */}
        <div className="flex flex-col gap-6">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              IT &amp; Trading Specialists — Dubai, UAE
            </span>
          </SectionReveal>

          <AnimatedText
            as="h1"
            text="Creativity for intelligent information technology"
            highlightRange={[2, 5]}
            delay={0.05}
            className="text-balance font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl md:text-6xl"
          />

          <SectionReveal delay={0.12}>
            <p className="max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
              We Meant For Solutions &amp; Services. We are a Dubai-based IT &amp;
              telecommunications partner delivering telephone systems, networking,
              security and smart-building solutions that keep businesses running.
            </p>
          </SectionReveal>

          <SectionReveal delay={0.18}>
            <div className="flex flex-wrap items-center gap-3">
              <a href="#contact" className="inline-flex">
                <MagneticButton strength={8}>
                  <span className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-6 py-3 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-cyan/30 transition-shadow hover:shadow-brand-cyan/60">
                    Get Started
                    <ArrowRight className="h-4 w-4" aria-hidden />
                  </span>
                </MagneticButton>
              </a>
              <a
                href="#services"
                className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10"
              >
                Our Services
              </a>
            </div>
          </SectionReveal>

          <SectionReveal delay={0.24}>
            <ul className="flex flex-wrap items-center gap-2 pt-2">
              {TRUST_CHIPS.map((chip) => (
                <li
                  key={chip.label}
                  className="inline-flex items-center gap-1.5 rounded-full border border-foreground/12 bg-foreground/4 px-3 py-1.5 text-xs font-medium text-foreground/75"
                >
                  <chip.icon className="h-3.5 w-3.5 text-accent-cyan" aria-hidden />
                  {chip.label}
                </li>
              ))}
            </ul>
          </SectionReveal>
        </div>

        {/* Right column — NOC glass dashboard */}
        <div className="relative">
          <TiltCard max={4} className="relative">
            <SpotlightCard className="liquid-glass liquid-border h-full">
              <div className="relative z-[2] p-5 sm:p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-display text-xs uppercase tracking-[0.18em] text-foreground/55">
                      Network Operations
                    </p>
                    <p className="font-display text-sm font-semibold">
                      Advanced Threat Protection
                    </p>
                  </div>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-status" />
                    Live
                  </span>
                </div>

                <div className="mt-5 grid grid-cols-3 gap-3">
                  {[
                    { label: 'Uptime', value: '99.9%' },
                    { label: 'Threats Blocked', value: '12.4k' },
                    { label: 'Endpoints', value: '320' },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-foreground/10 bg-foreground/4 p-3"
                    >
                      <p className="text-[10px] uppercase tracking-wider text-foreground/55">
                        {m.label}
                      </p>
                      <p className="mt-0.5 font-display text-lg font-semibold text-accent-cyan">
                        {m.value}
                      </p>
                    </div>
                  ))}
                </div>

                <div className="mt-5 rounded-xl border border-foreground/10 bg-foreground/4 p-4">
                  <div className="mb-3 flex items-center justify-between">
                    <p className="text-[11px] uppercase tracking-wider text-foreground/55">
                      Network throughput
                    </p>
                    <p className="text-[11px] text-foreground/55">last 7 days</p>
                  </div>
                  <div className="flex h-24 items-end gap-1.5">
                    {BARS.map((h, i) => (
                      <motion.div
                        key={i}
                        initial={{ height: 0 }}
                        whileInView={{ height: `${h}%` }}
                        viewport={{ once: true }}
                        transition={{
                          duration: 0.7,
                          delay: 0.05 * i,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="flex-1 rounded-t-sm bg-[linear-gradient(to_top,var(--brand-cyan),var(--brand-sky)_60%,var(--brand-gold))]"
                      />
                    ))}
                  </div>
                </div>

                <div className="mt-4 flex items-center gap-2 text-[11px] text-foreground/55">
                  <span className="h-2 w-2 rounded-full bg-brand-cyan animate-status" />
                  <span>AI threat protection · signature + behaviour</span>
                </div>
              </div>
            </SpotlightCard>
          </TiltCard>
        </div>
      </div>
    </section>
  )
}
