'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotionPref } from '@/hooks/use-mounted'

type LineProps = {
  className?: string
  width?: number
  height?: number
  delay?: number
  duration?: number
  orientation?: 'horizontal' | 'vertical' | 'diagonal'
}

/**
 * DrawLine — SVG motion.line that self-draws via pathLength when scrolled
 * into view. Used as a connector in the process timeline.
 */
export function DrawLine({
  className,
  width = 100,
  height = 100,
  delay = 0,
  duration = 1.1,
  orientation = 'diagonal',
}: LineProps) {
  const reduced = useReducedMotionPref()
  const lineProps =
    orientation === 'horizontal'
      ? { x1: 0, y1: height / 2, x2: width, y2: height / 2 }
      : orientation === 'vertical'
        ? { x1: width / 2, y1: 0, x2: width / 2, y2: height }
        : { x1: 0, y1: height, x2: width, y2: 0 }

  if (reduced) {
    return (
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className={cn('block', className)}
        aria-hidden
      >
        <line
          {...lineProps}
          stroke="url(#draw-grad)"
          strokeWidth={2}
          strokeLinecap="round"
        />
        <defs>
          <linearGradient id="draw-grad" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="var(--brand-cyan)" />
            <stop offset="60%" stopColor="var(--brand-sky)" />
            <stop offset="100%" stopColor="var(--brand-gold)" />
          </linearGradient>
        </defs>
      </svg>
    )
  }

  return (
    <svg
      width={width}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className={cn('block', className)}
      aria-hidden
    >
      <motion.line
        {...lineProps}
        stroke="url(#draw-grad)"
        strokeWidth={2}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        whileInView={{ pathLength: 1, opacity: 1 }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      />
      <defs>
        <linearGradient id="draw-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--brand-cyan)" />
          <stop offset="60%" stopColor="var(--brand-sky)" />
          <stop offset="100%" stopColor="var(--brand-gold)" />
        </linearGradient>
      </defs>
    </svg>
  )
}
