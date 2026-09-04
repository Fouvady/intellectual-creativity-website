import * as React from 'react'
import { cn } from '@/lib/utils'

/**
 * LogoSvg — the Intellectual Creativity logo as a crisp SVG vector.
 *
 * Design: a stylized human head in profile (facing right) with a central
 * vertical spine + 4 horizontal circuit traces extending to the left, each
 * ending in a filled node. Beside it: "INTELLECTUAL CREATIVITY" (bold) and
 * "FOR INFORMATION TECHNOLOGY" (smaller, wider tracking).
 *
 * Uses `currentColor` so it inherits the parent's text color — white on dark
 * backgrounds, dark on light backgrounds. No invert filter (which was
 * softening the raster PNG's edges). Renders razor-sharp at any size.
 */
export function LogoSvg({
  className,
  compact = false,
}: {
  className?: string
  /**
   * compact: render only the icon + "INTELLECTUAL" (single word) — for tight
   * spaces like the navbar where the full wordmark would be too small to read.
   */
  compact?: boolean
}) {
  return (
    <svg
      viewBox={compact ? '0 0 240 196' : '0 0 460 196'}
      className={cn('h-auto w-auto', className)}
      role="img"
      aria-label="Intellectual Creativity — for Information Technology"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      >
        {/* Head silhouette */}
        <path d="M70 16 C 40 18, 22 42, 22 74 C 22 104, 36 122, 52 134 L 56 162 L 78 162 L 80 136 L 100 134 C 112 132, 118 122, 118 108 L 118 96 L 132 92 L 132 78 L 118 74 L 118 56 L 104 52 L 96 38 L 96 22 C 96 18, 90 16, 84 16 Z" />
        {/* Central vertical spine */}
        <path d="M84 30 L 84 150" />
        {/* 4 horizontal circuit traces extending left */}
        <path d="M84 50 L 44 50" />
        <path d="M84 78 L 52 78" />
        <path d="M84 106 L 48 106" />
        <path d="M84 132 L 56 132" />
        {/* Filled nodes at trace ends */}
        <circle cx="44" cy="50" r="3.4" fill="currentColor" stroke="none" />
        <circle cx="52" cy="78" r="3.4" fill="currentColor" stroke="none" />
        <circle cx="48" cy="106" r="3.4" fill="currentColor" stroke="none" />
        <circle cx="56" cy="132" r="3.4" fill="currentColor" stroke="none" />
      </g>
      {/* Wordmark */}
      <g fill="currentColor" fontFamily="'Geist', 'Space Grotesk', system-ui, sans-serif">
        {compact ? (
          // Compact: icon + "INTELLECTUAL" on one line, vertically centered.
          <text
            x="150"
            y="112"
            fontSize="34"
            fontWeight="700"
            letterSpacing="1.2"
          >
            INTELLECTUAL
          </text>
        ) : (
          <>
            <text x="148" y="96" fontSize="34" fontWeight="700" letterSpacing="1.2">
              INTELLECTUAL CREATIVITY
            </text>
            <text x="150" y="124" fontSize="13" fontWeight="500" letterSpacing="4.6">
              FOR INFORMATION TECHNOLOGY
            </text>
          </>
        )}
      </g>
    </svg>
  )
}
