'use client'

import * as React from 'react'
import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
  className?: string
}

/**
 * SpotlightCard — sets `--mx`/`--my` CSS vars from the pointer position
 * so the `.glass-spotlight::after` radial highlight follows the cursor.
 */
export function SpotlightCard({ children, className }: Props) {
  const ref = React.useRef<HTMLDivElement | null>(null)

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const mx = ((e.clientX - rect.left) / rect.width) * 100
    const my = ((e.clientY - rect.top) / rect.height) * 100
    el.style.setProperty('--mx', `${mx}%`)
    el.style.setProperty('--my', `${my}%`)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      className={cn('glass-spotlight', className)}
    >
      {children}
    </div>
  )
}
