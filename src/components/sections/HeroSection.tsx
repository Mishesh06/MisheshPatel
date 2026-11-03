/**
 * HeroSection — solid royal blue architectural hero matching sebg.ch structure.
 *
 * Implements:
 *  - Solid royal blue canvas (#2261e9) with architectural grid lines (.bg-grid)
 *  - Authentic sebg.ch minimalist layout: author brand & "Get in touch ↓" at top
 *  - High-contrast off-white paper typography (#fbfbf8)
 *  - Giant display headline: "I build intelligence into systems."
 *  - Clean uncluttered presentation matching sebg.ch (no extra buttons or status tickers)
 *  - Dedicated right-side space for the authentic 3D Guide Mascot
 *  - Reduced-motion compliant
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import Navbar from '@/components/layout/Navbar'

export default function HeroSection() {
  const heroRef      = useRef<HTMLElement>(null)
  const headlineRef  = useRef<HTMLHeadingElement>(null)
  const reduced      = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } })

      if (headlineRef.current) {
        tl.fromTo(
          headlineRef.current,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.8 },
          0.1,
        )
      }
    },
    { scope: heroRef },
  )

  return (
    <section
      id="hero"
      ref={heroRef}
      aria-label="Introduction"
      data-mascot="hero"
      className="relative min-h-svh bg-blue text-paper bg-grid flex flex-col justify-between overflow-hidden"
    >
      {/* Top Header matching sebg.ch */}
      <Navbar />

      {/* Main Content Area: Giant Headline on Left, Mascot Space on Right */}
      <div className="grid-page flex-1 items-end pb-12 md:pb-20">
        {/* Left Column (Cols 1-8): Giant Headline */}
        <div className="col-span-4 md:col-span-8 self-end">
          <h1
            ref={headlineRef}
            className="font-display font-semibold text-[clamp(3.5rem,10vw,11rem)] leading-[0.92] tracking-[-0.04em]"
          >
            I build intelligence into{' '}
            <span className="font-light opacity-90">systems.</span>
          </h1>
        </div>

        {/* Right Column (Cols 9-12): Dedicated space for the 3D Guide Mascot */}
        <div className="col-span-4 md:col-span-4 min-h-[260px] md:min-h-[380px] pointer-events-none" />
      </div>
    </section>
  )
}
