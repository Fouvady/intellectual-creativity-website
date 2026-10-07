'use client'

import * as React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useMounted, useReducedMotionPref } from '@/hooks/use-mounted'

/**
 * Preloader — a SINGLE seamless brand intro on every page load.
 *
 * A blocking HTML #initial-preloader covers the very first paint (defined in
 * layout.tsx). When this React Preloader mounts, it instantly appears at
 * FULL opacity (no fade-in) so the handoff from the blocking overlay is
 * invisible — no blank gap, no double-load feel. It then runs a smooth
 * progress bar for ~2s and exits with a gentle fade+scale to reveal the
 * site. Total visible experience ~2.6s, one continuous loading screen.
 *
 * Reduced-motion users get an instant dismiss.
 */
export function Preloader() {
  const mounted = useMounted()
  const reduced = useReducedMotionPref()
  const [done, setDone] = React.useState(false)

  React.useEffect(() => {
    if (!mounted) return
    // Immediately dismiss the blocking HTML preloader — this React one is
    // already at full opacity (no fade-in), so the handoff is invisible.
    try {
      // @ts-expect-error – injected by the inline script in layout.tsx
      if (typeof window.__icf_preloader_ready === 'function') {
        // @ts-expect-error – same
        window.__icf_preloader_ready()
      }
    } catch {
      /* ignore */
    }
    // Hold for ~2s, then exit over 0.6s. Total ~2.6s.
    const t = setTimeout(() => setDone(true), reduced ? 0 : 2000)
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
          // Starts at full opacity (matches the blocking overlay) so the
          // handoff is seamless. Exits with a gentle fade + slight scale-up.
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 1.03 }}
          transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
        >
          {/* Logo — already visible (no fade-in) to match the blocking overlay */}
          <div className="px-6">
            <Image
              src="/brand/logo-white.png"
              alt="Intellectual Creativity — for Information Technology"
              width={300}
              height={140}
              priority
              className="logo-adaptive h-auto w-[min(60vw,280px)]"
            />
          </div>

          {/* Caption */}
          <p className="mt-5 text-[11px] font-medium uppercase tracking-[0.32em] text-muted-foreground sm:text-xs">
            Intellectual Creativity for Information Technology
          </p>

          {/* Progress bar — fills over 2s, reaching 100% as the exit begins */}
          <div className="mt-7 h-[3px] w-48 overflow-hidden rounded-full bg-foreground/10">
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 2, ease: [0.4, 0, 0.2, 1] }}
              style={{ transformOrigin: '0% 50%' }}
              className="h-full w-full rounded-full gradient-brand"
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

