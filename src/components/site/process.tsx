'use client'

import * as React from 'react'
import { Compass, PenTool, Hammer, Activity } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal, StaggerGroup, StaggerItem } from '@/components/motion/stagger-group'
import { DrawLine } from '@/components/motion/draw-line'
import { cn } from '@/lib/utils'

type Step = {
  num: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  desc: string
}

const STEPS: Step[] = [
  {
    num: '01',
    icon: Compass,
    title: 'Discover',
    desc: 'Advisory — understand the business, the spaces, and the gaps before any cabling is touched.',
  },
  {
    num: '02',
    icon: PenTool,
    title: 'Design',
    desc: 'Architecture — engineered drawings and BOM from world-class vendors.',
  },
  {
    num: '03',
    icon: Hammer,
    title: 'Implement',
    desc: 'Build & cabling — clean installation by experienced engineers and technicians.',
  },
  {
    num: '04',
    icon: Activity,
    title: 'Operate',
    desc: 'Managed services & support — keep systems healthy with SLA-backed response.',
  },
]

const SUPPORT = ['SLA', 'AMC', 'Frame Agreements']

export function Process() {
  return (
    <section
      id="process"
      aria-label="Process"
      className="cv-auto relative scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              How we work
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="From advisory to operations"
            highlightRange={[2, 3]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
        </div>

        {/* Timeline */}
        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-4">
          {STEPS.map((s, i) => (
            <StaggerItem key={s.num}>
              <div className="relative flex h-full flex-col gap-4">
                <div className="flex items-center gap-3">
                  <div className="card-airy inline-flex h-12 w-12 items-center justify-center rounded-2xl">
                    <s.icon className="h-6 w-6 text-accent-cyan" aria-hidden />
                  </div>
                  <span className="font-display text-2xl font-semibold text-foreground/30">
                    {s.num}
                  </span>
                </div>
                <h3 className="font-display text-lg font-semibold">{s.title}</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {s.desc}
                </p>
                {/* Connector (md+) */}
                {i < STEPS.length - 1 && (
                  <div
                    className="hidden md:block"
                    style={{
                      position: 'absolute',
                      top: '24px',
                      right: '-24px',
                    }}
                    aria-hidden
                  >
                    <DrawLine width={48} height={2} orientation="horizontal" duration={0.7} delay={0.1 * i} />
                  </div>
                )}
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>

        {/* Support band */}
        <SectionReveal delay={0.1} className="mt-12">
          <div className="card-airy mx-auto flex max-w-3xl flex-wrap items-center justify-center gap-3 px-6 py-5">
            <span className="text-xs font-medium uppercase tracking-[0.18em] text-foreground/55 font-display">
              Support agreements
            </span>
            {SUPPORT.map((s) => (
              <span
                key={s}
                className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5 text-xs font-semibold text-foreground/80"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
                {s}
              </span>
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
