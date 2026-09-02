'use client'

import * as React from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { useMounted } from '@/hooks/use-mounted'

export function ScrollProgress() {
  const mounted = useMounted()
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 24,
    mass: 0.4,
  })

  if (!mounted) return null

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed left-0 top-0 z-[100] h-[3px] w-full origin-left"
    >
      <div className="h-full w-full bg-[linear-gradient(90deg,var(--brand-cyan),var(--brand-sky)_55%,var(--brand-gold))] shadow-[0_0_12px_0] shadow-brand-cyan/50" />
    </motion.div>
  )
}
