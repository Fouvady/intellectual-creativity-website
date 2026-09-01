'use client'

import * as React from 'react'
import { ArrowUpRight } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal, StaggerGroup, StaggerItem } from '@/components/motion/stagger-group'
import { TiltCard } from '@/components/motion/tilt-card'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { cn } from '@/lib/utils'

type Project = {
  title: string
  tag: string
  desc: string
  accent: 'cyan' | 'sky' | 'gold'
  preview: 'grid' | 'cctv' | 'uptime'
}

const PROJECTS: Project[] = [
  {
    title: 'Unified Communication & Collaboration',
    tag: 'Cisco-grade UC',
    desc: 'Voice, video, messaging and contact-centre workloads integrated across sites — with Webex Calling and on-prem PABX.',
    accent: 'cyan',
    preview: 'grid',
  },
  {
    title: 'Physical Security & CCTV',
    tag: 'AI-assisted threat protection',
    desc: 'AI-assisted CCTV, VMS and access control designed to scale from single sites to multi-estate rollouts.',
    accent: 'gold',
    preview: 'cctv',
  },
  {
    title: 'Data Center & Network Infrastructure',
    tag: '99.9% uptime SLOs',
    desc: 'Structured cabling, switching, routing and Wi-Fi engineered to deliver 99.9% uptime SLOs and beyond.',
    accent: 'sky',
    preview: 'uptime',
  },
]

const ACCENT_TEXT = {
  cyan: 'text-accent-cyan',
  sky: 'text-accent-sky',
  gold: 'text-accent-gold',
} as const

function BrowserMock({ kind, accent }: { kind: Project['preview']; accent: Project['accent'] }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-foreground/10 bg-foreground/3">
      <div className="flex items-center gap-1.5 border-b border-foreground/10 bg-foreground/4 px-3 py-2">
        <span className="h-2 w-2 rounded-full bg-[color-mix(in_oklch,var(--destructive)_75%,transparent)]" />
        <span className="h-2 w-2 rounded-full bg-amber-500/70" />
        <span className="h-2 w-2 rounded-full bg-emerald-500/70" />
        <span className="ml-3 inline-flex h-4 flex-1 items-center rounded bg-foreground/6 px-2 font-mono text-[10px] text-foreground/45">
          intellectualcf.com/{kind}
        </span>
      </div>
      <div className="relative h-36 p-4">
        {kind === 'grid' && (
          <div className="grid h-full grid-cols-4 gap-1.5">
            {Array.from({ length: 16 }).map((_, i) => (
              <div
                key={i}
                className={cn(
                  'rounded-sm',
                  i % 3 === 0
                    ? 'bg-brand-cyan/40'
                    : i % 3 === 1
                      ? 'bg-brand-sky/30'
                      : 'bg-foreground/8',
                )}
                style={{
                  animation: `glow-breathe ${4 + (i % 5) * 0.2}s ease-in-out ${i * 0.1}s infinite`,
                }}
              />
            ))}
          </div>
        )}
        {kind === 'cctv' && (
          <div className="grid h-full grid-cols-3 grid-rows-2 gap-1.5">
            {Array.from({ length: 6 }).map((_, i) => (
              <div
                key={i}
                className="relative overflow-hidden rounded-sm bg-foreground/6"
              >
                <div className="absolute left-1 top-1 font-mono text-[8px] uppercase tracking-wider text-foreground/40">
                  CAM 0{i + 1}
                </div>
                <div
                  className="absolute bottom-1 right-1 h-1.5 w-1.5 rounded-full bg-brand-gold animate-status"
                  aria-hidden
                />
              </div>
            ))}
          </div>
        )}
        {kind === 'uptime' && (
          <div className="flex h-full flex-col justify-end gap-2">
            <div className="flex items-end gap-1.5">
              {[40, 65, 50, 78, 60, 88, 72, 95, 80].map((h, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t-sm bg-[linear-gradient(to_top,var(--brand-cyan),var(--brand-sky))]"
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-foreground/55">
              <span>uptime</span>
              <span className={ACCENT_TEXT[accent]}>99.9%</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export function Work() {
  return (
    <section
      id="work"
      aria-label="Work"
      className="relative scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              Outcomes
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="Outcomes we're proud to put our name on"
            highlightRange={[0, 1]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
        </div>

        <StaggerGroup className="mt-12 grid gap-5 md:grid-cols-3">
          {PROJECTS.map((p) => (
            <StaggerItem key={p.title}>
              <TiltCard max={5} className="h-full">
                <SpotlightCard className="liquid-glass liquid-border group h-full">
                  <div className="relative z-[2] flex h-full flex-col gap-4 p-5">
                    <BrowserMock kind={p.preview} accent={p.accent} />
                    <span
                      className={cn(
                        'inline-flex w-fit items-center gap-1.5 rounded-full border border-foreground/12 bg-foreground/5 px-3 py-1 text-xs font-semibold',
                        ACCENT_TEXT[p.accent],
                      )}
                    >
                      {p.tag}
                    </span>
                    <h3 className="font-display text-lg font-semibold leading-snug">
                      {p.title}
                    </h3>
                    <p className="text-sm leading-relaxed text-muted-foreground">
                      {p.desc}
                    </p>
                    <div className="mt-auto flex items-center gap-1 text-xs font-semibold text-foreground/55 transition-colors group-hover:text-foreground">
                      <span>View case study</span>
                      <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
                    </div>
                  </div>
                </SpotlightCard>
              </TiltCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
