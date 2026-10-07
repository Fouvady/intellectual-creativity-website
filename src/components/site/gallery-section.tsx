'use client'

import React from 'react'
import Gallery from '@/components/ui/3d-parallax-unfurling-gallery'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal } from '@/components/motion/stagger-group'

export function GallerySection() {
  return (
    <section
      id="gallery"
      aria-label="Gallery"
      className="cv-auto relative w-full scroll-mt-20"
    >
      {/* Section heading */}
      <div className="mx-auto max-w-7xl px-4 pt-20 sm:px-6 sm:pt-24">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              Portfolio
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="Gallery"
            highlightRange={[0, 0]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
          <SectionReveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              A 3D parallax showcase of our work — telephony, networking,
              surveillance, smart systems, digital signage and beyond.
            </p>
          </SectionReveal>
        </div>
      </div>

      <Gallery />
    </section>
  )
}
