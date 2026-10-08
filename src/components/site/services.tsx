'use client'

import * as React from 'react'
import {
  ArrowUpRight,
  Phone,
  AudioLines,
  Network,
  Cctv,
  HouseWifi,
  LifeBuoy,
  MonitorPlay,
  CreditCard,
  Layers,
  CalendarClock,
  BrainCircuit,
} from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal, StaggerGroup, StaggerItem } from '@/components/motion/stagger-group'
import { TiltCard } from '@/components/motion/tilt-card'
import { SpotlightCard } from '@/components/motion/spotlight-card'
import { cn } from '@/lib/utils'

type Service = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  shortLabel: string
  desc: string
  image: string
  accent: 'cyan' | 'sky' | 'gold'
}

const SERVICES: Service[] = [
  {
    icon: Phone,
    title: 'Telephone IP / Analog, Call Centers & PABX System',
    shortLabel: 'PABX & Call Centers',
    desc: 'Telephone system installation, supply and maintenance. Brands: Cisco, Nokia, Siemens-Unify, Lucent-Alcatel & Avaya.',
    image: '/services/pabx-1.png',
    accent: 'cyan',
  },
  {
    icon: AudioLines,
    title: 'AVC Audio-Video Communication & PA Public Address',
    shortLabel: 'AVC & PA Systems',
    desc: 'Audio & video systems, conference theaters, public address systems for commercial buildings, shopping malls, masjids and offices.',
    image: '/services/avc-1.png',
    accent: 'sky',
  },
  {
    icon: Network,
    title: 'Networking / Structured Cabling',
    shortLabel: 'Networking & Cabling',
    desc: 'Voice and data infrastructure to the highest standards — from a small office install to large-scale deployment.',
    image: '/services/network-1.png',
    accent: 'gold',
  },
  {
    icon: Cctv,
    title: 'CCTV System',
    shortLabel: 'CCTV & Surveillance',
    desc: 'Innovations using the latest technology — we design multifaceted systems to meet all your business needs.',
    image: '/services/cctv-1.png',
    accent: 'cyan',
  },
  {
    icon: HouseWifi,
    title: 'Smart Electronic System',
    shortLabel: 'Smart Electronics',
    desc: 'Luxury villa intercom and multi-apartment solutions, IP and analog, with mobile app support.',
    image: '/services/smart-1.png',
    accent: 'sky',
  },
  {
    icon: LifeBuoy,
    title: 'Help & Support / Building Automation',
    shortLabel: 'Building Automation',
    desc: 'Lighting, A/C, curtain, music and pump control — integrated building automation.',
    image: '/services/automation-1.png',
    accent: 'gold',
  },
  {
    icon: MonitorPlay,
    title: 'Digital Signage & Video Walls',
    shortLabel: 'Digital Signage',
    desc: 'Large-format LED/LCD displays, video walls and content-distribution systems for retail malls, control rooms, lobbies and outdoor installations.',
    image: '/services/signage-1.png',
    accent: 'cyan',
  },
  {
    icon: CreditCard,
    title: 'Point of Sale (POS) Solutions',
    shortLabel: 'POS Solutions',
    desc: 'Touchscreen POS terminals, integrated card readers, receipt printers and self-service kiosks for retail, F&B and hospitality.',
    image: '/services/pos-1.png',
    accent: 'sky',
  },
  {
    icon: Layers,
    title: 'Unified Low Current (ELV) Systems',
    shortLabel: 'ELV Systems',
    desc: 'One umbrella contract covering all extra-low-voltage subsystems — cabling, CCTV, access control, PA, fire alarm and building automation.',
    image: '/services/elv-1.png',
    accent: 'gold',
  },
  {
    icon: CalendarClock,
    title: 'Time & Attendance Management',
    shortLabel: 'Time & Attendance',
    desc: 'Biometric and RFID time-clock terminals with workforce-management software: schedules, late/absent tracking, overtime and exportable payroll reports.',
    image: '/services/time-1.png',
    accent: 'cyan',
  },
  {
    icon: BrainCircuit,
    title: 'Smart AI Analytics & Standalone VoIP',
    shortLabel: 'AI Analytics & VoIP',
    desc: 'AI video analytics (object detection, face recognition, heatmaps, people counting) and standalone VoIP softphone/PBX solutions — branded and separated as dedicated offerings.',
    image: '/services/aivoip-1.png',
    accent: 'sky',
  },
]

const ACCENT = {
  cyan: {
    chip: 'from-brand-cyan/30 to-brand-cyan/5 text-accent-cyan',
    icon: 'text-accent-cyan',
    glow: 'shadow-brand-cyan/30',
    ring: 'ring-brand-cyan/40',
  },
  sky: {
    chip: 'from-brand-sky/30 to-brand-sky/5 text-accent-sky',
    icon: 'text-accent-sky',
    glow: 'shadow-brand-sky/30',
    ring: 'ring-brand-sky/40',
  },
  gold: {
    chip: 'from-brand-gold/30 to-brand-gold/5 text-accent-gold',
    icon: 'text-accent-gold',
    glow: 'shadow-brand-gold/30',
    ring: 'ring-brand-gold/40',
  },
} as const

export function Services() {
  return (
    <section
      id="services"
      aria-label="Services"
      className="cv-auto relative scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              What we do
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="We provide a wide range of services"
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
          <SectionReveal delay={0.1}>
            <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              From telephony, security and smart automation to digital signage,
              POS, ELV and AI analytics — engineered to the highest standards
              across Riyadh.
            </p>
          </SectionReveal>
        </div>

        <StaggerGroup className="mt-8 grid gap-5 sm:mt-12 sm:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => {
            const a = ACCENT[s.accent]
            return (
              <StaggerItem key={s.title}>
                <TiltCard max={5} className="h-full">
                  <SpotlightCard className="card-airy group h-full overflow-hidden">
                    {/* Top: hero photo (WhatsApp-style) */}
                    <div className="relative aspect-[4/3] w-full overflow-hidden">
                      <img
                        src={s.image}
                        alt={s.title}
                        loading="lazy"
                        decoding="async"
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                      />
                      {/* Subtle gradient veil to blend into the card */}
                      <div
                        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/85 via-background/10 to-transparent"
                        aria-hidden
                      />
                      {/* Numbered chip on photo */}
                      <span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full border border-foreground/15 bg-background/60 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-foreground/85 backdrop-blur-md font-display">
                        0{i + 1}
                      </span>
                    </div>

                    {/* Bottom: dark navy banner with icon + label (WhatsApp reference) */}
                    <div className="relative z-[2] flex h-full flex-col gap-3 p-5">
                      <div className="flex items-center gap-3">
                        <div
                          className={cn(
                            'inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br shadow-lg ring-1',
                            a.chip,
                            a.glow,
                            a.ring,
                          )}
                        >
                          <s.icon className={cn('h-5 w-5', a.icon)} aria-hidden />
                        </div>
                        <div className="min-w-0">
                          <p className="font-display text-[11px] uppercase tracking-[0.18em] text-foreground/55">
                            {s.shortLabel}
                          </p>
                          <h3 className="font-display text-base font-semibold leading-tight">
                            {s.title}
                          </h3>
                        </div>
                        <ArrowUpRight
                          className="ml-auto h-4 w-4 shrink-0 text-foreground/40 transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground/80"
                          aria-hidden
                        />
                      </div>
                      <p className="text-[13px] leading-relaxed text-muted-foreground">
                        {s.desc}
                      </p>
                    </div>
                  </SpotlightCard>
                </TiltCard>
              </StaggerItem>
            )
          })}
        </StaggerGroup>
      </div>
    </section>
  )
}
