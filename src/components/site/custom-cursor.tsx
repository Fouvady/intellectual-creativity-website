'use client'

import * as React from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

/**
 * CustomCursor — an attractive two-layer cursor follower:
 *   - a small glowing dot that tracks the pointer instantly
 *   - a larger ring that follows with spring physics (lag)
 *
 * Theme-aware: bright cyan on dark backgrounds, deep navy on light
 * backgrounds — high contrast and visible in BOTH themes.
 * NO mix-blend-screen (which made the cursor invisible on light backgrounds).
 *
 * Disabled on touch devices (no fine pointer) and when prefers-reduced-motion.
 */
export function CustomCursor() {
  const [enabled, setEnabled] = React.useState(false)
  const [hovering, setHovering] = React.useState(false)
  const [down, setDown] = React.useState(false)
  const [isDark, setIsDark] = React.useState(true)

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)

  const ringX = useSpring(x, { stiffness: 350, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 350, damping: 28, mass: 0.6 })

  React.useEffect(() => {
    const finePointer = window.matchMedia('(pointer: fine)').matches
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (!finePointer || reduced) return
    setEnabled(true)
    document.documentElement.classList.add('has-custom-cursor')

    // Track the active theme so the cursor color stays high-contrast.
    const syncTheme = () => setIsDark(document.documentElement.classList.contains('dark'))
    syncTheme()
    const mo = new MutationObserver(syncTheme)
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

    const move = (e: PointerEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
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
      mo.disconnect()
      window.removeEventListener('pointermove', move)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
    }
  }, [x, y])

  if (!enabled) return null

  // Theme-aware colors — NO mix-blend-screen.
  // Dark mode: bright cyan. Light mode: deep navy. Both high-contrast.
  const dotColor = isDark ? 'oklch(0.82 0.13 195)' : 'oklch(0.40 0.13 250)'
  const dotHoverColor = isDark ? 'oklch(0.72 0.14 240)' : 'oklch(0.45 0.15 240)'
  const ringColor = isDark ? 'oklch(0.82 0.13 195 / 0.85)' : 'oklch(0.40 0.13 250 / 0.7)'
  const ringHoverColor = isDark ? 'oklch(0.82 0.13 195)' : 'oklch(0.40 0.13 250)'
  const glowColor = isDark ? 'oklch(0.82 0.13 195 / 0.6)' : 'oklch(0.40 0.13 250 / 0.4)'

  return (
    <>
      {/* Hide the native cursor only while the custom one is active.
          Use a class on <html> so it can be overridden if needed. */}
      <style>{`html.has-custom-cursor, html.has-custom-cursor *{cursor:none !important}`}</style>

      {/* Outer ring — spring physics, NO mix-blend. */}
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
          opacity: down ? 0.55 : 0.95,
          borderColor: hovering ? ringHoverColor : ringColor,
        }}
        transition={{ type: 'spring', stiffness: 280, damping: 22 }}
        className="pointer-events-none fixed left-0 top-0 z-[300] rounded-full border-2"
      />

      {/* Inner dot — tracks instantly, NO mix-blend. */}
      <motion.div
        aria-hidden
        style={{
          x,
          y,
          translateX: '-50%',
          translateY: '-50%',
          boxShadow: `0 0 12px 2px ${glowColor}`,
        }}
        animate={{
          width: down ? 6 : hovering ? 8 : 6,
          height: down ? 6 : hovering ? 8 : 6,
          opacity: hovering ? 0.6 : 1,
          backgroundColor: hovering ? dotHoverColor : dotColor,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="pointer-events-none fixed left-0 top-0 z-[300] rounded-full"
      />
    </>
  )
}
