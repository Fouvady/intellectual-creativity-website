import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster as RadixToaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/site/theme-provider'
import { Preloader } from '@/components/site/preloader'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

const spaceGrotesk = Space_Grotesk({
  variable: '--font-space-grotesk',
  subsets: ['latin'],
  weight: ['500', '600', '700'],
  display: 'swap',
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
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${spaceGrotesk.variable} antialiased bg-background text-foreground font-sans`}
      >
        {/* === Blocking preloader (raw HTML) ===
            Painted on the very first frame BEFORE React hydrates, so the user
            never sees the site content flash before the loading screen.
            A tiny inline script removes this once the React <Preloader />
            has mounted and taken over (or after a 3s failsafe). The overlay
            matches the page background + centers the logo so it looks
            identical to the React preloader. */}
        <div
          id="initial-preloader"
          aria-hidden="true"
          style={{
            position: 'fixed',
            inset: '0',
            zIndex: 9999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--background, #0a0f1a)',
            transition: 'opacity 0.6s ease',
          }}
        >
          <div style={{ textAlign: 'center', padding: '0 1.5rem' }}>
            <img
              src="/brand/logo-white.png"
              alt=""
              width="240"
              height="112"
              style={{
                width: 'min(60vw, 260px)',
                height: 'auto',
                margin: '0 auto',
                opacity: 0.96,
                filter:
                  'invert(0)', /* dark theme default — JS adjusts for light */
              }}
            />
            <div
              style={{
                marginTop: '1.25rem',
                height: '3px',
                width: '180px',
                margin: '1.25rem auto 0',
                borderRadius: '999px',
                background: 'rgba(255,255,255,0.08)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: '100%',
                  transformOrigin: '0% 50%',
                  background:
                    'linear-gradient(120deg, #22d3ee, #38bdf8)',
                  borderRadius: '999px',
                  animation: 'icf-preload-fill 2.3s cubic-bezier(0.4,0,0.2,1) forwards',
                }}
              />
            </div>
          </div>
        </div>
        {/* Inline keyframes for the blocking preloader + handoff script.
            Runs before hydration, no flash of unstyled content. */}
        <style>{`@keyframes icf-preload-fill{from{transform:scaleX(0)}to{transform:scaleX(1)}}`}</style>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(){
                function removeInitialPreloader(){
                  var el = document.getElementById('initial-preloader');
                  if(!el) return;
                  el.style.opacity = '0';
                  setTimeout(function(){ if(el && el.parentNode) el.parentNode.removeChild(el); }, 650);
                }
                // Wait for the React Preloader to signal it has mounted, OR
                // fallback: remove after 2.6s regardless so the site always shows.
                window.__icf_preloader_ready = removeInitialPreloader;
                setTimeout(removeInitialPreloader, 2600);
                // Match the logo invert to the active theme (dark default).
                try {
                  if (document.documentElement.classList.contains('light')) {
                    var img = document.querySelector('#initial-preloader img');
                    if (img) img.style.filter = 'invert(1)';
                  }
                } catch(e) {}
              })();
            `,
          }}
        />

        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <Preloader />
          {children}
          <RadixToaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
