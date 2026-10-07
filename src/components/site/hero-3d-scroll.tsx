'use client'

import React from 'react'
import { ContainerScroll } from '@/components/ui/container-scroll-animation'
import Image from 'next/image'
import { ShieldCheck, Activity, Cpu } from 'lucide-react'

export function Hero3DScroll() {
  return (
    <section
      aria-label="3D scroll showcase"
      className="cv-auto relative flex flex-col overflow-hidden"
    >
      <ContainerScroll
        titleComponent={
          <>
            <h2 className="font-display text-4xl font-semibold text-foreground sm:text-5xl">
              Unleash the power of{' '}
              <br />
              <span className="gradient-text text-4xl font-bold leading-none mt-1 md:text-[6rem]">
                intelligent IT
              </span>
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-muted-foreground sm:text-lg">
              From telephony and structured cabling to AI-assisted threat
              protection — engineered for Riyadh&rsquo;s most demanding
              environments.
            </p>
          </>
        }
      >
        <div className="card-airy relative h-full w-full overflow-hidden rounded-2xl bg-background">
          <div className="absolute inset-0 dot-grid opacity-20" aria-hidden />

          <div className="relative z-10 flex h-full flex-col items-center justify-center gap-6 px-6 text-center">
            <div className="flex flex-col items-center gap-3">
              <Image
                src="/brand/logo-white.png"
                alt="Intellectual Creativity — for Information Technology"
                width={500}
                height={233}
                quality={100}
                unoptimized
                priority
                className="logo-adaptive h-auto w-[min(70%,360px)]"
              />
              <span className="inline-flex items-center gap-1.5 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-accent-cyan">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" />
                Network Operations Center
              </span>
            </div>

            <p className="max-w-xl font-display text-xl font-medium text-foreground sm:text-2xl md:text-3xl">
              Engineering intelligent systems for ambitious companies across
              Saudi Arabia, Riyadh.
            </p>

            <div className="mt-2 flex flex-wrap items-center justify-center gap-3 text-xs text-foreground/70">
              <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5">
                <ShieldCheck className="h-3.5 w-3.5 text-accent-cyan" />
                AI-assisted threat protection
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5">
                <Activity className="h-3.5 w-3.5 text-accent-cyan" />
                99.9% uptime SLOs
              </span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1.5">
                <Cpu className="h-3.5 w-3.5 text-accent-cyan" />
                Cisco-grade infrastructure
              </span>
            </div>
          </div>
        </div>
      </ContainerScroll>
    </section>
  )
}
