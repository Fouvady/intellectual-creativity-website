'use client'

import * as React from 'react'

/** SSR-safe mounted flag (avoids hydration mismatches for client-only UI). */
export function useMounted() {
  const [mounted, setMounted] = React.useState(false)
  React.useEffect(() => {
    setMounted(true)
  }, [])
  return mounted
}

/** Live-subscribes to the prefers-reduced-motion media query. */
export function useReducedMotionPref() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mql.matches)
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mql.addEventListener?.('change', handler)
    return () => mql.removeEventListener?.('change', handler)
  }, [])
  return reduced
}
