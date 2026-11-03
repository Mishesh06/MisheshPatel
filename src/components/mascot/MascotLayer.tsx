/**
 * MascotLayer — authentic 3D WebGL Character Guide matching sebg.ch.
 *
 * Persists continuously across all routes.
 * Synchronizes 3D WebGL engine, character costumes, postures, speech bubbles,
 * and ScrollTriggers between homepage chapters and project case study pages.
 */

import { useEffect } from 'react'
import { useLocation } from 'react-router'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { initMascotEngine, refreshMascot } from './mascotEngine'

gsap.registerPlugin(ScrollTrigger)

// Homepage speech lines
const HOME_BUBBLE_LINES = [
  {
    accent: '#2261e9',
    content: (
      <>
        Hi, I'm <span className="text-(--accent)">Mishesh</span>. Scroll down and I'll show you around.
      </>
    ),
  },
  {
    accent: '#2261e9',
    returning: true,
    content: (
      <>
        Oh hi, <span className="text-(--accent)">you're back</span>. Want the tour again?
      </>
    ),
  },
  {
    accent: '#2261e9',
    hint: true,
    content: (
      <>
        Psst. You can <span className="text-(--accent)">grab</span> me.
      </>
    ),
  },
  {
    accent: '#2261e9',
    hint: true,
    content: (
      <>
        Psst. <span className="text-(--accent)">Hold</span> me to pick me up.
      </>
    ),
  },
  {
    accent: '#2261e9',
    content: (
      <>
        Write me anytime. <span className="text-(--accent)">Click</span> and it's copied.
      </>
    ),
  },
  {
    accent: '#2261e9',
    content: (
      <>
        <span className="text-(--accent)">Copied!</span> Talk soon.
      </>
    ),
  },
]

// Project case study speech lines matching sebg.ch _slug_.astro
const PROJECT_CASE_LINES: Record<
  string,
  {
    accent: string
    title: string
    clipFeature: string
    nextAccent: string
  }
> = {
  'career-gap-analyzer': {
    accent: '#b0885a',
    title: 'Career Gap Finder',
    clipFeature: 'AI career agent',
    nextAccent: '#2054e2',
  },
  'branded-shortlink-bio-hub': {
    accent: '#2054e2',
    title: 'Branded Shortlink',
    clipFeature: 'Bio Profile builder',
    nextAccent: '#2054e2',
  },
  'mini-erp-crm-portal': {
    accent: '#2054e2',
    title: 'Mini ERP Portal',
    clipFeature: 'dispatch workflow engine',
    nextAccent: '#b0885a',
  },
}

export default function MascotLayer() {
  const location = useLocation()
  const isProjectPage =
    location.pathname.startsWith('/work/') || location.pathname.startsWith('/projects/')
  const slug = isProjectPage
    ? location.pathname.replace(/^\/(work|projects)\//, '').split('/')[0]
    : ''
  const currentProjectConfig = isProjectPage
    ? PROJECT_CASE_LINES[slug] || PROJECT_CASE_LINES['career-gap-analyzer']
    : null

  // 1. Initialize persistent 3D mascot WebGL engine
  useEffect(() => {
    const cleanup = initMascotEngine()
    return () => {
      if (cleanup) cleanup()
    }
  }, [])

  // 2. Route change controller: wires up contextual ScrollTriggers & speech bubbles
  useEffect(() => {
    let triggers: ScrollTrigger[] = []

    const timer = setTimeout(() => {
      const bubbleBody = document.querySelector('.mascot-bubble__body') as HTMLElement | null
      const lines = gsap.utils.toArray<HTMLElement>('.bubble-line')

      if (!bubbleBody || !lines.length) return

      // Speech line visibility controller matching sebg.ch
      const showLine = (index: number, show: boolean) => {
        if (show) {
          lines.forEach((m, n) => {
            m.hidden = n !== index
          })
          gsap.to(bubbleBody, {
            opacity: 1,
            scale: 1,
            duration: 0.45,
            ease: 'back.out(1.7)',
            overwrite: true,
          })
        } else {
          gsap.to(bubbleBody, {
            opacity: 0,
            scale: 0.9,
            duration: 0.25,
            ease: 'power2.in',
            overwrite: true,
          })
        }
      }

      if (isProjectPage) {
        // Trigger 0: Case Hero (shows Line 0 matching sebg.ch)
        triggers.push(
          ScrollTrigger.create({
            trigger: '.case-hero',
            start: 'top bottom',
            end: 'bottom 60%',
            onToggle: ({ isActive }) => {
              showLine(0, isActive)
            },
          }),
        )

        // Trigger 1: Case Clip (shows Line 2 matching sebg.ch)
        triggers.push(
          ScrollTrigger.create({
            trigger: '.case-clip',
            start: window.innerWidth >= 768 ? 'top 25%' : 'top 60%',
            end: window.innerWidth >= 768 ? 'bottom 75%' : 'bottom 60%',
            onToggle: ({ isActive }) => {
              showLine(2, isActive)
            },
          }),
        )

        // Trigger 2: Case Next (shows Line 1 & aims at next cover matching sebg.ch)
        triggers.push(
          ScrollTrigger.create({
            trigger: '.case-next',
            start: 'top 25%',
            end: 'bottom top',
            onToggle: ({ isActive }) => {
              showLine(1, isActive)
              if (isActive) {
                const nextCover = document.querySelector('.case-next [data-cover]')
                if (nextCover) {
                  window.dispatchEvent(new CustomEvent('mascot:say', { detail: nextCover }))
                }
              }
            },
          }),
        )

        // Initially show line 0 on entrance
        showLine(0, true)
      } else {
        // Homepage Triggers
        triggers.push(
          ScrollTrigger.create({
            trigger: '#hero',
            start: 'top bottom',
            end: 'bottom 50%',
            onToggle: ({ isActive }) => showLine(0, isActive),
          }),
        )

        triggers.push(
          ScrollTrigger.create({
            trigger: '#contact',
            start: 'top 70%',
            end: 'bottom top',
            onToggle: ({ isActive }) => showLine(4, isActive),
          }),
        )

        // Initially show line 0 on homepage entrance
        showLine(0, true)
      }

      let activeSpeechTimer: gsap.core.Tween | null = null
      const handleCustomSay = (evt: Event) => {
        const custom = evt as CustomEvent<{ line: number; gesture?: string }>
        if (custom.detail) {
          const { line, gesture } = custom.detail
          showLine(line, true)
          if (gesture) {
            window.dispatchEvent(new CustomEvent('mascot:gesture', { detail: gesture }))
          }
          activeSpeechTimer?.kill()
          activeSpeechTimer = gsap.delayedCall(3.5, () => {
            const contactEl = document.querySelector('#contact')
            const isInContact =
              contactEl && contactEl.getBoundingClientRect().top < window.innerHeight * 0.8
            if (isInContact && line === 5) {
              showLine(4, true)
            } else {
              showLine(line, false)
            }
          })
        }
      }
      window.addEventListener('mascot:say:line', handleCustomSay)

      // Re-index all [data-mascot] sections & recalculate layout
      refreshMascot()
      ScrollTrigger.refresh()

      cleanupCustom = () => {
        window.removeEventListener('mascot:say:line', handleCustomSay)
        activeSpeechTimer?.kill()
      }
    }, 60)

    let cleanupCustom: (() => void) | null = null

    return () => {
      clearTimeout(timer)
      triggers.forEach((t) => t.kill())
      if (cleanupCustom) cleanupCustom()
    }
  }, [location.pathname, isProjectPage, slug])

  return (
    <div className="mascot-layer pointer-events-none fixed inset-x-0 bottom-0 z-30 h-svh w-full">
      {/* Circular Badge for reading/gallery mode */}
      <div
        className="mascot-badge pointer-events-none absolute bottom-4 left-4 z-20 size-28 md:bottom-6 md:left-6 md:size-40"
        style={{ '--paper': '#fbfbf8' } as React.CSSProperties}
        aria-hidden="true"
      >
        <div className="size-full rounded-full opacity-0"></div>
      </div>

      {/* 3D WebGL Canvas */}
      <canvas
        className="mascot pointer-events-none absolute bottom-0 left-0 z-30 h-lvh w-full [image-rendering:pixelated] [view-transition-name:mascot]"
        aria-hidden="true"
        data-look={JSON.stringify({
          hair: 'curly',
          beard: true,
          colors: {
            skin: '#fbf3ec',
            hair: '#77573d',
            beard: '#c49c74',
            sweater: '#a4ad9b',
            ink: '#0b0b0c',
            paper: '#fbfbf8',
          },
        })}
      ></canvas>

      {/* Interactive grab handle */}
      <div
        className="mascot-handle pointer-events-auto absolute top-0 left-0 z-30 cursor-grab touch-pan-y rounded-t-full select-none"
        aria-hidden="true"
      ></div>

      {/* Mascot Speech Bubble */}
      <div className="mascot-bubble pointer-events-none absolute top-0 left-0 z-40">
        <div className="mascot-bubble__body opacity-0">
          <span className="mascot-bubble__tail mascot-bubble__tail--shadow"></span>
          <span className="mascot-bubble__tail"></span>

          <div className="font-display text-[clamp(1.125rem,1.7vw,1.875rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
            {isProjectPage && currentProjectConfig ? (
              // Project Case Study Lines matching sebg.ch
              <>
                <p
                  className="bubble-line"
                  style={{ '--accent': currentProjectConfig.accent } as React.CSSProperties}
                >
                  This is{' '}
                  <span className="text-(--accent) capitalize">
                    {currentProjectConfig.title}
                  </span>
                  .
                </p>
                <p
                  className="bubble-line"
                  style={{ '--accent': currentProjectConfig.nextAccent } as React.CSSProperties}
                  hidden
                >
                  Want to see <span className="text-(--accent)">another one</span>?
                </p>
                <p
                  className="bubble-line"
                  style={{ '--accent': currentProjectConfig.accent } as React.CSSProperties}
                  hidden
                >
                  I also worked on the{' '}
                  <span className="text-(--accent)">{currentProjectConfig.clipFeature}</span>.
                </p>
              </>
            ) : (
              // Homepage Tour Lines
              HOME_BUBBLE_LINES.map((b, idx) => (
                <p
                  key={idx}
                  className="bubble-line"
                  style={{ '--accent': b.accent } as React.CSSProperties}
                  hidden={idx !== 0}
                  data-returning-line={b.returning ? 'true' : undefined}
                  data-hint-line={b.hint ? 'true' : undefined}
                >
                  {b.content}
                </p>
              ))
            )}
          </div>
        </div>

        {/* Mascot Quips */}
        <div
          className="mascot-quip font-display text-[clamp(1.125rem,1.7vw,1.875rem)] leading-[1.12] font-semibold tracking-[-0.02em] opacity-0"
          hidden={true}
        >
          <span className="mascot-bubble__tail mascot-bubble__tail--shadow"></span>
          <span className="mascot-bubble__tail"></span>
          <p data-quip="sulk" hidden={true}>
            <span className="text-blue">Hmph.</span> Not talking to you.
          </p>
          <p data-quip="laugh" hidden={true}>
            Stop, <span className="text-blue">stop</span>! I'm ticklish.
          </p>
          <p data-quip="sniffle" hidden={true}>
            Ah… <span className="text-blue">ah…</span>
          </p>
          <p data-quip="sneeze" hidden={true}>
            <span className="text-blue">Achoo!</span> Sorry.
          </p>
          <p data-quip="dance" hidden={true}>
            Nobody's <span className="text-blue">watching</span>, right?
          </p>
          <p data-quip="panic" hidden={true}>
            <span className="text-blue">Aaah!</span> Who broke prod?
          </p>
          <p data-quip="fly" hidden={true}>
            To <span className="text-blue">infinity</span>…
          </p>
          <p data-quip="hiccup" hidden={true}>
            <span className="text-blue">Hic!</span> Excuse me.
          </p>
          <p data-quip="peekaboo" hidden={true}>
            <span className="text-blue">Boo!</span>
          </p>
          <p data-quip="selfie" hidden={true}>
            Say <span className="text-blue">cheese</span>!
          </p>
          <p data-quip="vanish" hidden={true}>
            Now you <span className="text-blue">see</span> me…
          </p>
          <p data-quip="bell" hidden={true}>
            <span className="text-blue">Ding!</span> Bring it on.
          </p>
          <p data-quip="narrow" hidden={true}>
            Ooh, <span className="text-blue">mobile</span> mode.
          </p>
          <p data-quip="wide" hidden={true}>
            Back to <span className="text-blue">the big screen</span>.
          </p>
        </div>

        {/* Mascot Interactive Tricks Menu */}
        <div
          className="mascot-menu pointer-events-auto opacity-0"
          aria-label="Tricks"
          hidden={true}
        >
          <span className="mascot-bubble__tail mascot-bubble__tail--shadow"></span>
          <span className="mascot-bubble__tail"></span>
          <p className="font-display text-[clamp(1.125rem,1.7vw,1.875rem)] leading-[1.12] font-semibold tracking-[-0.02em]">
            What should I <span className="text-blue">do</span>?
          </p>
          <div className="mt-3 grid grid-cols-2 gap-x-3 md:grid-cols-3">
            {[
              ['dance', 'Dance'],
              ['punch', 'Punching bag'],
              ['panic', 'Panic'],
              ['fly', 'Fly'],
              ['vanish', 'Vanish'],
              ['hiccup', 'Hiccup'],
              ['peekaboo', 'Peekaboo'],
              ['selfie', 'Selfie'],
              ['dizzy', 'Dizzy'],
              ['sneeze', 'Sneeze'],
              ['sulk', 'Sulk'],
            ].map(([val, label]) => (
              <button
                key={val}
                type="button"
                className="hover:bg-ink hover:text-paper focus-visible:bg-ink focus-visible:text-paper -ml-2.5 cursor-pointer rounded-full px-2.5 py-0.5 text-left text-[0.9375rem] font-medium"
                value={val}
              >
                {label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mascot Hand SVG for grab/drag */}
      <div
        className="mascot-hand pointer-events-none absolute top-0 left-0 z-50"
        aria-hidden="true"
        hidden={true}
      >
        <svg className="w-full" viewBox="0 0 18 18" shapeRendering="crispEdges">
          <path
            className="fill-paper"
            d="M8 5h1v1h-1zM9 5h1v1h-1zM11 5h1v1h-1zM12 5h1v1h-1zM5 6h1v1h-1zM6 6h1v1h-1zM8 6h1v1h-1zM9 6h1v1h-1zM11 6h1v1h-1zM12 6h1v1h-1zM14 6h1v1h-1zM15 6h1v1h-1zM5 7h1v1h-1zM6 7h1v1h-1zM8 7h1v1h-1zM9 7h1v1h-1zM11 7h1v1h-1zM12 7h1v1h-1zM14 7h1v1h-1zM15 7h1v1h-1zM5 8h1v1h-1zM6 8h1v1h-1zM8 8h1v1h-1zM9 8h1v1h-1zM11 8h1v1h-1zM12 8h1v1h-1zM14 8h1v1h-1zM15 8h1v1h-1zM2 9h1v1h-1zM3 9h1v1h-1zM5 9h1v1h-1zM6 9h1v1h-1zM7 9h1v1h-1zM8 9h1v1h-1zM9 9h1v1h-1zM10 9h1v1h-1zM11 9h1v1h-1zM12 9h1v1h-1zM13 9h1v1h-1zM14 9h1v1h-1zM15 9h1v1h-1zM3 10h1v1h-1zM4 10h1v1h-1zM5 10h1v1h-1zM6 10h1v1h-1zM7 10h1v1h-1zM8 10h1v1h-1zM9 10h1v1h-1zM10 10h1v1h-1zM11 10h1v1h-1zM12 10h1v1h-1zM13 10h1v1h-1zM14 10h1v1h-1zM15 10h1v1h-1zM4 11h1v1h-1zM5 11h1v1h-1zM6 11h1v1h-1zM7 11h1v1h-1zM8 11h1v1h-1zM9 11h1v1h-1zM10 11h1v1h-1zM11 11h1v1h-1zM12 11h1v1h-1zM13 11h1v1h-1zM14 11h1v1h-1zM15 11h1v1h-1zM4 12h1v1h-1zM5 12h1v1h-1zM6 12h1v1h-1zM7 12h1v1h-1zM8 12h1v1h-1zM9 12h1v1h-1zM10 12h1v1h-1zM11 12h1v1h-1zM12 12h1v1h-1zM13 12h1v1h-1zM14 12h1v1h-1zM5 13h1v1h-1zM6 13h1v1h-1zM7 13h1v1h-1zM8 13h1v1h-1zM9 13h1v1h-1zM10 13h1v1h-1zM11 13h1v1h-1zM12 13h1v1h-1zM13 13h1v1h-1zM14 13h1v1h-1zM5 14h1v1h-1zM6 14h1v1h-1zM7 14h1v1h-1zM8 14h1v1h-1zM9 14h1v1h-1zM10 14h1v1h-1zM11 14h1v1h-1zM12 14h1v1h-1zM13 14h1v1h-1zM6 15h1v1h-1zM7 15h1v1h-1zM8 15h1v1h-1zM9 15h1v1h-1zM10 15h1v1h-1zM11 15h1v1h-1zM12 15h1v1h-1zM13 15h1v1h-1zM6 16h1v1h-1zM7 16h1v1h-1zM8 16h1v1h-1zM9 16h1v1h-1zM10 16h1v1h-1zM11 16h1v1h-1zM12 16h1v1h-1zM13 16h1v1h-1z"
          ></path>
          <path
            className="fill-ink"
            d="M8 4h1v1h-1zM9 4h1v1h-1zM11 4h1v1h-1zM12 4h1v1h-1zM5 5h1v1h-1zM6 5h1v1h-1zM7 5h1v1h-1zM10 5h1v1h-1zM13 5h1v1h-1zM14 5h1v1h-1zM15 5h1v1h-1zM4 6h1v1h-1zM7 6h1v1h-1zM10 6h1v1h-1zM13 6h1v1h-1zM16 6h1v1h-1zM4 7h1v1h-1zM7 7h1v1h-1zM10 7h1v1h-1zM13 7h1v1h-1zM16 7h1v1h-1zM2 8h1v1h-1zM3 8h1v1h-1zM4 8h1v1h-1zM7 8h1v1h-1zM10 8h1v1h-1zM13 8h1v1h-1zM16 8h1v1h-1zM1 9h1v1h-1zM4 9h1v1h-1zM16 9h1v1h-1zM2 10h1v1h-1zM16 10h1v1h-1zM3 11h1v1h-1zM16 11h1v1h-1zM3 12h1v1h-1zM15 12h1v1h-1zM4 13h1v1h-1zM15 13h1v1h-1zM4 14h1v1h-1zM14 14h1v1h-1zM5 15h1v1h-1zM14 15h1v1h-1zM5 16h1v1h-1zM14 16h1v1h-1zM5 17h1v1h-1zM6 17h1v1h-1zM7 17h1v1h-1zM8 17h1v1h-1zM9 17h1v1h-1zM10 17h1v1h-1zM11 17h1v1h-1zM12 17h1v1h-1zM13 17h1v1h-1zM14 17h1v1h-1z"
          ></path>
        </svg>
      </div>
    </div>
  )
}
