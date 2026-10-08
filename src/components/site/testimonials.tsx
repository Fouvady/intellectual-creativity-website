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
  role: string
  initials: string
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Honestly I was sceptical at first because we had been burned by another IT vendor in Riyadh before. But the team at Intellectual Creativity for Information Technology showed up on time, installed our PABX and CCTV across three branches, labelled every single cable, and trained my staff. Six months in and zero downtime. The only small thing is they could be quicker on WhatsApp replies. But when you call, they pick up. That matters more to me.',
    author: 'Rasheed Rahman',
    role: 'Operations Manager · Retail Chain, Riyadh',
    initials: 'RR',
  },
  {
    quote:
      'I had them install a smart intercom and CCTV at my villa. The engineers were respectful of the house, wore shoe covers, cleaned up after the install, and explained everything in Arabic and English. Pricing was fair with no surprises on the invoice. Would I recommend them? Already did, to two of my neighbours.',
    author: 'Mohammed',
    role: 'Villa Owner · Riyadh',
    initials: 'M',
  },
  {
    quote:
      "Three years working with Intellectual Creativity for Information Technology across two of our commercial buildings covering networking, CCTV, PA system, and building automation. What I appreciate most is that they don't oversell. If a switch still has life left, they tell you to keep it. If it's time to replace, they explain why. That kind of honesty is rare in this market.",
    author: 'Abdur Rahman',
    role: 'Facilities Manager · Commercial Estate, Riyadh',
    initials: 'AR',
  },
  {
    quote: 'Their services are very good. Highly professional.',
    author: 'Ahmed',
    role: 'Customer',
    initials: 'A',
  },
  {
    quote: 'They are doing a great job. Keep it up. Highly recommended.',
    author: 'Zawahir',
    role: 'Customer',
    initials: 'Z',
  },
]

const AVATAR_GRADIENTS = [
  'from-brand-cyan to-brand-sky',
  'from-brand-sky to-brand-gold',
  'from-brand-gold to-brand-cyan',
  'from-brand-cyan to-brand-sky',
  'from-brand-sky to-brand-gold',
]

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
            text="What our client says"
            highlightRange={[2, 3]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
          <SectionReveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              Honest words from clients across Riyadh who trust Intellectual
              Creativity for Information Technology with their telephony,
              networking, security and automation.
            </p>
          </SectionReveal>
        </div>

        <StaggerGroup className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => (
            <StaggerItem key={t.author} className={cn('animate-float', i >= 3 && 'lg:col-start-auto md:col-span-2 lg:col-span-1')}>
              <SpotlightCard className="card-airy liquid-border h-full">
                <div className="relative z-[2] flex h-full flex-col gap-5 p-7 sm:p-8">
                  <Quote className="h-8 w-8 shrink-0 text-accent-cyan opacity-80" aria-hidden />
                  <blockquote className="font-display text-base font-medium leading-relaxed text-balance sm:text-lg">
                    “{t.quote}”
                  </blockquote>
                  <div className="mt-auto flex items-center gap-3 pt-2">
                    <div
                      className={cn(
                        'inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br font-display text-sm font-bold text-white shadow-lg',
                        AVATAR_GRADIENTS[i % AVATAR_GRADIENTS.length],
                      )}
                      aria-hidden
                    >
                      {t.initials}
                    </div>
                    <div className="min-w-0">
                      <p className="font-display text-sm font-semibold leading-tight">
                        {t.author}
                      </p>
                      <p className="text-[11px] leading-tight text-foreground/55">
                        {t.role}
                      </p>
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
