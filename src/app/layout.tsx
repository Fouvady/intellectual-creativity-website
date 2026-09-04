import type { Metadata } from 'next'
import { Geist, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster as RadixToaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/site/theme-provider'
import { CustomCursor } from '@/components/site/custom-cursor'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
  preload: false,
})

export const metadata: Metadata = {
  title: 'Intellectual — Creativity for Information Technology',
  description:
    'Intellectual Creativity for Information Technology — a Dubai-based IT & telecommunications company delivering telephone systems, structured cabling, CCTV, smart electronics and building automation across the UAE.',
  keywords: [
    'Intellectual Creativity',
    'Intellectual CF',
    'IT company Dubai',
    'telecommunications UAE',
    'PABX systems',
    'Cisco partners Dubai',
    'CCTV installation Dubai',
    'structured cabling',
    'smart building automation',
    'AVC audio video communication',
  ],
  authors: [{ name: 'Intellectual Creativity for Information Technology' }],
  creator: 'Intellectual Creativity for Information Technology',
  publisher: 'Intellectual Creativity for Information Technology',
  icons: {
    icon: '/brand/favicon.png',
    shortcut: '/brand/favicon.png',
    apple: '/brand/favicon.png',
  },
  openGraph: {
    title: 'Intellectual — Creativity for Information Technology',
    description:
      'Dubai-based IT & telecommunications partner. Telephone systems, networking, CCTV, smart electronics and building automation.',
    siteName: 'Intellectual Creativity for Information Technology',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Intellectual — Creativity for Information Technology',
    description:
      'Dubai-based IT & telecommunications partner. Telephone systems, networking, CCTV, smart electronics and building automation.',
  },
  robots: { index: true, follow: true },
}

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://maps.google.com" />
        <link rel="dns-prefetch" href="https://cdn.21st.dev" />
      </head>
      <body
        className={`${geistSans.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
        style={{ backgroundColor: '#0a0f1a' }}
      >
        {/* === Self-contained preloader (raw HTML + CSS + JS) ===
            The ENTIRE loading screen is driven by raw HTML/CSS/JS — NO React
            component, NO hydration race. It paints on the very first byte
            (inline styles, no CSS dependency), shows the logo + a progress
            bar, and fades out after ~2.4s. */}
        <div
          aria-hidden="true"
          suppressHydrationWarning
          dangerouslySetInnerHTML={{
            __html: `
              <div id="initial-preloader" style="position:fixed;inset:0;z-index:9999;display:flex;flex-direction:column;align-items:center;justify-content:center;background:#0a0f1a;transition:opacity 0.6s ease;">
                <div style="padding:0 1.5rem;text-align:center;">
                  <img src="/brand/logo-white.png" alt="Intellectual Creativity" width="300" height="140" style="width:min(60vw,280px);height:auto;margin:0 auto;" />
                  <p style="margin-top:1.25rem;font-size:11px;font-weight:500;text-transform:uppercase;letter-spacing:0.32em;color:#94a3b8;font-family:system-ui,sans-serif;">Creativity for Information Technology</p>
                  <div style="margin-top:1.75rem;height:3px;width:192px;border-radius:999px;background:rgba(148,163,184,0.15);overflow:hidden;">
                    <div id="icf-pl-bar" style="height:100%;width:100%;transform:scaleX(0);transform-origin:0% 50%;background:linear-gradient(120deg,#22d3ee,#38bdf8);border-radius:999px;"></div>
                  </div>
                </div>
              </div>
              <style>@keyframes icfplfill{from{transform:scaleX(0)}to{transform:scaleX(1)}}#icf-pl-bar{animation:icfplfill 2s cubic-bezier(0.4,0,0.2,1) forwards}</style>
              <script>
                (function(){
                  var el = document.getElementById('initial-preloader');
                  var removed = false;
                  function remove(){
                    if(removed || !el) return; removed = true;
                    el.style.opacity = '0';
                    setTimeout(function(){ if(el && el.parentNode) el.parentNode.removeChild(el); }, 650);
                  }
                  setTimeout(remove, 2400);
                })();
              </script>
            `,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <CustomCursor />
          {children}
          <RadixToaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
