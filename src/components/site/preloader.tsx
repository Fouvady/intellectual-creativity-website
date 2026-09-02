'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useMounted, useReducedMotionPref } from '@/hooks/use-mounted'

/**
 * Preloader — a quick, clean brand intro on every page load.
 *
 * Just the logo fading + scaling in with a thin gradient progress bar
 * underneath, then the overlay fades out to reveal the site. ~0.9s total,
 * never feels like it's getting in the way of the website.
 *
 * Reduced-motion users get an instant dismiss.
 */
export function Preloader() {
  const mounted = useMounted()
  const reduced = useReducedMotionPref()
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (!mounted) return
    const t = setTimeout(() => setDone(true), reduced ? 0 : 900)
    return () => clearTimeout(t)
  }, [mounted, reduced])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-label="Loading Intellectual Creativity"
          role="status"
          aria-live="polite"
          className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.45, ease: 'easeOut' }}
        >
          {/* Logo — fade + scale in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.94, y: 6 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="px-6"
          >
            <Image
              src="/brand/logo-white.png"
              alt="Intellectual Creativity — for Information Technology"
              width={300}
              height={140}
              priority
              className="logo-adaptive h-auto w-[min(60vw,280px)]"
            />
          </motion.div>

          {/* Thin gradient progress bar */}
          <div className="mt-6 h-[3px] w-44 overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: '0% 50%' }}
              className="h-full w-full rounded-full gradient-brand"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
