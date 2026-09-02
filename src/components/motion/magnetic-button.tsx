'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotionPref } from '@/hooks/use-mounted'

type Props = {
  children: React.ReactNode
  as?: keyof typeof motion
  className?: string
  strength?: number // px translation cap
} & React.HTMLAttributes<HTMLElement>

/**
 * MagneticButton — wraps children in a motion.div that translates toward
 * the cursor up to `strength` px. Reduced-motion users get a static element.
 */
export function MagneticButton({
  children,
  className,
  strength = 7,
  ...rest
}: Props) {
  const reduced = useReducedMotionPref()
  const ref = React.useRef<HTMLDivElement | null>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 220, damping: 16, mass: 0.3 })
  const sy = useSpring(y, { stiffness: 220, damping: 16, mass: 0.3 })

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) / (rect.width / 2)
    const dy = (e.clientY - cy) / (rect.height / 2)
    x.set(Math.max(-1, Math.min(1, dx)) * strength)
    y.set(Math.max(-1, Math.min(1, dy)) * strength)
  }

  function reset() {
    x.set(0)
    y.set(0)
  }

  if (reduced) {
    return (
      <div className={cn('inline-flex', className)} {...rest}>
        {children}
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className={cn('inline-flex will-change-transform', className)}
      {...rest}
    >
      {children}
    </motion.div>
  )
}
