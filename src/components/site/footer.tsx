'use client'

import * as React from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Facebook, Twitter, Instagram, ArrowUp } from 'lucide-react'
import { SectionReveal } from '@/components/motion/stagger-group'

const QUICK_LINKS = [
  { label: 'Home', href: '#top' },
  { label: 'Services', href: '#services' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
]
const SERVICES = [
  'Telephone IP / PABX',
  'Audio-Video & PA',
  'Structured Cabling',
  'CCTV System',
  'Smart Electronics',
  'Building Automation',
]
const SOCIALS = [
  { icon: Facebook, label: 'Facebook', href: '#' },
  { icon: Twitter, label: 'Twitter', href: '#' },
  { icon: Instagram, label: 'Instagram', href: '#' },
]

export function Footer() {
  return (
    <footer className="mt-auto border-t border-foreground/10 bg-foreground/3">
      <SectionReveal className="mx-auto max-w-7xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
          {/* Brand */}
          <div className="flex flex-col gap-4">
            <Link href="#top" aria-label="Intellectual Creativity home">
              <Image
                src="/brand/logo-white.png"
                alt="Intellectual Creativity"
                width={220}
                height={52}
                loading="lazy"
                className="logo-adaptive h-9 w-auto"
              />
            </Link>
            <p className="max-w-sm text-sm leading-relaxed text-muted-foreground">
              Intellectual Creativity for Information Technology — a Dubai-based
              IT &amp; telecommunications partner delivering telephone systems,
              networking, security and smart-building solutions.
            </p>
            <div className="flex items-center gap-3">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/70 transition-all hover:scale-110 hover:text-foreground"
                >
                  <s.icon className="h-4 w-4" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
              Quick Links
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {QUICK_LINKS.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
              Services
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5">
              {SERVICES.map((s) => (
                <li key={s} className="text-sm text-muted-foreground">
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-display text-xs font-semibold uppercase tracking-[0.18em] text-foreground/55">
              Contact
            </h3>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-muted-foreground">
              <li>
                <a
                  href="tel:+9666666625"
                  className="transition-colors hover:text-foreground"
                >
                  +9666666625
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@intellectualcf.com"
                  className="transition-colors hover:text-foreground"
                >
                  info@intellectualcf.com
                </a>
              </li>
              <li>Dubai, UAE</li>
            </ul>
            <a
              href="#contact"
              className="mt-5 inline-flex items-center justify-center gap-2 rounded-full gradient-brand px-5 py-2.5 text-sm font-semibold text-[oklch(0.16_0.025_250)] shadow-lg shadow-brand-cyan/30"
            >
              Start a project
            </a>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-foreground/10 pt-6 sm:flex-row sm:items-center">
          <p className="text-xs leading-relaxed text-foreground/55">
            Copyright © 2026 – intellectualcf.com – All Rights Reserved | Designed
            by Mohammed Abdur Rahman
          </p>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3 text-xs text-foreground/55">
              <a href="#" className="transition-colors hover:text-foreground">Privacy</a>
              <a href="#" className="transition-colors hover:text-foreground">Terms</a>
              <a href="#" className="transition-colors hover:text-foreground">Security</a>
            </div>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-emerald-500">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-status" aria-hidden />
              Status: All systems operational
            </span>
            <a
              href="#top"
              aria-label="Back to top"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/70 transition-all hover:scale-110 hover:text-foreground"
            >
              <ArrowUp className="h-4 w-4" aria-hidden />
            </a>
          </div>
        </div>
      </SectionReveal>
    </footer>
  )
}
