import type { Metadata } from 'next'
import { Navbar } from '@/components/site/navbar'
import { ScrollProgress } from '@/components/motion/scroll-progress'
import Gallery from '@/components/ui/3d-parallax-unfurling-gallery'

export const metadata: Metadata = {
  title: 'Gallery — Intellectual Creativity',
  description:
    'A 3D parallax unfurling gallery showcasing the work and world of Intellectual Creativity for Information Technology.',
}

export default function GalleryPage() {
  return (
    <div id="top" className="relative min-h-screen bg-background text-foreground">
      <ScrollProgress />
      <Navbar />
      <main className="relative">
        <Gallery />
      </main>
    </div>
  )
}
