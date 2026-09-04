'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { SectionReveal } from '@/components/motion/stagger-group'
import { useCountUp } from '@/hooks/use-count-up'

type Stat = { end: number; suffix: string; label: string }

const STATS: Stat[] = [
  { end: 120, suffix: '+', label: 'Projects Completed' },
  { end: 90, suffix: '+', label: 'Satisfied Customers' },
  { end: 25, suffix: '+', label: 'Team Members' },
  { end: 12, suffix: '+', label: 'Years Of Experience' },
]

function StatItem({ end, suffix, label }: Stat) {
  const { ref, value } = useCountUp({ end, suffix, duration: 1.6 })
  return (
    <div className="flex flex-col items-center text-center">
      <span
        ref={ref}
        className="font-display text-4xl font-semibold tracking-tight gradient-text sm:text-5xl"
      >
        {value}
      </span>
      <span className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-foreground/60 sm:text-sm">
        {label}
      </span>
    </div>
  )
}

export function Stats() {
  return (
    <section
      aria-label="Stats"
      className="cv-auto relative scroll-mt-20 overflow-hidden py-16 sm:py-20"
    >
      <div className="aurora" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        <SectionReveal>
          <div className="liquid-glass grid grid-cols-2 gap-y-8 px-6 py-10 sm:px-12 md:grid-cols-4">
            {STATS.map((s) => (
              <StatItem key={s.label} {...s} />
            ))}
          </div>
        </SectionReveal>
      </div>
    </section>
  )
}
