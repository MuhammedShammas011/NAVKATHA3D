import React, { useState, useEffect } from 'react'
import { GooeyDemo } from './components/ui/demo'
import { FeatureSection } from './components/ui/FeatureSection'
import { PixelTrail } from '@/components/ui/pixel-trail'
import { GooeyFilter } from '@/components/ui/gooey-filter'
import { useScreenSize } from '@/hooks/use-screen-size'
import { InitialLoader } from '@/components/ui/loader'
import { ClientSection } from '@/components/ui/ruler-carousel'
import { WorksSection } from '@/components/ui/works-carousel'
import { TestimonialSection } from '@/components/ui/TestimonialSection'
import { Footer } from '@/components/ui/footer'

export default function App() {
  const screenSize = useScreenSize()
  const [isLoading, setIsLoading] = useState(true)

  // Optional: Prevent scroll while loading
  useEffect(() => {
    if (isLoading) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
  }, [isLoading])

  return (
    <>
      {isLoading && <InitialLoader onComplete={() => setIsLoading(false)} />}
      
      <main className="w-full bg-[#f5f2eb] relative">
        {/* Global Cursor Animation Overlay */}
        <div className="fixed inset-0 z-50 pointer-events-none" style={{ filter: "url(#gooey-filter-pixel-trail)" }}>
          <PixelTrail
            pixelSize={screenSize.lessThan(`md`) ? 24 : 32}
            fadeDuration={0}
            delay={500}
            pixelClassName="bg-[#1a1a18]"
          />
        </div>
        <GooeyFilter id="gooey-filter-pixel-trail" strength={5} />

        {/* Hero pinned in place — feature section scrolls over it */}
        <div className="sticky top-0 z-0 h-screen min-h-[700px]">
          <GooeyDemo />
        </div>
        <FeatureSection />
        <ClientSection />
        <WorksSection />
        <TestimonialSection />
        <Footer />
      </main>
    </>
  )
}
