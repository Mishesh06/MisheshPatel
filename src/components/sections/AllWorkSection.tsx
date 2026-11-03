/**
 * AllWorkSection — warm stone archive grid matching https://www.sebg.ch/
 *
 * Implements exact visual parity with sebg.ch:
 *  - Solid warm stone canvas (#f1f1ec) with continuous 4px halftone grid (.bg-grid)
 *  - Generous space ABOVE "All work": clamp(6rem, 13vw, 11rem) (~135px on desktop)
 *  - Generous space BELOW "All work" before cards: clamp(4.5rem, 8vw, 7rem) (~85px on desktop)
 *  - Generous space AFTER cards at section bottom: clamp(9rem, 18vw, 16rem) (~180px on desktop)
 *  - 3 cards in one line on desktop (aspect-[16/10] with retro dither shadow)
 *  - Underneath each card: project name on left, year on right, matching sebg.ch 1:1
 *  - Clicking anywhere on the card opens the project case study (/work/:slug)
 */

import { useRef } from 'react'
import { Link } from 'react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { projects } from '@/data/content'

export default function AllWorkSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const gridRef    = useRef<HTMLUListElement>(null)
  const reduced    = useReducedMotion()

  useGSAP(
    () => {
      if (reduced) return

      const cards = gridRef.current?.querySelectorAll('.work-card-item')
      if (!cards?.length) return

      gsap.fromTo(
        cards,
        { opacity: 0, y: 25 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: gridRef.current,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        },
      )
    },
    { scope: sectionRef },
  )

  return (
    <section
      id="all-work"
      ref={sectionRef}
      aria-label="All Work Archive"
      data-mascot="badge"
      data-mascot-ring="#2054e2"
      data-mascot-outfit="watchmaker"
      data-mascot-gesture="cheer"
      className="all-work-section relative bg-stone text-ink bg-grid overflow-hidden select-none"
      style={{
        backgroundColor: '#f1f1ec',
        paddingTop: 'clamp(6rem, 13vw, 11rem)',
        paddingBottom: 'clamp(9rem, 18vw, 16rem)',
      }}
    >
      {/* ── Section Header matching sebg.ch ── */}
      <div
        className="all-work-header grid-page items-baseline"
        style={{ marginBottom: 'clamp(4.5rem, 8vw, 7rem)' }}
      >
        <div className="col-span-3 md:col-span-8">
          <h2 className="font-display text-[clamp(3.5rem,8vw,8rem)] leading-[0.95] font-bold tracking-[-0.035em]">
            All work
          </h2>
        </div>
        <div className="col-span-1 md:col-span-4 flex justify-end">
          <span className="font-mono text-ink/50 text-sm md:text-base select-none">
            {projects.length} projects
          </span>
        </div>
      </div>

      {/* ── Project Cards Grid (3 in one line on desktop matching sebg.ch) ── */}
      <div className="grid-page">
        <ul
          ref={gridRef}
          className="col-span-4 md:col-span-12 grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-7 lg:gap-8 list-none m-0 p-0"
        >
          {projects.map((project) => (
            <li
              key={project.id}
              className="work-card-item flex flex-col"
            >
              <Link
                to={`/work/${project.id}`}
                className="group block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue rounded-xl"
                aria-label={`View ${project.title}`}
              >
                {/* Aspect 16/10 Cover Visual with Dither Shadow */}
                <div className="relative aspect-[16/10] overflow-hidden rounded-[14px]">
                  {/* Signature Halftone Dither Shadow */}
                  <span className="dither absolute inset-0 translate-1.5 rounded-[14px] pointer-events-none group-hover:translate-x-2.5 group-hover:translate-y-2.5 transition-transform duration-250 ease-out" />

                  {/* Inner Card Shell with Real Screenshot */}
                  <div className="relative size-full overflow-hidden rounded-[14px] border border-ink/12 bg-black shadow-sm">
                    <img
                      src={project.screenshot || `/projects/${project.id}/desktop-1.jpg`}
                      alt={project.title}
                      className="size-full object-cover object-top scale-[1.01] group-hover:scale-[1.04] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]"
                      loading="lazy"
                      onError={(e) => {
                        const target = e.currentTarget
                        target.src = '/projects/career-gap-analyzer/desktop-1.jpg'
                      }}
                    />
                  </div>
                </div>

                {/* Underneath Screenshot: Project Name (Left) + Year (Right) matching sebg.ch */}
                <div className="mt-3.5 flex items-baseline justify-between gap-4">
                  <h3 className="font-display font-semibold text-base md:text-lg lg:text-xl text-ink group-hover:text-blue transition-colors tracking-[-0.02em] leading-snug">
                    {project.title}
                  </h3>
                  <span className="font-mono text-ink/45 text-sm md:text-base shrink-0 select-none">
                    {project.year || '2026'}
                  </span>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
