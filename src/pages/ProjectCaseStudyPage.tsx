/**
 * ProjectCaseStudyPage — 100% faithful replication of sebg.ch/projects/jaeger-le-coultre.
 *
 * Implements the exact 5-section architecture, typography, grid columns,
 * subgrid metadata, container queries for devices, animations, and mascot triggers:
 *
 *  1. Floating Navigation:
 *     - "← All work" button on left
 *     - "Visit {site} ↗" button on right
 *  2. Section 1 (.case-hero):
 *     - --tint background (#0a3149) & --text (#fbfbf8)
 *     - Giant display title text-[clamp(3.25rem,7.5vw,8rem)]
 *     - Subgrid metadata list (Year, Role, Stack)
 *     - Aspect-[3/2] cover with dither shadow & scale-down entrance
 *     - data-mascot="project" data-mascot-ring="#b0885a" data-mascot-outfit="watchmaker" data-mascot-gesture="wave"
 *  3. Section 2 (Narrative & Overview):
 *     - Clean paper background (bg-paper text-ink)
 *     - Large thesis statement (.case-reveal)
 *     - Deep technical narrative copy (.case-copy)
 *     - data-mascot="badge" data-mascot-outfit="watchmaker"
 *  4. Section 3 (Feature Showcase & Multi-Device Gallery):
 *     - Warm stone background (--color-stone: #f1f1ec)
 *     - Full 16:10 desktop browser frame
 *     - Section headline & explanatory paragraph
 *     - Two side-by-side 16:10 desktop browsers
 *     - Three side-by-side iPhone mockups with cqw container queries & status bar
 *     - data-mascot="badge" data-mascot-outfit="watchmaker"
 *  5. Section 4 (.case-clip):
 *     - Interactive live simulation inside macOS desktop browser frame
 *     - data-mascot="left" data-mascot-outfit="watchmaker"
 *  6. Section 5 (.case-next):
 *     - Next project transition with giant display title & 3:2 cover card link
 *     - data-mascot="project" data-mascot-outfit="watchmaker"
 */

import { useEffect } from 'react'
import { useParams, Link } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { refreshMascot } from '@/components/mascot/mascotEngine'
import CareerGapMockup from '@/components/ui/mockups/CareerGapMockup'
import BioLinkMockup from '@/components/ui/mockups/BioLinkMockup'
import MiniERPMockup from '@/components/ui/mockups/MiniERPMockup'
import { projects } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

// Color configs matching sebg.ch project chapters
const PROJECT_THEMES: Record<
  string,
  {
    bg: string
    text: string
    accent: string
    stoneBg: string
    nextBg: string
    nextText: string
  }
> = {
  'career-gap-analyzer': {
    bg: '#0a3149',
    text: '#fbfbf8',
    accent: '#b0885a',
    stoneBg: '#f1f1ec',
    nextBg: '#ffe64e',
    nextText: '#0b0b0c',
  },
  'branded-shortlink-bio-hub': {
    bg: '#ffe64e',
    text: '#0b0b0c',
    accent: '#2054e2',
    stoneBg: '#f1f1ec',
    nextBg: '#c2a7f4',
    nextText: '#0b0b0c',
  },
  'mini-erp-crm-portal': {
    bg: '#c2a7f4',
    text: '#0b0b0c',
    accent: '#2054e2',
    stoneBg: '#f1f1ec',
    nextBg: '#0a3149',
    nextText: '#fbfbf8',
  },
}

const SECTION3_COPY: Record<string, { headline: string; copy: string }> = {
  'career-gap-analyzer': {
    headline: 'High precision, sub-second latency.',
    copy: 'Evaluates candidate resumes across 28 skill dimensions with sub-second vector search, scoring every match against active employer openings and verified hiring criteria.',
  },
  'branded-shortlink-bio-hub': {
    headline: 'Sub-15ms edge routing, live telemetry.',
    copy: 'Engineered with distributed Redis caching to resolve 302 redirects with microsecond precision, capturing referrer, device, and conversion metrics in real time.',
  },
  'mini-erp-crm-portal': {
    headline: 'Audit-grade consistency, dual-entry ledger.',
    copy: 'Tracks multi-warehouse SKU levels in real time, triggering automated replenishment alerts and generating sequential delivery challans with verified audit trails.',
  },
}

export default function ProjectCaseStudyPage() {
  const { slug } = useParams<{ slug: string }>()

  const projectIndex = projects.findIndex((p) => p.id === slug)
  const project = projects[projectIndex] || projects[0]

  const theme = PROJECT_THEMES[project.id] || {
    bg: '#0a3149',
    text: '#fbfbf8',
    accent: '#b0885a',
    stoneBg: '#f1f1ec',
    nextBg: '#ffe64e',
    nextText: '#0b0b0c',
  }

  const nextProject = projects[(projectIndex + 1) % projects.length]
  const liveUrlClean = project.liveUrl
    ? project.liveUrl.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : `${project.id}.mishesh.dev`

  // Scroll to top, refresh mascot engine, and set body background color matching sebg.ch
  useEffect(() => {
    window.scrollTo(0, 0)
    document.body.style.backgroundColor = theme.bg

    // Force mascot engine layout refresh on case study page mount
    refreshMascot()
    ScrollTrigger.refresh()

    const refreshTimer1 = setTimeout(() => {
      refreshMascot()
      ScrollTrigger.refresh()
    }, 120)

    const refreshTimer2 = setTimeout(() => {
      refreshMascot()
      ScrollTrigger.refresh()
      window.dispatchEvent(new Event('mascot:land'))
    }, 350)

    // Entrance animation matching sebg.ch _slug_.astro
    const ctx = gsap.context(() => {
      // 1. Cover image scale settle
      gsap.fromTo(
        '.case-hero__image',
        { scale: 1.04 },
        { scale: 1, duration: 1.6, ease: 'expo.out' },
      )
      // 2. Title word reveal with overflow mask
      gsap.fromTo(
        '.hero-title-word',
        { yPercent: 110 },
        { yPercent: 0, duration: 1.2, ease: 'expo.out', stagger: 0.07, delay: 0.4 },
      )
      // 3. Subgrid metadata stagger
      gsap.fromTo(
        '.case-hero dl > div',
        { y: 16, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'expo.out', stagger: 0.08, delay: 0.6 },
      )

      // 4. Case reveal & copy entrance animations matching sebg.ch
      gsap.utils.toArray<HTMLElement>('.case-reveal, .case-copy p').forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0.35, y: 14 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'expo.out',
            scrollTrigger: {
              trigger: el,
              start: 'top 80%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      })

      // 5. Autoplay clip video on scroll matching sebg.ch _slug_.astro
      document.querySelectorAll<HTMLVideoElement>('main video, .case-clip video').forEach((v) => {
        ScrollTrigger.create({
          trigger: v,
          start: 'top bottom',
          end: 'bottom top',
          onToggle: ({ isActive }) => {
            if (isActive) v.play().catch(() => {})
            else v.pause()
          },
        })
      })
    })

    // Trigger mascot wave gesture upon landing
    const waveTimer = setTimeout(() => {
      // @ts-expect-error window.seb is attached by mascotEngine
      if (typeof window !== 'undefined' && window.seb?.wave) {
        // @ts-expect-error window.seb is attached by mascotEngine
        window.seb.wave()
      }
    }, 550)

    return () => {
      ctx.revert()
      clearTimeout(waveTimer)
      clearTimeout(refreshTimer1)
      clearTimeout(refreshTimer2)
      document.body.style.backgroundColor = ''
    }
  }, [slug, theme.bg])

  return (
    <main
      className="relative w-full min-h-screen bg-paper text-ink font-sans selection:bg-[#2054e2] selection:text-white"
      style={
        {
          '--tint': theme.bg,
          '--accent': theme.accent,
          '--text': theme.text,
        } as React.CSSProperties
      }
    >
      {/* ══════════════════════════════════════════════════════════
          1. FLOATING NAVIGATION BAR (matching sebg.ch fixed nav)
      ══════════════════════════════════════════════════════════ */}
      <nav className="grid-page pointer-events-none fixed inset-x-0 top-0 z-20 pt-4 md:pt-6">
        {/* Left: Back to All Work */}
        <div className="col-span-2 md:col-span-6 flex items-center">
          <Link to="/#all-work" className="button group pointer-events-auto">
            <svg
              className="size-3.5 transition-transform duration-150 group-hover:-translate-x-0.5"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M13 7H1m0 0 5-5M1 7l5 5" />
            </svg>
            <span>All work</span>
          </Link>
        </div>

        {/* Right: Visit Live Site / Repo */}
        <div className="col-span-2 flex justify-end md:col-span-6 items-center gap-2">
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="button group pointer-events-auto max-md:hidden"
              title="View source code on GitHub"
            >
              <span>GitHub</span>
              <svg
                className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
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
          <a
            href={project.liveUrl || project.repoUrl || `https://${liveUrlClean}`}
            target="_blank"
            rel="noopener noreferrer"
            className="button group pointer-events-auto"
          >
            {project.liveUrl ? (
              <>
                <span className="max-md:hidden">Visit {liveUrlClean}</span>
                <span className="md:hidden">Visit site</span>
              </>
            ) : (
              <>
                <span className="max-md:hidden">GitHub repository</span>
                <span className="md:hidden">GitHub</span>
              </>
            )}
            <svg
              className="size-3.5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              viewBox="0 0 14 14"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              aria-hidden="true"
            >
              <path d="M3 11 11 3m0 0H4m7 0v7" />
            </svg>
          </a>
        </div>
      </nav>

      {/* ══════════════════════════════════════════════════════════
          2. SECTION 1: CASE HERO (matching sebg.ch .case-hero)
      ══════════════════════════════════════════════════════════ */}
      <section
        className="case-hero bg-grid grid-page relative min-h-svh content-start bg-(--tint) text-(--text) select-none"
        data-mascot="project"
        data-mascot-ring={theme.accent}
        data-mascot-outfit="watchmaker"
        data-mascot-gesture="wave"
        style={{
          backgroundColor: theme.bg,
          color: theme.text,
          '--tint': theme.bg,
          '--accent': theme.accent,
          '--text': theme.text,
        } as React.CSSProperties}
      >
        {/* Large Display Title with Word Mask Reveal & Guaranteed Spacing */}
        <h1 className="case-hero-title font-display col-span-4 text-[clamp(3.25rem,7.5vw,8rem)] leading-[0.9] font-semibold tracking-[-0.045em] capitalize md:col-span-8 flex flex-wrap items-baseline gap-x-[0.32em]">
          {project.title.split(' ').map((word, wIdx) => (
            <span key={wIdx} className="inline-block overflow-hidden py-1">
              <span className="hero-title-word inline-block">{word}</span>
            </span>
          ))}
        </h1>

        {/* Subgrid Metadata Definition List */}
        <dl className="col-span-4 mt-6 grid grid-cols-4 md:grid-cols-8 gap-y-4 md:col-span-8 md:mt-10 md:gap-y-5">
          <div className="col-span-2">
            <dt className="text-current/55 text-sm">Year</dt>
            <dd className="mt-1 font-medium">{project.year || '2026'}</dd>
          </div>
          <div className="col-span-2 md:col-span-3">
            <dt className="text-current/55 text-sm">Role</dt>
            <dd className="mt-1 font-medium">{project.role || 'Full-stack development'}</dd>
          </div>
          <div className="col-span-4 md:col-span-3">
            <dt className="text-current/55 text-sm">Stack</dt>
            <dd className="mt-1 font-medium">{project.tech.slice(0, 3).join(', ')}</dd>
          </div>
        </dl>

        {/* 3:2 Hero Cover Card */}
        <picture
          className="relative col-span-4 mt-6 block aspect-[3/2] overflow-hidden rounded-[12px] md:col-span-8 md:mt-12 shadow-2xl"
          data-cover={project.id}
          data-dither="0.2"
          data-tint={theme.bg}
        >
          <img
            src={`/projects/${project.id}/desktop-1.jpg`}
            alt={project.title}
            className="case-hero__image size-full! scale-[1.04] object-cover"
            loading="eager"
            onError={(e) => {
              const target = e.currentTarget
              target.src = '/projects/career-gap-analyzer/desktop-1.jpg'
            }}
          />
        </picture>
      </section>

      {/* ══════════════════════════════════════════════════════════
          3. SECTION 2: HIGH-IMPACT THESIS & NARRATIVE
      ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-grid grid-page gap-y-12 py-[14svh] md:gap-y-24 bg-paper text-ink select-none"
        data-mascot="badge"
        data-mascot-outfit="watchmaker"
      >
        {/* Large Thesis Statement (case-reveal) */}
        <p className="case-reveal font-display col-span-4 text-[clamp(1.75rem,3.3vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] md:col-span-8">
          {project.problem ||
            'Career Gap Finder was engineered to eliminate hiring stigma, turning employment breaks into quantifiable advantages through AI-driven skill bridging.'}
        </p>

        {/* Detailed Narrative Story (case-copy) */}
        <div className="case-copy font-display col-span-4 text-[clamp(1.35rem,2vw,2.1rem)] leading-[1.2] font-medium tracking-[-0.02em] md:col-span-8 md:col-start-5 [&_a]:underline [&_a]:decoration-current/40 [&_a]:decoration-1 [&_a]:underline-offset-[0.18em] [&_a]:transition-colors [&_a:hover]:decoration-current [&_a_*]:[text-decoration:inherit] [&_article]:flex [&_article]:flex-col [&_article]:gap-6">
          <article>
            <p>{project.description}</p>
          </article>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          4. SECTION 3: FEATURE SHOWCASE & MULTI-DEVICE GALLERY
      ══════════════════════════════════════════════════════════ */}
      <section
        className="bg-stone bg-grid relative py-[14svh] text-ink select-none"
        style={{ backgroundColor: theme.stoneBg }}
        data-mascot="badge"
        data-mascot-outfit="watchmaker"
      >
        <div className="grid-page gap-y-(--gutter)">
          {/* Full-width Desktop Browser (desktop-1.jpg) */}
          <div className="case-desktop-full relative col-span-4 md:col-span-12">
            <span className="dither absolute inset-0 translate-1.5 rounded-[12px] pointer-events-none" />
            <div className="border-ink/15 bg-paper relative overflow-hidden rounded-[12px] border">
              <div className="border-ink/10 relative flex h-8 items-center gap-1.5 border-b px-3 md:h-9 bg-[#fafaf8]">
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <a
                  href={project.liveUrl || `https://${liveUrlClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink/5 hover:bg-ink/10 transition-colors text-ink/60 hover:text-ink/90 absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-full px-3 py-0.5 text-[11px] font-medium md:text-xs pointer-events-auto"
                >
                  {liveUrlClean}
                </a>
              </div>
              <div className="relative block aspect-[16/10] overflow-hidden" data-dither>
                <img
                  src={`/projects/${project.id}/desktop-1.jpg`}
                  alt={`${project.title} screenshot`}
                  className="size-full! object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          {/* Section Headline & Explanatory Paragraph matching sebg.ch Right to left section */}
          <div className="col-span-4 grid grid-cols-subgrid gap-y-5 py-[6svh] md:py-[10svh] md:col-span-12">
            <h2 className="font-display col-span-4 text-[clamp(1.75rem,3.3vw,3.5rem)] leading-[1.05] font-semibold tracking-[-0.03em] md:col-span-6">
              {(SECTION3_COPY[project.id] || SECTION3_COPY['career-gap-analyzer']).headline}
            </h2>
            <p className="case-reveal font-display col-span-4 text-[clamp(1.25rem,2vw,2.1rem)] leading-[1.2] font-medium tracking-[-0.02em] md:col-span-6 md:col-start-7 text-ink/80">
              {(SECTION3_COPY[project.id] || SECTION3_COPY['career-gap-analyzer']).copy}
            </p>
          </div>

          {/* Two Side-by-Side Desktop Browsers (desktop-2.jpg & desktop-3.jpg) */}
          <div className="case-desktop-half relative col-span-4 md:col-span-6">
            <span className="dither absolute inset-0 translate-1.5 rounded-[12px] pointer-events-none" />
            <div className="border-ink/15 bg-paper relative overflow-hidden rounded-[12px] border">
              <div className="border-ink/10 relative flex h-8 items-center gap-1.5 border-b px-3 md:h-9 bg-[#fafaf8]">
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <a
                  href={project.liveUrl || `https://${liveUrlClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink/5 hover:bg-ink/10 transition-colors text-ink/60 hover:text-ink/90 absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-full px-3 py-0.5 text-[11px] font-medium md:text-xs pointer-events-auto"
                >
                  {liveUrlClean}
                </a>
              </div>
              <div className="relative block aspect-[16/10] overflow-hidden" data-dither>
                <img
                  src={`/projects/${project.id}/desktop-2.jpg`}
                  alt={`${project.title} feature view`}
                  className="size-full! object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>

          <div className="case-desktop-half relative col-span-4 md:col-span-6">
            <span className="dither absolute inset-0 translate-1.5 rounded-[12px] pointer-events-none" />
            <div className="border-ink/15 bg-paper relative overflow-hidden rounded-[12px] border">
              <div className="border-ink/10 relative flex h-8 items-center gap-1.5 border-b px-3 md:h-9 bg-[#fafaf8]">
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
                <a
                  href={project.liveUrl || `https://${liveUrlClean}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-ink/5 hover:bg-ink/10 transition-colors text-ink/60 hover:text-ink/90 absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-full px-3 py-0.5 text-[11px] font-medium md:text-xs pointer-events-auto"
                >
                  {liveUrlClean}
                </a>
              </div>
              <div className="relative block aspect-[16/10] overflow-hidden" data-dither>
                <img
                  src={`/projects/${project.id}/desktop-3.jpg`}
                  alt={`${project.title} analytics view`}
                  className="size-full! object-cover object-top"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Three Side-by-Side Mobile Phones matching sebg.ch exact container queries & grid placement */}
        <div className="grid-page mt-[10svh] items-start">
          <div className="case-phone-grid col-span-4 grid grid-cols-3 gap-(--gutter) md:col-span-12 md:grid-cols-12">
            {/* Phone 1: Dashboard (starts at column 3, spans 2 columns) */}
            <div className="case-phone-item case-phone-item-1 [container-type:inline-size] md:col-span-2 md:col-start-3">
              <div className="relative">
                <span className="dither absolute inset-0 translate-1.5 rounded-[16.6cqw] pointer-events-none" />
                <div
                  className="case-phone-chassis bg-ink relative rounded-[16.6cqw] p-[3.6cqw]"
                  style={{ backgroundColor: '#0b0b0c', color: '#fbfbf8' }}
                >
                  {/* Hardware buttons */}
                  <span
                    className="case-phone-button absolute top-[17%] right-full h-[5%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[25%] right-full h-[8%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[35%] right-full h-[8%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[28%] left-full h-[12%] w-[0.7cqw] rounded-r-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />

                  <div className="case-phone-screen bg-paper relative isolate aspect-[390/844] overflow-hidden rounded-[13cqw]">
                    {/* Status bar */}
                    <div className="grid h-[14cqw] grid-cols-[1fr_29.7cqw_1fr] items-center text-[4cqw] font-semibold tracking-[-0.02em] select-none text-ink">
                      <span className="justify-self-center">9:41</span>
                      <span
                        className="case-phone-notch bg-ink h-[8.8cqw] rounded-full"
                        style={{ backgroundColor: '#0b0b0c' }}
                      />
                      <span className="flex items-center gap-[1.3cqw] justify-self-center">
                        <svg className="h-[2.8cqw]" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
                          <rect y="7.5" width="3" height="4.5" rx="1" />
                          <rect x="5" y="5" width="3" height="7" rx="1" />
                          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                          <rect x="15" width="3" height="12" rx="1" />
                        </svg>
                        <svg className="h-[2.8cqw]" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
                          <path d="M8 2.4c2.3 0 4.4.9 6 2.3l1.3-1.3A10.4 10.4 0 0 0 8 .5 10.4 10.4 0 0 0 .7 3.4L2 4.7a8.5 8.5 0 0 1 6-2.3Z" />
                          <path d="M8 6c1.3 0 2.5.5 3.4 1.3l1.3-1.3A6.6 6.6 0 0 0 8 4.1 6.6 6.6 0 0 0 3.3 6l1.3 1.3C5.5 6.5 6.7 6 8 6Z" />
                          <path d="m8 11.5 2-2a2.9 2.9 0 0 0-4 0Z" />
                        </svg>
                        <svg className="h-[3cqw]" viewBox="0 0 27 13" fill="currentColor" aria-hidden="true">
                          <rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".35" />
                          <rect x="2" y="2" width="20" height="9" rx="2" />
                          <path d="M25 4.5v4a2.2 2.2 0 0 0 0-4Z" opacity=".4" />
                        </svg>
                      </span>
                    </div>

                    {/* Screen picture */}
                    <div className="absolute inset-x-0 top-[14cqw] bottom-0">
                      <picture className="relative block size-full" data-dither="0.2">
                        <img
                          src={`/projects/${project.id}/mobile-1.jpg`}
                          alt={`${project.title} on mobile dashboard`}
                          className="size-full! object-cover object-top"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 2: Skill Gap Report (starts at column 6, spans 2 columns) */}
            <div className="case-phone-item case-phone-item-2 [container-type:inline-size] md:col-span-2 md:col-start-6">
              <div className="relative">
                <span className="dither absolute inset-0 translate-1.5 rounded-[16.6cqw] pointer-events-none" />
                <div
                  className="case-phone-chassis bg-ink relative rounded-[16.6cqw] p-[3.6cqw]"
                  style={{ backgroundColor: '#0b0b0c', color: '#fbfbf8' }}
                >
                  {/* Hardware buttons */}
                  <span
                    className="case-phone-button absolute top-[17%] right-full h-[5%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[25%] right-full h-[8%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[35%] right-full h-[8%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[28%] left-full h-[12%] w-[0.7cqw] rounded-r-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />

                  <div className="case-phone-screen bg-paper relative isolate aspect-[390/844] overflow-hidden rounded-[13cqw]">
                    {/* Status bar */}
                    <div className="grid h-[14cqw] grid-cols-[1fr_29.7cqw_1fr] items-center text-[4cqw] font-semibold tracking-[-0.02em] select-none text-ink">
                      <span className="justify-self-center">9:41</span>
                      <span
                        className="case-phone-notch bg-ink h-[8.8cqw] rounded-full"
                        style={{ backgroundColor: '#0b0b0c' }}
                      />
                      <span className="flex items-center gap-[1.3cqw] justify-self-center">
                        <svg className="h-[2.8cqw]" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
                          <rect y="7.5" width="3" height="4.5" rx="1" />
                          <rect x="5" y="5" width="3" height="7" rx="1" />
                          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                          <rect x="15" width="3" height="12" rx="1" />
                        </svg>
                        <svg className="h-[2.8cqw]" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
                          <path d="M8 2.4c2.3 0 4.4.9 6 2.3l1.3-1.3A10.4 10.4 0 0 0 8 .5 10.4 10.4 0 0 0 .7 3.4L2 4.7a8.5 8.5 0 0 1 6-2.3Z" />
                          <path d="M8 6c1.3 0 2.5.5 3.4 1.3l1.3-1.3A6.6 6.6 0 0 0 8 4.1 6.6 6.6 0 0 0 3.3 6l1.3 1.3C5.5 6.5 6.7 6 8 6Z" />
                          <path d="m8 11.5 2-2a2.9 2.9 0 0 0-4 0Z" />
                        </svg>
                        <svg className="h-[3cqw]" viewBox="0 0 27 13" fill="currentColor" aria-hidden="true">
                          <rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".35" />
                          <rect x="2" y="2" width="20" height="9" rx="2" />
                          <path d="M25 4.5v4a2.2 2.2 0 0 0 0-4Z" opacity=".4" />
                        </svg>
                      </span>
                    </div>

                    {/* Screen picture */}
                    <div className="absolute inset-x-0 top-[14cqw] bottom-0">
                      <picture className="relative block size-full" data-dither="0.2">
                        <img
                          src={`/projects/${project.id}/mobile-2.jpg`}
                          alt={`${project.title} on mobile skill gap report`}
                          className="size-full! object-cover object-top"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Phone 3: AI Career Agent (starts at column 9, spans 2 columns) */}
            <div className="case-phone-item case-phone-item-3 [container-type:inline-size] md:col-span-2 md:col-start-9">
              <div className="relative">
                <span className="dither absolute inset-0 translate-1.5 rounded-[16.6cqw] pointer-events-none" />
                <div
                  className="case-phone-chassis bg-ink relative rounded-[16.6cqw] p-[3.6cqw]"
                  style={{ backgroundColor: '#0b0b0c', color: '#fbfbf8' }}
                >
                  {/* Hardware buttons */}
                  <span
                    className="case-phone-button absolute top-[17%] right-full h-[5%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[25%] right-full h-[8%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[35%] right-full h-[8%] w-[0.7cqw] rounded-l-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />
                  <span
                    className="case-phone-button absolute top-[28%] left-full h-[12%] w-[0.7cqw] rounded-r-[0.6cqw] bg-ink"
                    style={{ backgroundColor: '#0b0b0c' }}
                  />

                  <div className="case-phone-screen bg-paper relative isolate aspect-[390/844] overflow-hidden rounded-[13cqw]">
                    {/* Status bar */}
                    <div className="grid h-[14cqw] grid-cols-[1fr_29.7cqw_1fr] items-center text-[4cqw] font-semibold tracking-[-0.02em] select-none text-ink">
                      <span className="justify-self-center">9:41</span>
                      <span
                        className="case-phone-notch bg-ink h-[8.8cqw] rounded-full"
                        style={{ backgroundColor: '#0b0b0c' }}
                      />
                      <span className="flex items-center gap-[1.3cqw] justify-self-center">
                        <svg className="h-[2.8cqw]" viewBox="0 0 18 12" fill="currentColor" aria-hidden="true">
                          <rect y="7.5" width="3" height="4.5" rx="1" />
                          <rect x="5" y="5" width="3" height="7" rx="1" />
                          <rect x="10" y="2.5" width="3" height="9.5" rx="1" />
                          <rect x="15" width="3" height="12" rx="1" />
                        </svg>
                        <svg className="h-[2.8cqw]" viewBox="0 0 16 12" fill="currentColor" aria-hidden="true">
                          <path d="M8 2.4c2.3 0 4.4.9 6 2.3l1.3-1.3A10.4 10.4 0 0 0 8 .5 10.4 10.4 0 0 0 .7 3.4L2 4.7a8.5 8.5 0 0 1 6-2.3Z" />
                          <path d="M8 6c1.3 0 2.5.5 3.4 1.3l1.3-1.3A6.6 6.6 0 0 0 8 4.1 6.6 6.6 0 0 0 3.3 6l1.3 1.3C5.5 6.5 6.7 6 8 6Z" />
                          <path d="m8 11.5 2-2a2.9 2.9 0 0 0-4 0Z" />
                        </svg>
                        <svg className="h-[3cqw]" viewBox="0 0 27 13" fill="currentColor" aria-hidden="true">
                          <rect x=".5" y=".5" width="23" height="12" rx="3.5" fill="none" stroke="currentColor" opacity=".35" />
                          <rect x="2" y="2" width="20" height="9" rx="2" />
                          <path d="M25 4.5v4a2.2 2.2 0 0 0 0-4Z" opacity=".4" />
                        </svg>
                      </span>
                    </div>

                    {/* Screen picture */}
                    <div className="absolute inset-x-0 top-[14cqw] bottom-0">
                      <picture className="relative block size-full" data-dither="0.2">
                        <img
                          src={`/projects/${project.id}/mobile-3.jpg`}
                          alt={`${project.title} on mobile AI agent`}
                          className="size-full! object-cover object-top"
                          loading="lazy"
                        />
                      </picture>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          5. SECTION 4: INTERACTIVE SIMULATION CLIP (.case-clip)
      ══════════════════════════════════════════════════════════ */}
      <section
        className="case-clip bg-grid grid-page content-start py-[12svh] md:min-h-svh md:content-center md:py-0 select-none bg-paper text-ink"
        data-mascot="left"
        data-mascot-outfit="watchmaker"
      >
        <div className="relative col-span-4 md:col-span-8 md:col-start-5">
          <span className="dither absolute inset-0 translate-1.5 rounded-[12px] pointer-events-none" />
          <div className="border-ink/15 bg-paper relative overflow-hidden rounded-[12px] border shadow-2xl">
            <div className="border-ink/10 relative flex h-8 items-center gap-1.5 border-b px-3 md:h-9 bg-[#fafaf8]">
              <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
              <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
              <span className="bg-ink/15 size-2 rounded-full md:size-2.5" />
              <a
                href={project.liveUrl || `https://${liveUrlClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-ink/5 hover:bg-ink/10 transition-colors text-ink/60 hover:text-ink/90 absolute left-1/2 -translate-x-1/2 overflow-hidden rounded-full px-3 py-0.5 text-[11px] font-medium md:text-xs pointer-events-auto"
              >
                {liveUrlClean}
              </a>
            </div>
            <div className="relative block aspect-[16/10] overflow-hidden" data-dither>
              <video
                className="block aspect-[16/10] size-full object-cover"
                src={`/projects/${project.id}/reel.mp4`}
                poster={`/projects/${project.id}/reel-poster.jpg`}
                muted
                loop
                playsInline
                autoPlay
                preload="auto"
                aria-hidden="true"
                onError={(e) => {
                  const target = e.currentTarget
                  target.style.display = 'none'
                  const fallback = target.nextElementSibling as HTMLElement | null
                  if (fallback) fallback.style.display = 'block'
                }}
              />
              <div className="size-full hidden">
                {project.id === 'career-gap-analyzer' ? (
                  <CareerGapMockup currentSlide={1} />
                ) : project.id === 'branded-shortlink-bio-hub' ? (
                  <BioLinkMockup currentSlide={1} />
                ) : (
                  <MiniERPMockup currentSlide={1} />
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════
          6. SECTION 5: NEXT PROJECT TRANSITION (.case-next)
      ══════════════════════════════════════════════════════════ */}
      {nextProject && (
        <section
          className="case-next bg-grid grid-page before:bg-grid relative min-h-lvh content-start bg-(--next) pt-[14svh] pb-[18svh] text-(--next-text) before:absolute before:inset-x-0 before:bottom-[calc(100%-1px)] before:h-16 before:bg-(--next) md:h-svh md:grid-rows-[auto_1fr] md:pb-(--margin) select-none"
          style={
            {
              backgroundColor: theme.nextBg,
              color: theme.nextText,
              '--next': theme.nextBg,
              '--next-text': theme.nextText,
            } as React.CSSProperties
          }
          data-mascot="project"
          data-mascot-outfit="watchmaker"
        >
          <p className="text-current/55 col-span-4 text-sm md:col-span-12">
            Next project
          </p>
          <div className="col-span-4 mt-3 flex flex-col md:col-span-8">
            <span className="font-display block text-[clamp(3.25rem,7.5vw,8rem)] leading-[0.9] font-semibold tracking-[-0.045em] capitalize">
              {nextProject.title}
            </span>
            <div className="mt-8 md:[container-type:size] md:mt-12 md:flex-1">
              <Link to={`/work/${nextProject.id}`} className="group block md:w-[min(100cqw,150cqh)]">
                <picture
                  className="relative block aspect-[3/2] overflow-hidden rounded-[12px] border border-black/15 shadow-xl"
                  data-cover={nextProject.id}
                  data-dither
                  data-tint={theme.nextBg}
                >
                  <span className="dither absolute inset-0 translate-1.5 rounded-[12px] pointer-events-none" />
                  <img
                    src={`/projects/${nextProject.id}/desktop-1.jpg`}
                    alt={nextProject.title}
                    className="size-full! object-cover transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.04]"
                    onError={(e) => {
                      const target = e.currentTarget
                      target.src = '/projects/career-gap-analyzer/desktop-1.jpg'
                    }}
                  />
                </picture>
              </Link>
            </div>
          </div>
        </section>
      )}
    </main>
  )
}
