'use client'

import * as React from 'react'
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from 'framer-motion'
import { cn } from '@/lib/utils'
import { useReducedMotionPref } from '@/hooks/use-mounted'

type Props = {
  children: React.ReactNode
  className?: string
  max?: number // max tilt in degrees
}

/**
 * TiltCard — 3D tilt on pointer move, perspective 1000, spring smoothing.
 * Reduced-motion users get a static card.
 */
export function TiltCard({ children, className, max = 6 }: Props) {
  const reduced = useReducedMotionPref()
  const ref = React.useRef<HTMLDivElement | null>(null)
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const sx = useSpring(mx, { stiffness: 200, damping: 18, mass: 0.3 })
  const sy = useSpring(my, { stiffness: 200, damping: 18, mass: 0.3 })

  const rotX = useTransform(sy, [0, 1], [max, -max])
  const rotY = useTransform(sx, [0, 1], [-max, max])

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    if (reduced) return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left) / rect.width)
    my.set((e.clientY - rect.top) / rect.height)
  }
  function reset() {
    mx.set(0.5)
    my.set(0.5)
  }

  if (reduced) {
    return <div className={cn(className)}>{children}</div>
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{
        rotateX: rotX,
        rotateY: rotY,
        transformPerspective: 1000,
        transformStyle: 'preserve-3d',
      }}
      className={cn('will-change-transform', className)}
    >
      {children}
    </motion.div>
  )
}
