'use client'

import * as React from 'react'
import Link from 'next/link'
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

const NAV_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]

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
        'fixed inset-x-0 top-0 z-50 transition-all duration-300',
        scrolled ? 'nav-glass py-2 shadow-sm' : 'bg-transparent py-4',
      )}
    >
      <nav
        className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 sm:px-6"
        aria-label="Primary"
      >
        {/* Logo */}
        <Link
          href="#top"
          className="flex items-center gap-2"
          aria-label="Intellectual Creativity home"
        >
          <Image
            src="/brand/logo-white.png"
            alt="Intellectual Creativity"
            width={180}
            height={42}
            className="logo-adaptive h-7 w-auto sm:h-9"
            priority
          />
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="group relative rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:text-foreground"
            >
              <span>{l.label}</span>
              <span
                aria-hidden
                className="absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-brand transition-transform duration-300 group-hover:scale-x-100"
              />
            </Link>
          ))}
        </div>

        {/* CTA + ThemeToggle */}
        <div className="flex items-center gap-2">
          <a href="#contact" className="hidden sm:block">
            <MagneticButton>
              <span className="inline-flex items-center gap-2 rounded-full bg-gradient-brand px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-cyan/30 transition-shadow hover:shadow-brand-cyan/50">
                Get Started
              </span>
            </MagneticButton>
          </a>

          {/* Mobile menu */}
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
                  width={160}
                  height={38}
                  className="logo-adaptive h-8 w-auto"
                />
              </SheetTitle>
              <SheetDescription className="sr-only">
                Site navigation menu
              </SheetDescription>
              <nav className="flex flex-col gap-1 px-4 py-4">
                {NAV_LINKS.map((l) => (
                  <Link
                    key={l.href}
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-base font-medium text-foreground/85 transition-colors hover:bg-foreground/5 hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                ))}
              </nav>
              <div className="mt-auto px-4 pb-6">
                <SheetClose asChild>
                  <a
                    href="#contact"
                    className="block w-full rounded-full bg-gradient-brand px-5 py-3 text-center text-sm font-semibold text-primary-foreground shadow-lg shadow-brand-cyan/30"
                  >
                    Get Started
                  </a>
                </SheetClose>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </nav>
      {!mounted && null}
    </header>
  )
}
