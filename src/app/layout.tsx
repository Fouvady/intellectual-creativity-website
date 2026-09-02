import type { Metadata } from 'next'
import { Geist, Geist_Mono, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { Toaster as RadixToaster } from '@/components/ui/toaster'
import { Toaster as SonnerToaster } from '@/components/ui/sonner'
import { ThemeProvider } from '@/components/site/theme-provider'
import { Preloader } from '@/components/site/preloader'
import { CustomCursor } from '@/components/site/custom-cursor'

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
        {/* === Blocking preloader (raw HTML, class-styled) ===
            Painted on the very first frame BEFORE React hydrates, so the user
            never sees the site content flash before the loading screen.
            Styles live in globals.css (#initial-preloader) so SSR + client
            markup are byte-identical — no hydration mismatch. A tiny inline
            script removes this once the React <Preloader /> mounts (or a
            2.6s failsafe). */}
        <div id="initial-preloader" aria-hidden="true">
          <div className="icf-pl-inner">
            <img
              src="/brand/logo-white.png"
              alt=""
              width={240}
              height={112}
              className="icf-pl-logo"
            />
            <div className="icf-pl-track">
              <div className="icf-pl-bar" />
            </div>
          </div>
        </div>
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
          <CustomCursor />
          {children}
          <RadixToaster />
          <SonnerToaster position="bottom-right" richColors closeButton />
        </ThemeProvider>
      </body>
    </html>
  )
}
