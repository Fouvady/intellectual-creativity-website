'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * CustomCursor — an attractive two-layer cursor follower:
 *   - a small glowing dot that tracks the pointer instantly
 *   - a larger gradient ring that follows with spring physics (lag)
 *
 * On hover over interactive elements (a, button, [data-cursor], inputs),
 * the ring scales up and the dot dims — a premium "magnetic" feel.
 *
 * Disabled on touch devices (no pointer) and when prefers-reduced-motion.
 * The native cursor is hidden only when the custom cursor is active.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false)
  const [hovering, setHovering] = React.useState(false)
  const [down, setDown] = React.useState(false)

  // Raw pointer position (instant).
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  // Spring-smoothed for the lagging ring.
  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 })

  React.useEffect(() => {
    // Only enable on devices with a fine pointer (desktops with a mouse).
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return
    setEnabled(true)

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      // Hover state: is the element under the cursor interactive?
      const t = e.target as HTMLElement | null
      if (!t) return
      const interactive = !!t.closest(
        'a, button, input, textarea, select, label, [role="button"], [data-cursor], [tabindex]',
      )
      setHovering(interactive)
    }
    const onDown = () => setDown(true)
    const onUp = () => setDown(false)
    window.addEventListener('pointermove', move, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    return () => {
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [x, y])

  if (!enabled) return null

  return (
    <>
      {/* Hide the native cursor only while the custom one is active. */}
      <style>{`*{cursor:none !important}`}</style>

      {/* Outer gradient ring — lags behind with spring physics. */}
      <motion.div
        aria-hidden
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: hovering ? 56 : 34,
          height: hovering ? 56 : 34,
          opacity: down ? 0.5 : 0.9,
          borderColor: hovering
            ? 'color-mix(in oklch, var(--brand-cyan) 80%, transparent)'
            : 'color-mix(in oklch, var(--brand-cyan) 50%, transparent)',
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[300] rounded-full border mix-blend-screen"
      />

      {/* Inner glow dot — tracks instantly. */}
      <motion.div
        aria-hidden
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: down ? 6 : hovering ? 8 : 6,
          height: down ? 6 : hovering ? 8 : 6,
          opacity: hovering ? 0.5 : 1,
          backgroundColor: hovering
            ? 'color-mix(in oklch, var(--brand-sky) 90%, transparent)'
            : 'color-mix(in oklch, var(--brand-cyan) 90%, transparent)',
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[300] rounded-full mix-blend-screen"
        // Soft glow via box-shadow
        // (set via style for the color-mix)
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full"
          style={{
            boxShadow:
              '0 0 12px 2px color-mix(in oklch, var(--brand-cyan) 60%, transparent)',
          }}
        />
      </motion.div>
    </>
  )
}
