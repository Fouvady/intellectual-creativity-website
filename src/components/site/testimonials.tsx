'use client'

import * as React from 'react'
import { Quote } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal, StaggerGroup, StaggerItem } from '@/components/motion/stagger-group'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { cn } from '@/lib/utils'

type Testimonial = {
  quote: string
  author: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote: 'Their services are very good. Highly professional.',
    author: 'Ahmed',
  },
  {
    quote: "They are doing a great job. Keep it up. Highly recommended.",
    author: 'Zawahir',
  },
]

const AVATAR_GRADIENTS = ['from-brand-cyan to-brand-sky', 'from-brand-sky to-brand-gold']

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-label="Testimonials"
      className="cv-auto relative scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              Testimonials
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="What our clients say"
            highlightRange={[2, 3]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
        </div>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2">
          {TESTIMONIALS.map((t, i) => (
            <StaggerItem key={t.author} className="animate-float" >
              <SpotlightCard className="card-airy liquid-border h-full">
                <div className="relative z-[2] flex h-full flex-col gap-6 p-8 sm:p-10">
                  <Quote className="h-9 w-9 text-accent-cyan opacity-80" aria-hidden />
                  <blockquote className="font-display text-xl font-medium leading-relaxed text-balance sm:text-2xl">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-auto flex items-center gap-3">
                    <div
                      className={cn(
                        'inline-flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br font-display text-lg font-semibold text-white',
                        AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                      )}
                      aria-hidden
                    >
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-display text-sm font-semibold">{t.author}</p>
                      <p className="text-xs text-foreground/55">Customer</p>
                    </div>
                  </div>
                </div>
              </SpotlightCard>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  )
}
