'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useMounted, useReducedMotionPref } from '@/hooks/use-mounted'

/**
 * Preloader — a smooth, well-orchestrated brand intro on every page load.
 *
 * Timing (~3s total experience):
 *   0.0s  overlay fades in (instant — no flash)
 *   0.1s  logo fades + scales in (0.7s)
 *   0.5s  caption fades up (0.6s)
 *   0.0s  progress bar begins filling (2.3s, synced to the dismiss)
 *   2.4s  overlay exits — fade + slight scale-up (0.6s) revealing the site
 *
 * The progress bar reaches 100% exactly as the exit begins, so there's no
 * awkward "full bar pause" that would feel like a glitch. The exit is a
 * gentle fade + scale so the site is revealed smoothly, not popped in.
 *
 * Reduced-motion users get an instant dismiss.
 */
export function Preloader() {
  const mounted = useMounted()
  const reduced = useReducedMotionPref()
  const [done, setDone] = React.useState(false)

  // Hold the preloader for 2.4s before dismissing (the exit animation adds
  // another 0.6s, so the whole experience is ~3s).
  React.useEffect(() => {
    if (!mounted) return
    const t = setTimeout(() => setDone(true), reduced ? 0 : 2400)
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
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo — fade + scale in */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 8 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
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

          {/* Caption — fades up after the logo */}
          <motion.p
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-5 text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-xs"
          >
            Creativity for Information Technology
          </motion.p>

          {/* Progress bar — fills over 2.3s so it reaches 100% right as the
              exit begins (dismiss at 2.4s). No "full bar pause" glitch. */}
          <div className="mt-7 h-[3px] w-48 overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2.3, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: '0% 50%' }}
              className="h-full w-full rounded-full gradient-brand"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
