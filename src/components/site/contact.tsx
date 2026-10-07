'use client'

import * as React from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { toast } from 'sonner'
import { Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import { AnimatedText } from '@/components/motion/animated-text'
import { SectionReveal } from '@/components/motion/stagger-group'
import { MagneticButton } from '@/components/motion/magnetic-button'
import { LazyMap } from '@/components/motion/lazy-map'
import { cn } from '@/lib/utils'

const CONTACTS = [
  { icon: Phone, label: 'Phone', value: '+966537727004', href: 'tel:+966537727004' },
  { icon: Mail, label: 'Email', value: 'info@intellectualcf.com', href: 'mailto:info@intellectualcf.com' },
  { icon: MapPin, label: 'Location', value: 'Riyadh, Saudi Arabia', href: '#' },
]

const SOCIALS = [
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/966537727004' },
]

// Company destination constants — the form opens WhatsApp / email client
// addressed to the company, with the user's form data pre-filled.
const COMPANY_WHATSAPP = '966537727004'
const COMPANY_EMAIL = 'info@intellectualcf.com'

const schema = z.object({
  firstName: z.string().min(1, 'First name is required'),
  lastName: z.string().min(1, 'Last name is required'),
  phone: z.string().optional(),
  email: z.string().email('Enter a valid email address'),
  message: z.string().min(10, 'Message must be at least 10 characters'),
})

type FormData = z.infer<typeof schema>

/** Build a wa.me URL addressed to the company WhatsApp, with the user's form
 *  data (name + message + contact details) pre-filled as the message body. */
function buildWhatsAppUrl(d: FormData): string {
  const body = [
    `Hello, I'm ${d.firstName} ${d.lastName}.`,
    '',
    d.message,
    '',
    '— My contact details —',
    `Phone: ${d.phone || 'Not provided'}`,
    `Email: ${d.email}`,
  ].join('\n')
  return `https://wa.me/${COMPANY_WHATSAPP}?text=${encodeURIComponent(body)}`
}

/** Build a mailto: URL addressed to the company email, with subject + body
 *  pre-filled from the user's form data. */
function buildMailtoUrl(d: FormData): string {
  const subject = `Project enquiry from ${d.firstName} ${d.lastName}`
  const body = [
    `Name: ${d.firstName} ${d.lastName}`,
    `Phone: ${d.phone || 'Not provided'}`,
    `Email: ${d.email}`,
    '',
    'Message:',
    d.message,
  ].join('\n')
  return `mailto:${COMPANY_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

function Field({
  id,
  label,
  type = 'text',
  error,
  required,
  register,
  textarea,
  placeholder,
}: {
  id: string
  label: string
  type?: string
  error?: string
  required?: boolean
  register: ReturnType<ReturnType<typeof useForm<FormData>>['register']>
  textarea?: boolean
  placeholder?: string
}) {
  const [focused, setFocused] = React.useState(false)
  const common = {
    id,
    ...register(id as keyof FormData),
    placeholder,
    required,
    onFocus: () => setFocused(true),
    onBlur: () => setFocused(false),
    className: cn(
      'peer w-full rounded-lg border border-foreground/15 bg-foreground/4 px-4 pb-2 pt-5 text-sm text-foreground transition-colors',
      'placeholder:text-foreground/40 focus:border-brand-cyan focus:outline-none',
      error && 'border-destructive/60 focus:border-destructive',
    ),
  }
  return (
    <div className="relative">
      {textarea ? (
        <textarea {...common} rows={5} aria-invalid={!!error} />
      ) : (
        <input {...common} type={type} aria-invalid={!!error} />
      )}
      <label
        htmlFor={id}
        className={cn(
          'pointer-events-none absolute left-4 top-2 text-xs font-medium text-foreground/55 transition-all',
          focused && 'text-accent-cyan',
        )}
      >
        {label}
        {required && <span className="ml-0.5 text-destructive">*</span>}
      </label>
      {/* Animated underline */}
      <span
        aria-hidden
        className={cn(
          'absolute inset-x-3 -bottom-px h-px origin-left scale-x-0 gradient-brand transition-transform duration-300 peer-focus:scale-x-100',
        )}
      />
      {error && (
        <p role="alert" className="mt-1.5 text-xs font-medium text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}

export function Contact() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      firstName: '',
      lastName: '',
      phone: '',
      email: '',
      message: '',
    },
  })

  /** Validate the form, then open WhatsApp with the pre-filled message. */
  function sendWhatsApp(data: FormData) {
    window.open(buildWhatsAppUrl(data), '_blank', 'noopener,noreferrer')
    toast.success('Opening WhatsApp', {
      description: 'Your message is pre-filled — just hit send in WhatsApp.',
    })
    reset()
  }

  /** Validate the form, then open the user's email client with the pre-filled email. */
  function sendEmail(data: FormData) {
    window.location.href = buildMailtoUrl(data)
    toast.success('Opening your email client', {
      description: 'Your message is pre-filled — just hit send in your email app.',
    })
    reset()
  }

  return (
    <section
      id="contact"
      aria-label="Contact"
      className="cv-auto relative scroll-mt-20 py-20 sm:py-24"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <SectionReveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-foreground/15 bg-foreground/5 px-3 py-1 text-xs font-medium uppercase tracking-[0.18em] text-foreground/70 font-display">
              <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan animate-status" aria-hidden />
              Get in touch
            </span>
          </SectionReveal>
          <AnimatedText
            as="h2"
            text="Let's build something reliable"
            highlightRange={[2, 3]}
            className="text-balance font-display text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl"
          />
          <SectionReveal delay={0.08}>
            <p className="mx-auto max-w-2xl text-balance text-base text-muted-foreground sm:text-lg">
              Fill in your details and pick WhatsApp or email — we&apos;ll
              reply from our Riyadh office.
            </p>
          </SectionReveal>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 md:items-stretch">
          {/* Left: info + map */}
          <SectionReveal className="flex flex-col gap-5">
            <div className="card-airy p-6">
              <ul className="flex flex-col gap-4">
                {CONTACTS.map((c) => (
                  <li key={c.label}>
                    <a
                      href={c.href}
                      className="group flex items-center gap-3"
                    >
                      <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-brand-cyan/30 to-brand-cyan/5 text-accent-cyan shadow-lg shadow-brand-cyan/20 transition-transform group-hover:scale-105">
                        <c.icon className="h-5 w-5" aria-hidden />
                      </span>
                      <span className="flex flex-col">
                        <span className="text-xs uppercase tracking-[0.16em] text-foreground/55">
                          {c.label}
                        </span>
                        <span className="font-display text-sm font-semibold text-foreground">
                          {c.value}
                        </span>
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
              <div className="mt-6 flex items-center gap-3 border-t border-foreground/10 pt-5">
                <span className="text-xs uppercase tracking-[0.16em] text-foreground/55">
                  Follow
                </span>
                {SOCIALS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-foreground/15 bg-foreground/5 text-foreground/75 transition-all hover:scale-110 hover:text-foreground"
                  >
                    <s.icon className="h-4 w-4" aria-hidden />
                  </a>
                ))}
              </div>
            </div>
            <div className="card-airy relative min-h-[280px] flex-1 overflow-hidden p-2">
              <LazyMap
                src="https://maps.google.com/maps?q=Riyadh&output=embed"
                title="Intellectual Creativity — Riyadh, Saudi Arabia"
                className="h-full min-h-[260px] w-full rounded-lg"
                placeholder={
                  <div className="flex h-full w-full items-center justify-center text-sm text-foreground/45">
                    Loading Riyadh map…
                  </div>
                }
              />
            </div>
          </SectionReveal>

          {/* Right: form */}
          <SectionReveal delay={0.08}>
            <form
              onSubmit={(e) => e.preventDefault()}
              noValidate
              className="card-airy liquid-border h-full p-6 sm:p-8"
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field
                  id="firstName"
                  label="First Name"
                  required
                  register={register}
                  error={errors.firstName?.message}
                  placeholder="Mir"
                />
                <Field
                  id="lastName"
                  label="Last Name"
                  required
                  register={register}
                  error={errors.lastName?.message}
                  placeholder="Wahed Ali"
                />
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <Field
                  id="phone"
                  label="Phone (optional)"
                  type="tel"
                  register={register}
                  error={errors.phone?.message}
                  placeholder="+966 …"
                />
                <Field
                  id="email"
                  label="Email"
                  type="email"
                  required
                  register={register}
                  error={errors.email?.message}
                  placeholder="you@example.com"
                />
              </div>
              <div className="mt-4">
                <Field
                  id="message"
                  label="Message"
                  required
                  register={register}
                  error={errors.message?.message}
                  textarea
                  placeholder="Tell us about your project…"
                />
              </div>

              <div className="mt-6 flex flex-col gap-3">
                <p className="text-xs text-foreground/50">
                  Pick how you&apos;d like to send — we never store your details.
                </p>
                <div className="flex flex-wrap items-center gap-3">
                  <MagneticButton strength={5}>
                    <button
                      type="button"
                      onClick={() => handleSubmit(sendWhatsApp)()}
                      className="inline-flex items-center gap-2 rounded-full gradient-brand px-6 py-3 text-sm font-semibold text-[oklch(0.16_0.025_250)] shadow-lg shadow-brand-cyan/30 transition-all hover:shadow-brand-cyan/50"
                    >
                      <MessageCircle className="h-4 w-4" aria-hidden />
                      Send via WhatsApp
                    </button>
                  </MagneticButton>
                  <MagneticButton strength={5}>
                    <button
                      type="button"
                      onClick={() => handleSubmit(sendEmail)()}
                      className="inline-flex items-center gap-2 rounded-full border border-foreground/20 bg-foreground/5 px-6 py-3 text-sm font-semibold text-foreground transition-colors hover:bg-foreground/10"
                    >
                      <Mail className="h-4 w-4" aria-hidden />
                      Send via Email
                    </button>
                  </MagneticButton>
                </div>
              </div>
            </form>
          </SectionReveal>
        </div>
      </div>
    </section>
  )
}
