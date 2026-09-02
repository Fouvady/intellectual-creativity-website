'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal } from '@/components/motion/stagger-group'

type Props = {
  eyebrow?: string
  title: string
  subtitle?: string
  as?: 'h1' | 'h2'
  highlightRange?: [number, number]
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  subtitle,
  as = 'h2',
  highlightRange,
  align = 'center',
  className,
}: Props) {
  return (
    <div
      className={cn(
        'flex flex-col gap-3',
        align === 'center' ? 'items-center text-center' : 'items-start text-left',
        className,
      )}
    >
      {eyebrow && (
        <SectionReveal>
          <span
            className={cn(
              'inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1',
              'text-xs font-medium uppercase tracking-[0.18em] text-foreground/70',
              'font-display',
            )}
          >
            <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
            {eyebrow}
          </span>
        </SectionReveal>
      )}
      <AnimatedText
        as={as}
        text={title}
        highlightRange={highlightRange}
        className={cn(
          'text-balance font-display font-semibold tracking-tight',
          as === 'h1'
            ? 'text-4xl sm:text-5xl md:text-6xl'
            : 'text-3xl sm:text-4xl md:text-5xl',
        )}
      />
      {subtitle && (
        <SectionReveal delay={0.08}>
          <p
            className={cn(
              'max-w-2xl text-balance text-base text-muted-foreground sm:text-lg',
              align === 'center' ? 'mx-auto' : '',
            )}
          >
            {subtitle}
          </p>
        </SectionReveal>
      )}
    </div>
  )
}
