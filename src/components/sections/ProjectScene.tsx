/**
 * ProjectScene — synchronized multi-screen chapter matching sebg.ch tour architecture.
 *
 * Implements:
 *  - Big, solid white content box matching sebg.ch:
 *      Large rounded corners (rounded-[30px] md:rounded-[36px])
 *      Substantial height (min-h-[190px] md:min-h-[220px]) with flex centering (justify-center)
 *      Generous horizontal padding (px-8 sm:px-10 md:px-12 lg:px-14) preventing any corner clipping
 *      Pure opaque white background (bg-white text-black) with sharp 8px solid black drop-shadow (shadow-[8px_8px_0px_#000000])
 *      Clean borderless card with NO internal dots and NO triangular tail
 *      Large, confident display typography (text-[clamp(1.15rem,1.7vw,1.65rem)]) with warm bronze accent (#b0885a)
 *  - Title & "View project →" bar aligned with the desktop browser frame (matching sebg.ch Jaeger-LeCoultre):
 *      Left edge of title aligns flush with left edge of desktop browser
 *      Right edge of "View project →" pill aligns flush with right edge of desktop browser
 *      Tight vertical gap between title bar and mockup
 *      Only "View project →" pill button; NO GitHub button
 *  - Pinned Stage:
 *      Right side mockup and title bar pinned steadily in viewport across 260vh scroll runway
 *  - Upward-scrolling Dialogue Column:
 *      Speech bubbles start at comfortable middle-upper position (top: ~28vh) above mascot
 *      When user scrolls down, the active bubble scrolls UPWARDS
 *      Active bubble: solid pure white card with crisp 8px drop-shadow
 *      Inactive bubbles: translucent ghosted silhouette, scrolling smoothly behind the mascot
 *  - Synchronized DualDeviceMockup screen slide transitions driven by active bubble
 *  - Web Audio pop sound cues & mascot pointing/gesturing on slide change
 *  - Physical velocity skewing on speech bubbles
 */

import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import DualDeviceMockup from '@/components/ui/DualDeviceMockup'
import CareerGapMockup from '@/components/ui/mockups/CareerGapMockup'
import BioLinkMockup from '@/components/ui/mockups/BioLinkMockup'
import MiniERPMockup from '@/components/ui/mockups/MiniERPMockup'
import { useReducedMotion } from '@/hooks/useReducedMotion'
import { sound } from '@/utils/sound'
import type { Project } from '@/data/content'

gsap.registerPlugin(ScrollTrigger)

// Color configs matching sebg.ch chapters
const CHAPTER_CONFIGS = [
  {
    bg: 'bg-[#0a3149]',
    textColor: 'text-white',
    accentColor: '#b0885a', // warm bronze matching sebg.ch
    inactiveBubble: 'bg-white/10 text-white/40 border-white/15',
    isDark: true,
  },
  {
    bg: 'bg-[#ffe64e]',
    textColor: 'text-ink',
    accentColor: '#2054e2',
    inactiveBubble: 'bg-black/5 text-black/40 border-black/10',
    isDark: false,
  },
  {
    bg: 'bg-[#c2a7f4]',
    textColor: 'text-ink',
    accentColor: '#2054e2',
    inactiveBubble: 'bg-black/5 text-black/40 border-black/10',
    isDark: false,
  },
]

// Authentic first-person speech lines matching sebg.ch narrative style
interface BubbleData {
  content: React.ReactNode
}

const PROJECT_BUBBLES: Record<string, BubbleData[]> = {
  'career-gap-analyzer': [
    {
      content: (
        <>
          This is <span className="font-bold text-[#b0885a]">Career Gap Finder</span>. I engineered this to prove that a career break is not a deal-breaker.
        </>
      ),
    },
    {
      content: (
        <>
          Inside the candidate dashboard: an active <span className="font-bold text-[#b0885a]">AI Job Agent</span> auto-scrapes gap-friendly openings from LinkedIn, Indeed, and Naukri.
        </>
      ),
    },
    {
      content: (
        <>
          I also worked on the <span className="font-bold text-[#b0885a]">Super Admin analytics</span> dashboard. This one tracks student cohorts.
        </>
      ),
    },
  ],
  'branded-shortlink-bio-hub': [
    {
      content: (
        <>
          Next up: <span className="font-bold text-[#2054e2]">Branded Shortlink</span>. A high-throughput redirection engine and dynamic bio-link platform.
        </>
      ),
    },
    {
      content: (
        <>
          Under the hood: <span className="font-bold text-[#2054e2]">Redis edge caching</span> resolves custom vanity URLs with sub-15ms latency and live telemetry.
        </>
      ),
    },
    {
      content: (
        <>
          I also built the dynamic <span className="font-bold text-[#2054e2]">Bio Profile builder</span>. This one loads with zero third-party script bloat.
        </>
      ),
    },
  ],
  'mini-erp-crm-portal': [
    {
      content: (
        <>
          Last one: <span className="font-bold text-[#2054e2]">Mini ERP Portal</span>. An operations portal built for manufacturing and multi-warehouse distribution.
        </>
      ),
    },
    {
      content: (
        <>
          No more messy spreadsheets: <span className="font-bold text-[#2054e2]">live SKU audits</span> monitor bin levels across warehouses with audited stock movements.
        </>
      ),
    },
    {
      content: (
        <>
          I also automated the <span className="font-bold text-[#2054e2]">dispatch workflow</span>. This one coordinates sequential delivery challans and client credit lines.
        </>
      ),
    },
  ],
}

interface ProjectSceneProps {
  project: Project
  index: number
  total?: number
}

export default function ProjectScene({ project, index }: ProjectSceneProps) {
  const chapterRef  = useRef<HTMLElement>(null)
  const stageRef    = useRef<HTMLDivElement>(null)
  const titleRef    = useRef<HTMLHeadingElement>(null)
  const mockupRef   = useRef<HTMLDivElement>(null)
  const bubblesRef  = useRef<HTMLDivElement>(null)
  const [activeSlide, setActiveSlide] = useState(0)
  const reduced     = useReducedMotion()

  const config = CHAPTER_CONFIGS[index % CHAPTER_CONFIGS.length]
  const isEven = index % 2 === 0

  const bubbles = PROJECT_BUBBLES[project.id] || [
    {
      content: <>This is <span className="font-bold text-[#b0885a]">{project.title}</span>. {project.description}</>,
    },
    {
      content: <>Key architectural feature: <span className="font-bold text-[#b0885a]">High Performance</span>.</>,
    },
    {
      content: <>I also worked on the analytics. This one fits.</>,
    },
  ]

  useGSAP(
    () => {
      if (reduced) return
      const chapter = chapterRef.current
      const stage = stageRef.current
      if (!chapter || !stage) return

      // Helper to point mascot at mockup
      const pointAtMockup = () => {
        if (mockupRef.current) {
          window.dispatchEvent(new CustomEvent('mascot:say', { detail: mockupRef.current }))
        }
      }

      // 1. JAEGER-LECOULTRE TITLE ENTRANCE ANIMATION MATCHING SEBG.CH
      if (titleRef.current) {
        gsap.fromTo(
          titleRef.current,
          { y: 40, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 0.85,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: chapter,
              start: 'top 75%',
              toggleActions: 'play none none reverse',
            },
          },
        )
      }

      // Point mascot when entering chapter
      ScrollTrigger.create({
        trigger: chapter,
        start: 'top 60%',
        end: 'bottom 40%',
        onEnter: pointAtMockup,
        onEnterBack: pointAtMockup,
      })

      // 2. PIN THE STAGE (Mockup & Title) firmly in the viewport
      const pinST = ScrollTrigger.create({
        trigger: chapter,
        start: 'top top',
        end: 'bottom bottom',
        pin: stage,
        pinSpacing: false,
      })

      // 3. SYNCHRONIZE EACH SCROLLING BUBBLE WITH MOCKUP SLIDES
      const bubbleElems = bubblesRef.current?.querySelectorAll<HTMLElement>('.project-speech-bubble')
      const bubbleTriggers: ScrollTrigger[] = []

      bubbleElems?.forEach((bubble, stepIndex) => {
        const trigger = ScrollTrigger.create({
          trigger: bubble,
          start: 'top 55%',
          end: 'bottom 45%',
          onEnter: () => {
            setActiveSlide(stepIndex)
            sound.playPop(440 + stepIndex * 80)
            pointAtMockup()
            const gesture = stepIndex === 1 ? 'think' : stepIndex === 2 ? 'thumbs' : 'wave'
            window.dispatchEvent(new CustomEvent('mascot:gesture', { detail: gesture }))
          },
          onEnterBack: () => {
            setActiveSlide(stepIndex)
            sound.playPop(440 + stepIndex * 80)
            pointAtMockup()
            const gesture = stepIndex === 1 ? 'think' : stepIndex === 2 ? 'thumbs' : 'wave'
            window.dispatchEvent(new CustomEvent('mascot:gesture', { detail: gesture }))
          },
        })
        bubbleTriggers.push(trigger)
      })

      // 4. VELOCITY SKEW on bubbles matching sebg.ch
      const skewSetter = gsap.quickSetter('.project-speech-bubble', 'skewY', 'deg')
      const skewST = ScrollTrigger.create({
        trigger: chapter,
        start: 'top bottom',
        end: 'bottom top',
        onUpdate: (self) => {
          const skew = gsap.utils.clamp(-6, 6, self.getVelocity() / -350)
          skewSetter(skew)
        },
      })

      return () => {
        pinST.kill()
        bubbleTriggers.forEach((t) => t.kill())
        skewST.kill()
      }
    },
    { scope: chapterRef },
  )

  const desktopFallback =
    project.id === 'career-gap-analyzer' ? (
      <CareerGapMockup currentSlide={activeSlide} />
    ) : project.id === 'branded-shortlink-bio-hub' ? (
      <BioLinkMockup currentSlide={activeSlide} />
    ) : (
      <MiniERPMockup currentSlide={activeSlide} />
    )

  return (
    <section
      id={`project-${project.id}`}
      ref={chapterRef}
      data-mascot={isEven ? 'left' : 'right'}
      className={`tour__chapter relative ${config.bg} ${config.textColor} bg-grid w-full min-h-[260vh]`}
      data-dark={config.isDark ? 'true' : 'false'}
    >
      {/* ── Geometric Dither Seam from previous section ── */}
      <span className="section-seam text-black/20" />

      {/* ── 1. PINNED STAGE (Holds the Title Bar & Mockup pinned in viewport) ── */}
      <div
        ref={stageRef}
        className="sticky top-0 h-svh w-full pointer-events-none z-10 overflow-hidden flex flex-col justify-center"
      >
        <div className="grid-page h-full w-full items-center relative pt-12 md:pt-14 pb-6">
          {/* Spacer for Mascot / Speech Bubble Column */}
          <div
            className={`col-span-4 md:col-span-5 ${
              isEven ? 'md:col-start-1 md:order-1' : 'md:col-start-8 md:order-2'
            } hidden md:block pointer-events-none`}
          />

          {/* Right Column: Title Bar & Dual Device Mockup Frame matching sebg.ch layout */}
          <div
            className={`col-span-4 md:col-span-7 ${
              isEven ? 'md:col-start-6 md:order-2' : 'md:col-start-1 md:order-1'
            } flex flex-col justify-center h-full pointer-events-auto`}
          >
            {/* Wrapper matching exact width of the browser mockup */}
            <div className="w-full max-w-4xl lg:max-w-[840px] xl:max-w-[880px] mx-auto md:mx-0">
              {/* Title Bar matching sebg.ch: Flush left title + Flush right "View project →" pill */}
              <div className="flex flex-wrap items-end justify-between gap-x-6 gap-y-5 w-full mb-5 md:mb-7 select-none">
                <div className="overflow-hidden pb-1">
                  <h2
                    ref={titleRef}
                    className={`font-display font-semibold text-[2.25rem] leading-[0.9] tracking-[-0.025em] md:text-[min(7vw-1.6rem,5.5rem)] ${config.textColor}`}
                  >
                    {project.title}
                  </h2>
                </div>

                {/* ONLY "View project →" pill button matching sebg.ch exact design */}
                <Link
                  to={`/work/${project.id}`}
                  className="button group pointer-events-auto shrink-0 select-none"
                >
                  <span>View project</span>
                  <svg
                    className="size-3.5 transition-transform duration-150 group-hover:translate-x-1 shrink-0"
                    viewBox="0 0 14 14"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    aria-hidden="true"
                  >
                    <path d="M1 7h12m0 0-5-5m5 5-5 5" />
                  </svg>
                </Link>
              </div>

              {/* DualDeviceMockup Frame */}
              <div ref={mockupRef} className="w-full">
                <DualDeviceMockup
                  slug={project.id}
                  url={project.liveUrl || `${project.id}.mishesh.dev`}
                  activeSlide={activeSlide}
                  desktopFallback={desktopFallback}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 2. SCROLLING DIALOGUE COLUMN (Flows UPWARDS across pinned stage) ── */}
      <div className="grid-page relative pointer-events-none -mt-[100svh] z-10">
        <div
          ref={bubblesRef}
          className={`col-span-4 md:col-span-5 ${
            isEven ? 'md:col-start-1 md:order-1' : 'md:col-start-8 md:order-2'
          } flex flex-col pt-[26vh] pb-[40vh] gap-[45vh]`}
        >
          {bubbles.map((bubble, stepIdx) => {
            const isActive = activeSlide === stepIdx
            return (
              <div
                key={stepIdx}
                className={`project-speech-bubble relative pointer-events-auto w-full max-w-[560px] md:max-w-[620px] lg:max-w-[660px] min-h-[145px] md:min-h-[165px] flex flex-col justify-center rounded-[32px] md:rounded-[38px] px-10 sm:px-12 md:px-14 py-7 md:py-8 transition-all duration-300 select-none ${
                  isActive
                    ? 'bg-white text-black border-[2px] border-black shadow-[6px_6px_0px_#000000] scale-100 opacity-100 z-20'
                    : `${config.inactiveBubble} border backdrop-blur-xs scale-95 opacity-20 z-10`
                }`}
                style={isActive ? { backgroundColor: '#ffffff', color: '#000000' } : undefined}
              >
                <p className="font-display text-[clamp(1.15rem,1.5vw,1.55rem)] leading-[1.3] font-medium tracking-[-0.015em] text-black">
                  {bubble.content}
                </p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
