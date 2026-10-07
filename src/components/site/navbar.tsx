'use client'

import * as React from 'react'
import Image from 'next/image'
import { Menu } from 'lucide-react'
import { motion, useScroll, useMotionValueEvent } from 'framer-motion'
import { cn } from '@/lib/utils'
import { useMounted } from '@/hooks/use-mounted'
import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetTrigger,
  SheetClose,
  SheetDescription,
} from '@/components/ui/sheet'
import { MagneticButton } from '@/components/motion/magnetic-button'
import { ThemeToggle } from '@/components/site/theme-toggle'

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Smoothly scroll to an in-page anchor with a fast, natural glide (~500ms,
 * ease-in-out) — not the jarring instant snap, and not the slow ~1s default.
 * Includes a subtle "whoosh" scale effect on the target section for a premium feel.
 */
function scrollToAnchor(href: string) {
  if (typeof document === 'undefined') return
  const id = href.replace('#', '')
  let target = 0
  if (id === 'top' || href === '#top') {
    target = 0
  } else {
    const el = id ? document.getElementById(id) : null
    if (!el) return
    target = Math.max(0, el.getBoundingClientRect().top + window.scrollY - 80)
  }

  const start = window.scrollY
  const distance = target - start
  if (Math.abs(distance) < 2) return

  const duration = 500
  const startTime = performance.now()
  const ease = (t: number) =>
    t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

  // Add a subtle highlight pulse to the target section
  const targetEl = id && id !== 'top' ? document.getElementById(id) : null
  if (targetEl) {
    targetEl.style.transition = 'box-shadow 0.6s ease'
    setTimeout(() => {
      targetEl.style.boxShadow = 'inset 0 0 0 2px color-mix(in oklch, var(--brand-cyan) 40%, transparent)'
      setTimeout(() => {
        targetEl.style.boxShadow = ''
      }, 600)
    }, 400)
  }

  const step = (now: number) => {
    const p = Math.min((now - startTime) / duration, 1)
    window.scrollTo(0, start + distance * ease(p))
    if (p < 1) requestAnimationFrame(step)
  }
  requestAnimationFrame(step)
}

export function Navbar() {
  const mounted = useMounted()
  const [scrolled, setScrolled] = React.useState(false)
  const [open, setOpen] = React.useState(false)
  const { scrollY } = useScroll()
  useMotionValueEvent(scrollY, 'change', (y) => {
    setScrolled(y > 24)
  })

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-[200] transition-all duration-300',
        scrolled ? 'nav-glass py-2 shadow-sm' : 'bg-transparent py-4',
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Primary"
      >
        {/* Logo */}
        <a
          href="#top"
          onClick={(e) => {
            e.preventDefault()
            scrollToAnchor('#top')
          }}
          className="flex items-center gap-2"
          aria-label="Intellectual Creativity home"
        >
          <Image
            src="/brand/logo-white.png"
            alt="Intellectual Creativity"
            width={420}
            height={196}
            unoptimized
            quality={100}
            className="logo-adaptive h-14 w-auto sm:h-16"
            priority
          />
        </a>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={(e) => {
                e.preventDefault()
                scrollToAnchor(l.href)
              }}
              className="group relative rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <span>{l.label}</span>
              <span
                aria-hidden
                className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 gradient-brand transition-transform duration-300 group-hover:scale-x-100"
              />
            </a>
          ))}
        </div>

        {/* CTA + ThemeToggle */}
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <a href="#contact" className="hidden sm:block" onClick={(e) => { e.preventDefault(); scrollToAnchor('#contact') }}>
            <MagneticButton>
              <span className="inline-flex items-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-[oklch(0.16_0.025_250)] shadow-lg shadow-brand-cyan/30 transition-shadow hover:shadow-brand-cyan/50">
                Get Started
              </span>
            </MagneticButton>
          </a>

          {/* Mobile menu — mount-gated to avoid a Radix `aria-controls` ID
              hydration mismatch (Radix generates the id on the client, so
              SSR + client differ). Before mount we render a static,
              non-interactive placeholder button with identical styling. */}
          {mounted ? (
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger
                asChild
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/80 md:hidden"
                aria-label="Open menu"
              >
                <button type="button">
                  <Menu className="h-5 w-5" aria-hidden />
                </button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-80 max-w-[80vw] border-l border-foreground/10 bg-background/95 backdrop-blur-xl"
              >
                <SheetTitle className="px-4 pt-4 font-display text-lg font-semibold">
                  <Image
                    src="/brand/logo-white.png"
                    alt="Intellectual Creativity"
                    width={300}
                    height={140}
                    unoptimized
                    className="logo-adaptive h-14 w-auto"
                  />
                </SheetTitle>
                <SheetDescription className="sr-only">
                  Site navigation menu
                </SheetDescription>
                <nav className="flex flex-col gap-1 px-4 py-4">
                  {NAV_LINKS.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      onClick={(e) => {
                        e.preventDefault()
                        setOpen(false)
                        requestAnimationFrame(() => scrollToAnchor(l.href))
                      }}
                      className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-foreground/5 hover:text-foreground"
                    >
                      {l.label}
                    </a>
                  ))}
                </nav>
                <div className="mt-auto px-4 pb-6">
                  <SheetClose asChild>
                    <a
                      href="#contact"
                      className="block w-full rounded-full gradient-brand px-5 py-3 text-center text-sm font-semibold text-[oklch(0.16_0.025_250)] shadow-lg shadow-brand-cyan/30"
                    >
                      Get Started
                    </a>
                  </SheetClose>
                </div>
              </SheetContent>
            </Sheet>
          ) : (
            /* Static placeholder rendered during SSR + before hydration so
               the layout/visual is identical, but no Radix id is generated
               server-side → no hydration mismatch. */
            <button
              type="button"
              aria-label="Open menu"
              tabIndex={-1}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/80 md:hidden"
            >
              <Menu className="h-5 w-5" aria-hidden />
            </button>
          )}
        </div>
      </nav>
    </header>
  )
}
