/**
 * ContactSection — solid ink black outro scene matching sebg.ch structure.
 *
 * Implements:
 *  - Solid deep ink black canvas (#0b0b0c) with off-white paper typography (#fbfbf8)
 *  - Full viewport height (h-lvh) with 1fr_auto row layout
 *  - Giant display headline ("Got a project? / I'm taking on new work.")
 *  - Direct email link with click-to-copy + audio chime
 *  - Columns 9-12 reserved for the big 3D character waving (data-mascot="outro" data-mascot-gesture="wave")
 *  - Subgrid row with verified LinkedIn, GitHub, Copyright, and "Do a trick"
 */

import { useRef, useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { sound } from '@/utils/sound'
import { person, contactCopy } from '@/data/content'

export default function ContactSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return

      const section = sectionRef.current
      if (!section) return

      gsap.fromTo(
        section.querySelectorAll('.contact-fade'),
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: section,
            start: 'top 75%',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  const handleHoverEmail = () => {
    window.dispatchEvent(
      new CustomEvent('mascot:say:line', { detail: { line: 4, gesture: 'cheer' } }),
    )
  }

  const handleCopyEmail = async (e: React.MouseEvent) => {
    e.preventDefault()
    try {
      await navigator.clipboard.writeText(person.email)
      sound.play('bell')
      setCopied(true)
      window.dispatchEvent(
        new CustomEvent('mascot:say:line', { detail: { line: 5, gesture: 'thumbs' } }),
      )
      setTimeout(() => setCopied(false), 3500)
    } catch {
      sound.play('bell')
      setCopied(true)
      window.dispatchEvent(
        new CustomEvent('mascot:say:line', { detail: { line: 5, gesture: 'thumbs' } }),
      )
      setTimeout(() => setCopied(false), 3500)
    }
  }

  const handleDoTrick = () => {
    sound.playTrick()
    window.dispatchEvent(new Event('mascot:trick'))
  }

  return (
    <section
      id="contact"
      ref={sectionRef}
      aria-label="Contact Mishesh"
      data-mascot="outro"
      data-mascot-gesture="wave"
      className="bg-ink text-paper bg-grid grid-page before:bg-grid before:bg-ink relative h-lvh content-start pt-[10svh] pb-[var(--margin)] before:absolute before:inset-x-0 before:bottom-[calc(100%-1px)] before:h-16 md:grid-rows-[1fr_auto] md:content-stretch md:pt-[18svh] select-none"
    >
      {/* ── Top / Left Block: Columns 1 to 8 (Columns 9 to 12 are for the big character) ── */}
      <div className="contact-fade col-span-4 md:col-span-8 flex flex-col justify-start">
        <h2 className="font-display text-[clamp(3rem,8vw,8.5rem)] leading-[0.9] font-semibold tracking-[-0.045em]">
          {contactCopy.heading || 'Got a project?'}
        </h2>

        <p className="font-display text-paper/60 mt-4 text-[clamp(1.25rem,2vw,2rem)] tracking-[-0.02em] md:mt-6">
          {contactCopy.subheading || "I'm taking on new work."}
        </p>

        {/* Large Underlined Direct Email Link matching sebg.ch */}
        <div className="mt-5 md:mt-8 flex items-baseline gap-4">
          <a
            href={`mailto:${person.email}`}
            onClick={handleCopyEmail}
            onPointerEnter={handleHoverEmail}
            title="Click to copy email address"
            className="font-display decoration-paper/40 hover:decoration-paper text-[clamp(1.75rem,3.6vw,3.5rem)] font-light tracking-[-0.03em] underline decoration-1 underline-offset-[0.18em] transition-colors text-paper cursor-pointer inline-block"
          >
            {person.email}
          </a>

          {copied && (
            <span className="px-3 py-1 rounded-full bg-emerald-500 text-ink font-display text-xs font-bold animate-in fade-in">
              Copied!
            </span>
          )}
        </div>
      </div>

      {/* ── Bottom Subgrid Row matching sebg.ch ── */}
      <div className="contact-fade col-span-4 mt-10 grid grid-cols-subgrid gap-y-4 md:col-span-12 md:mt-0 md:gap-y-6">
        {/* LinkedIn */}
        {person.linkedin && (
          <a
            href={person.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.play('blip')}
            className="font-display group col-span-2 flex items-center gap-2 text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold tracking-[-0.03em] md:col-span-3 text-paper hover:text-white transition-colors order-1"
          >
            <span>LinkedIn</span>
            <svg
              className="size-[0.5em] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 11 11 3m0 0H4m7 0v7" />
            </svg>
          </a>
        )}

        {/* GitHub */}
        {person.github && (
          <a
            href={person.github}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.play('blip')}
            className="font-display group col-span-2 flex items-center gap-2 text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold tracking-[-0.03em] md:col-span-3 text-paper hover:text-white transition-colors order-2"
          >
            <span>GitHub</span>
            <svg
              className="size-[0.5em] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 11 11 3m0 0H4m7 0v7" />
            </svg>
          </a>
        )}

        {/* Resume PDF */}
        {person.resume && (
          <a
            href={person.resume}
            download="Mishesh_Patel_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sound.play('blip')}
            className="font-display group col-span-2 flex items-center gap-2 text-[clamp(1.5rem,2.6vw,2.5rem)] font-semibold tracking-[-0.03em] md:col-span-3 text-paper hover:text-white transition-colors order-3"
          >
            <span>Resume</span>
            <svg
              className="size-[0.5em] transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 11 11 3m0 0H4m7 0v7" />
            </svg>
          </a>
        )}

        {/* Interactive "Do a trick" button */}
        <button
          type="button"
          onClick={handleDoTrick}
          className="text-paper/50 hover:text-paper col-span-2 cursor-pointer text-left text-[0.9375rem] transition-colors motion-safe:block md:col-span-3 md:col-start-4 font-display order-4 md:order-5"
        >
          Do a trick
        </button>

        {/* Copyright */}
        <span className="text-paper/50 col-span-4 text-[0.9375rem] md:col-span-3 md:col-start-1 font-display order-5 md:order-4">
          © {new Date().getFullYear()} {person.name}
        </span>
      </div>
    </section>
  )
}
