'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  src: string
  title: string
  className?: string
  placeholder?: React.ReactNode
  rootMargin?: string
}

/**
 * LazyMap — defers mounting a heavy iframe (e.g. Google Maps embed) until
 * the container scrolls near the viewport via IntersectionObserver.
 * Reduces initial load and avoids jank.
 */
export function LazyMap({
  src,
  title,
  className,
  placeholder,
  rootMargin = '300px 0px',
}: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null)
  const [load, setLoad] = React.useState(false)

  React.useEffect(() => {
    const el = ref.current
    if (!el) return
    if (typeof IntersectionObserver === 'undefined') {
      setLoad(true)
      return
    }
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setLoad(true)
            obs.disconnect()
            break
          }
        }
      },
      { rootMargin },
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [rootMargin])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      {load ? (
        <iframe
          src={src}
          title={title}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full border-0"
          allowFullScreen
        />
      ) : (
        <div className="absolute inset-0 grid place-items-center">
          {placeholder ?? (
            <div className="h-full w-full dot-grid opacity-30" aria-hidden />
          )}
        </div>
      )}
    </div>
  )
}
