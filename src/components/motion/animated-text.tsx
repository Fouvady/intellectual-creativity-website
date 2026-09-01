'use client'

import * as React from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

type Props = {
  text: string
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  className?: string
  delay?: number
  stagger?: number
  highlightRange?: [number, number] // word indices to gradient-highlight (inclusive)
}

/**
 * AnimatedText — word-by-word blur+rise reveal with optional
 * gradient-highlighted range of word indices.
 */
export function AnimatedText({
  text,
  as = 'h2',
  className,
  delay = 0,
  stagger = 0.06,
  highlightRange,
}: Props) {
  const words = React.useMemo(() => text.split(' '), [text])
  const MotionTag = motion[as] as typeof motion.h2

  return (
    <MotionTag
      className={cn('inline-block', className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      aria-label={text}
    >
      {words.map((w, i) => {
        const inRange =
          highlightRange &&
          i >= highlightRange[0] &&
          i <= highlightRange[1]
        return (
          <React.Fragment key={`${w}-${i}`}>
            <motion.span
              className={cn(
                'inline-block will-change-[transform,opacity,filter]',
                inRange && 'gradient-text',
              )}
              variants={{
                hidden: { opacity: 0, y: '0.45em', filter: 'blur(8px)' },
                visible: {
                  opacity: 1,
                  y: '0em',
                  filter: 'blur(0px)',
                  transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
                },
              }}
            >
              {w}
            </motion.span>
            {i < words.length - 1 ? ' ' : ''}
          </React.Fragment>
        )
      })}
    </MotionTag>
  )
}
