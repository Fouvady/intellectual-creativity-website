'use client'

import * as React from 'react'
import { useInView } from 'framer-motion'

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts up from 0 to `end` once the ref scrolls into view.
 * Supports optional `prefix` and `suffix` (e.g. `120+` => suffix `+`).
 */
export function useCountUp({
  end,
  duration = 1.6,
  prefix = '',
  suffix = '',
  decimals = 0,
  start = 0,
}: {
  end: number
  duration?: number
  prefix?: string
  suffix?: string
  decimals?: number
  start?: number
}) {
  const ref = React.useRef<HTMLSpanElement | null>(null)
  const inView = useInView(ref, { once: true, amount: 0.4 })
  const [display, setDisplay] = React.useState(0)

  React.useEffect(() => {
    if (!inView) return
    const reduce =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduce) {
      setDisplay(end)
      return
    }

    let raf = 0
    let cancelled = false
    const t0 = performance.now()
    const tick = (now: number) => {
      if (cancelled) return
      const p = Math.min(1, (now - t0) / (duration * 1000))
      const eased = easeOutCubic(p)
      setDisplay(start + (end - start) * eased)
      if (p < 1) raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelled = true
      cancelAnimationFrame(raf)
    }
  }, [inView, end, duration, start])

  const formatted = display.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return {
    ref,
    value: `${prefix}${formatted}${suffix}`,
  }
}
