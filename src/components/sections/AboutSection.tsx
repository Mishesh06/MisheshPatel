/**
 * AboutSection — authentic scroll-scrub intro scene matching sebg.ch.
 *
 * Implements:
 *  - Solid off-white paper canvas (#fbfbf8) with architectural grid lines (.bg-grid)
 *  - Signature geometric dither seam (.section-seam) transitioning from royal blue hero
 *  - Left column dedicated for the 3D Guide Mascot (data-mascot="left")
 *  - Mascot aims/points directly at the intro text during scroll (matching sebg.ch)
 *  - Scroll-driven word-by-word reveal: starts ghosted/faint, scrubs to bold black/blue
 *  - Reduced-motion compliant
 */

import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'

interface WordToken {
  text: string
  isAccent?: boolean
  isBold?: boolean
}

const BIO_WORDS: WordToken[] = [
  { text: "I'm" },
  { text: "a" },
  { text: "computer" },
  { text: "science" },
  { text: "student" },
  { text: "specialising" },
  { text: "in" },
  { text: "Artificial", isAccent: true, isBold: true },
  { text: "Intelligence", isAccent: true, isBold: true },
  { text: "and", isAccent: true, isBold: true },
  { text: "Machine", isAccent: true, isBold: true },
  { text: "Learning,", isAccent: true, isBold: true },
  { text: "focused" },
  { text: "on" },
  { text: "building" },
  { text: "intelligent" },
  { text: "software" },
  { text: "systems." },
  { text: "I" },
  { text: "enjoy" },
  { text: "exploring" },
  { text: "how" },
  { text: "data," },
  { text: "algorithms," },
  { text: "and" },
  { text: "modern" },
  { text: "technologies" },
  { text: "can" },
  { text: "solve" },
  { text: "meaningful" },
  { text: "problems." },
  { text: "Through" },
  { text: "my" },
  { text: "projects," },
  { text: "I" },
  { text: "turn" },
  { text: "ideas" },
  { text: "into" },
  { text: "practical" },
  { text: "applications," },
  { text: "combining" },
  { text: "software" },
  { text: "engineering" },
  { text: "with" },
  { text: "machine" },
  { text: "intelligence." },
  { text: "I'm" },
  { text: "most" },
  { text: "interested" },
  { text: "in" },
  { text: "building" },
  { text: "solutions" },
  { text: "that" },
  { text: "are" },
  { text: "useful," },
  { text: "thoughtful," },
  { text: "and" },
  { text: "scalable." },
]

export default function AboutSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const textRef    = useRef<HTMLParagraphElement>(null)
  const reduced    = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return
      const section = sectionRef.current
      const textElem = textRef.current
      if (!section || !textElem) return

      const words = textElem.querySelectorAll<HTMLElement>('.scrub-word')
      if (!words.length) return

      // Helper to trigger mascot pointing and looking directly at the text
      const pointAtText = () => {
        window.dispatchEvent(new CustomEvent('mascot:say', { detail: textElem }))
      }

      // Scroll-driven progressive word reveal (scrub animation matching sebg.ch)
      gsap.fromTo(
        words,
        { opacity: 0.15 },
        {
          opacity: 1,
          stagger: 0.08,
          ease: 'none',
          scrollTrigger: {
            trigger: section,
            start: 'top 55%',
            end: 'bottom 75%',
            scrub: 0.4,
            onEnter: pointAtText,
            onEnterBack: pointAtText,
            onUpdate: (self) => {
              if (self.progress > 0.05 && self.progress < 0.95 && Math.random() < 0.12) {
                pointAtText()
              }
            },
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="about"
      ref={sectionRef}
      aria-label="About Mishesh Patel"
      data-mascot="left"
      className="relative min-h-[120vh] bg-paper text-ink bg-grid flex items-center py-24 md:py-36 overflow-hidden"
    >
      {/* Signature Halftone Dither Seam from sebg.ch */}
      <div className="section-seam text-paper" aria-hidden="true" />

      <div className="grid-page items-center w-full">
        {/* Left Column (Cols 1-4): Dedicated space for the 3D Guide Mascot */}
        <div className="col-span-4 md:col-span-4 min-h-[260px] md:min-h-[420px] pointer-events-none" />

        {/* Right Column (Cols 5-12): Large Editorial Bio Typography matching sebg.ch */}
        <div className="col-span-4 md:col-span-8 flex flex-col justify-center">
          <p
            ref={textRef}
            className="font-display text-[clamp(1.6rem,3.4vw,3.25rem)] font-normal leading-[1.24] tracking-[-0.025em] select-none"
          >
            {BIO_WORDS.map((word, i) => (
              <span
                key={i}
                className={`scrub-word inline transition-colors duration-150 ${
                  word.isAccent
                    ? 'font-bold text-blue'
                    : word.isBold
                    ? 'font-bold text-ink'
                    : 'font-normal text-ink'
                }`}
                style={reduced ? { opacity: 1 } : { opacity: 0.15 }}
              >
                {word.text}{' '}
              </span>
            ))}
          </p>
        </div>
      </div>
    </section>
  )
}
