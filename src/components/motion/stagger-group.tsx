'use client'

import * as React from 'react'
import { motion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotionPref } from '@/hooks/use-mounted'

type RevealProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  duration?: number
  y?: number
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

/**
 * SectionReveal — fade + rise on whileInView.
 */
export function SectionReveal({
  children,
  className,
  delay = 0,
  duration = 0.6,
  y = 24,
  as = 'div',
}: RevealProps) {
  const reduced = useReducedMotionPref()
  const MotionTag = motion[as] as typeof motion.div

  if (reduced) {
    return <div className={className}>{children}</div>
  }

  return (
    <MotionTag
      className={cn(className)}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.25 }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </MotionTag>
  )
}

const containerVariants = (stagger: number, delay: number): Variants => ({
  hidden: {},
  visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
})

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 28, filter: 'blur(6px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
}

type GroupProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'section' | 'ul' | 'ol'
  stagger?: number
  delay?: number
}

/**
 * StaggerGroup — wraps a list of StaggerItem children.
 */
export function StaggerGroup({
  children,
  className,
  as = 'div',
  stagger = 0.08,
  delay = 0,
}: GroupProps) {
  const reduced = useReducedMotionPref()
  if (reduced) {
    return <div className={className}>{children}</div>
  }
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={containerVariants(stagger, delay)}
    >
      {children}
    </MotionTag>
  )
}

type ItemProps = {
  children: React.ReactNode
  className?: string
  as?: 'div' | 'li' | 'article' | 'span'
}

export function StaggerItem({ children, className, as = 'div' }: ItemProps) {
  const reduced = useReducedMotionPref()
  if (reduced) {
    return <div className={className}>{children}</div>
  }
  const MotionTag = motion[as] as typeof motion.div
  return (
    <MotionTag className={cn(className)} variants={itemVariants}>
      {children}
    </MotionTag>
  )
}
