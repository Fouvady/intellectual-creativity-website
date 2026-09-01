'use client'

import * as React from 'react'
import { SectionReveal, StaggerGroup, StaggerItem } from '@/components/motion/stagger-group'

const VENDORS = ['Cisco', 'Nokia', 'Siemens-Unify', 'Lucent-Alcatel', 'Avaya']

export function TrustBar() {
  return (
    <section
      aria-label="Trusted vendors"
      className="border-y border-foreground/8 bg-foreground/2 py-8"
    >
      <SectionReveal className="mx-auto max-w-7xl px-4 sm:px-6">
        <p className="mb-5 text-center font-display text-xs font-medium uppercase tracking-[0.22em] text-foreground/55">
          World-class vendors we work with
        </p>
        <StaggerGroup className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4">
          {VENDORS.map((v) => (
            <StaggerItem
              key={v}
              className="font-display text-lg font-semibold tracking-tight text-foreground/70 transition-colors hover:text-foreground sm:text-xl"
            >
              {v}
            </StaggerItem>
          ))}
        </StaggerGroup>
      </SectionReveal>
    </section>
  )
}
