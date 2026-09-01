'use client'

import * as React from 'react'
import { AnimatePresence, motion, useMotionValue, animate } from 'framer-motion'
import Image from 'next/image'
import { useMounted, useReducedMotionPref } from '@/hooks/use-mounted'

const BOOT_LINES = [
  '› Initializing network OK',
  '› Security modules READY',
  '› Threat protection ACTIVE',
]

/**
 * Preloader — cinematic brand intro that plays on every load.
 * Multi-act: curtain panels part on exit, ambient glow + dot grid,
 * hexagonal circuit mesh, 3 rotating orbit rings, segmented gradient
 * progress ring, logo materializes with glitch scanline sweep,
 * shimmer wordmark caption, terminal boot sequence, progress bar + counter.
 *
 * Reduced-motion users get an instant dismiss.
 */
export function Preloader() {
  const mounted = useMounted()
  const reduced = useReducedMotionPref()
  const [done, setDone] = React.useState(false)
  const [progress, setProgress] = React.useState(0)
  const [bootIdx, setBootIdx] = React.useState(-1)
  const progressMV = useMotionValue(0)

  // Reduced-motion => instant dismiss
  React.useEffect(() => {
    if (!mounted) return
    if (reduced) {
      setBootIdx(BOOT_LINES.length - 1)
      setProgress(100)
      const t = setTimeout(() => setDone(true), 50)
      return () => clearTimeout(t)
    }
  }, [mounted, reduced])

  // Animated counter 0→100 with rAF ease-out-cubic (~1.9s)
  React.useEffect(() => {
    if (!mounted || reduced) return
    const controls = animate(progressMV, 100, {
      duration: 1.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
    })
    return () => controls.stop()
  }, [mounted, reduced, progressMV])

  // Boot lines typing — staged
  React.useEffect(() => {
    if (!mounted || reduced) return
    const t1 = setTimeout(() => setBootIdx(0), 560)
    const t2 = setTimeout(() => setBootIdx(1), 1080)
    const t3 = setTimeout(() => setBootIdx(2), 1520)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
      clearTimeout(t3)
    }
  }, [mounted, reduced])

  // Dismiss after the cinematic completes
  React.useEffect(() => {
    if (!mounted) return
    const t = setTimeout(() => setDone(true), reduced ? 0 : 2200)
    return () => clearTimeout(t)
  }, [mounted, reduced])

  if (!mounted) return null

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          aria-label="Loading Intellectual Creativity"
          role="dialog"
          aria-busy="true"
          aria-live="polite"
          className="fixed inset-0 z-[200] overflow-hidden bg-background"
          initial={{ opacity: 1 }}
          exit={{ opacity: 1 }}
        >
          {/* Two-panel curtain: top slides up, bottom slides down on exit */}
          <motion.div
            className="absolute inset-x-0 top-0 h-1/2 bg-background"
            initial={{ y: 0 }}
            exit={{ y: '-101%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ zIndex: 10 }}
            aria-hidden
          />
          <motion.div
            className="absolute inset-x-0 bottom-0 h-1/2 bg-background"
            initial={{ y: 0 }}
            exit={{ y: '101%' }}
            transition={{ duration: 0.7, ease: [0.76, 0, 0.24, 1] }}
            style={{ zIndex: 10 }}
            aria-hidden
          />

          {/* Ambient: radial cyan glow + drifting aurora + dot grid (masked to center) */}
          <div
            className="absolute inset-0"
            style={{
              background:
                'radial-gradient(50% 50% at 50% 50%, color-mix(in oklch, var(--brand-cyan) 22%, transparent), transparent 70%)',
              zIndex: 1,
            }}
            aria-hidden
          />
          <div className="aurora" aria-hidden />
          <div
            className="absolute inset-0 dot-grid opacity-40"
            style={{
              WebkitMaskImage:
                'radial-gradient(60% 60% at 50% 50%, black 30%, transparent 75%)',
              maskImage:
                'radial-gradient(60% 60% at 50% 50%, black 30%, transparent 75%)',
              zIndex: 1,
            }}
            aria-hidden
          />

          {/* Center stage */}
          <div className="absolute inset-0 grid place-items-center" style={{ zIndex: 5 }}>
            <div className="relative grid place-items-center">
              {/* Hexagonal circuit mesh — two concentric hexagons self-draw */}
              <svg
                width="380"
                height="380"
                viewBox="0 0 380 380"
                className="absolute"
                aria-hidden
              >
                <motion.path
                  d="M190 30 L330 110 L330 270 L190 350 L50 270 L50 110 Z"
                  fill="none"
                  stroke="var(--brand-sky)"
                  strokeWidth="1.2"
                  strokeOpacity="0.55"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.6, ease: 'easeInOut' }}
                />
                <motion.path
                  d="M190 90 L275 138 L275 242 L190 290 L105 242 L105 138 Z"
                  fill="none"
                  stroke="var(--brand-cyan)"
                  strokeWidth="1.2"
                  strokeOpacity="0.7"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 1.4, delay: 0.2, ease: 'easeInOut' }}
                />
              </svg>

              {/* 3 concentric rotating rings */}
              <div
                className="absolute h-[300px] w-[300px] rounded-full border border-dashed border-foreground/15 animate-orbit-slow"
                aria-hidden
              >
                <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-brand-sky shadow-[0_0_10px_2px] shadow-brand-sky/60" />
              </div>
              <div
                className="absolute h-[220px] w-[220px] rounded-full border border-foreground/10 animate-orbit-rev"
                aria-hidden
              >
                <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-cyan shadow-[0_0_8px_2px] shadow-brand-cyan/60" />
              </div>
              <div
                className="absolute h-[150px] w-[150px] rounded-full border border-foreground/10 animate-orbit-fast"
                aria-hidden
              >
                <span className="absolute -top-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-brand-gold shadow-[0_0_10px_2px] shadow-brand-gold/70" />
                <span className="absolute top-1/2 -right-1 h-1.5 w-1.5 -translate-y-1/2 rounded-full bg-brand-gold shadow-[0_0_10px_2px] shadow-brand-gold/70" />
              </div>

              {/* Segmented circular gradient progress ring */}
              <svg
                width="170"
                height="170"
                viewBox="0 0 170 170"
                className="absolute -rotate-90"
                aria-hidden
              >
                <defs>
                  <linearGradient id="preloader-grad" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="var(--brand-cyan)" />
                    <stop offset="55%" stopColor="var(--brand-sky)" />
                    <stop offset="100%" stopColor="var(--brand-gold)" />
                  </linearGradient>
                </defs>
                <circle
                  cx="85"
                  cy="85"
                  r="75"
                  fill="none"
                  stroke="var(--foreground)"
                  strokeOpacity="0.08"
                  strokeWidth="3"
                />
                <motion.circle
                  cx="85"
                  cy="85"
                  r="75"
                  fill="none"
                  stroke="url(#preloader-grad)"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray="471"
                  initial={{ strokeDashoffset: 471 }}
                  animate={{
                    strokeDashoffset: 471 - (471 * (reduced ? 100 : progress)) / 100,
                  }}
                  transition={{ ease: 'linear' }}
                />
              </svg>

              {/* Logo materializes + glitch scanline sweep */}
              <motion.div
                className="relative flex items-center justify-center"
                initial={{ opacity: 0, scale: 0.85, filter: 'blur(14px)' }}
                animate={{
                  opacity: 1,
                  scale: 1,
                  filter: 'blur(0px)',
                }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
              >
                <Image
                  src="/brand/logo-white.png"
                  alt="Intellectual Creativity"
                  width={300}
                  height={140}
                  priority
                  className="logo-adaptive h-auto w-[220px] sm:w-[300px]"
                />
                {/* Glitch scanline sweep */}
                {!reduced && (
                  <div
                    className="pointer-events-none absolute inset-0 overflow-hidden mix-blend-overlay"
                    style={{ borderRadius: '0.5rem' }}
                    aria-hidden
                  >
                    <div className="absolute inset-x-0 h-1/3 bg-[linear-gradient(to_bottom,transparent,color-mix(in_oklch,var(--brand-cyan)_70%,transparent),transparent)] animate-scan" />
                  </div>
                )}
              </motion.div>
            </div>
          </div>

          {/* Bottom: shimmer caption + boot lines + progress bar */}
          <div
            className="absolute inset-x-0 bottom-0 flex flex-col items-center gap-5 px-6 pb-8"
            style={{ zIndex: 6 }}
          >
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="text-center"
            >
              <p className="shimmer-text font-display text-sm font-medium tracking-[0.16em] sm:text-base">
                Creativity for Information Technology
              </p>
            </motion.div>

            {/* Terminal boot sequence */}
            <div className="w-full max-w-md font-mono text-[11px] sm:text-xs">
              <div className="liquid-glass px-4 py-3">
                <div className="mb-2 flex items-center gap-2 border-b border-foreground/10 pb-2">
                  <span className="h-2.5 w-2.5 rounded-full bg-[color-mix(in_oklch,var(--destructive)_80%,transparent)]" />
                  <span className="h-2.5 w-2.5 rounded-full bg-amber-500/70" />
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/70" />
                  <span className="ml-2 text-foreground/40">intellectual@noc:~</span>
                </div>
                <ul className="space-y-1 text-foreground/75">
                  {BOOT_LINES.map((line, i) => (
                    <li
                      key={i}
                      className={`flex items-center transition-opacity ${
                        bootIdx >= i ? 'opacity-100' : 'opacity-0'
                      }`}
                    >
                      <span className="text-accent-cyan">{line.split(' ')[0]}</span>
                      <span className="ml-2">{line.slice(line.indexOf(' ') + 1)}</span>
                      {bootIdx === i && (
                        <span
                          className="ml-1 inline-block h-3 w-1.5 animate-boot-blink bg-brand-cyan align-middle"
                          aria-hidden
                        />
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Linear gradient progress bar + live % counter */}
            <div className="w-full max-w-md">
              <div className="mb-1.5 flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.18em] text-foreground/55">
                <span>Initializing systems</span>
                <span>{reduced ? 100 : progress}%</span>
              </div>
              <div className="h-1 w-full overflow-hidden rounded-full bg-foreground/10">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,var(--brand-cyan),var(--brand-sky)_55%,var(--brand-gold))]"
                  initial={{ width: '0%' }}
                  animate={{ width: `${reduced ? 100 : progress}%` }}
                  transition={{ ease: 'linear' }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
