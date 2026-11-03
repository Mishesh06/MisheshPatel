/**
 * NotFoundPage — custom 404 error page with playful mascot interaction.
 *
 * Implements Phase 6 specifications:
 *  - Large 404 typographical art
 *  - Playful mascot interaction (clickable expression cycling + dialogue speech balloon)
 *  - Clean return navigation back to HomePage
 *  - Theme toggle support and accessible focus rings
 *  - Reduced motion respectful animations
 */

import { useState } from 'react'
import { Link } from 'react-router'
import SebGuide from '@/components/mascot/SebGuide'
import ThemeToggle from '@/components/ui/ThemeToggle'
import Footer from '@/components/layout/Footer'
import { person } from '@/data/content'

const MASCOT_DIALOGUES: { text: string }[] = [
  {
    text: 'Whoops! Route undefined. We took a wrong turn into uncharted cyberspace.',
  },
  {
    text: 'Scanning coordinates... Nothing here but stray cosmic bits and null pointers.',
  },
  {
    text: 'Don’t worry! The portfolio headquarters is safe and sound.',
  },
  {
    text: 'Click the button below or tap me, and let’s head back to the main stage!',
  },
]

export default function NotFoundPage() {
  const [dialogueIndex, setDialogueIndex] = useState(0)

  const handleMascotClick = () => {
    setDialogueIndex((prev) => (prev + 1) % MASCOT_DIALOGUES.length)
  }

  const currentDialogue = MASCOT_DIALOGUES[dialogueIndex]

  return (
    <div className="min-h-screen bg-navy-950 text-white flex flex-col justify-between selection:bg-amber-400 selection:text-navy-950">
      {/* ── Top Bar ── */}
      <header className="px-6 md:px-12 py-5 flex items-center justify-between border-b border-white/10 bg-navy-950/80 backdrop-blur-md">
        <Link
          to="/"
          className="inline-flex items-center gap-2.5 font-display font-bold text-sm tracking-tight text-white/90 hover:text-amber-400 transition-colors"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400" />
          <span>{person.name}</span>
        </Link>

        <div className="flex items-center gap-4">
          <ThemeToggle />
          <Link
            to="/"
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/15 text-xs font-mono text-white/80 transition-colors"
          >
            ← Home
          </Link>
        </div>
      </header>

      {/* ── Central 404 Arena ── */}
      <main id="main-content" className="flex-1 flex flex-col items-center justify-center px-6 py-20 text-center relative overflow-hidden">
        {/* Ambient radial glow */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(circle 600px at 50% 50%, rgba(251,191,36,0.06) 0%, transparent 70%)',
          }}
        />

        {/* Giant Watermark 404 */}
        <p
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 font-display font-black text-white/[0.03] leading-none select-none text-[28vw] tracking-tighter"
        >
          404
        </p>

        <div className="relative z-10 max-w-lg mx-auto flex flex-col items-center">
          {/* ── Mascot with Speech Balloon Interaction ── */}
          <div className="mb-8 flex flex-col items-center">
            {/* Dynamic Speech Bubble */}
            <div
              className="relative mb-4 px-5 py-3 rounded-2xl bg-navy-900 border border-amber-400/40 text-xs font-mono text-amber-200 shadow-xl max-w-xs transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
              role="status"
              aria-live="polite"
            >
              <div className="font-bold text-[10px] text-amber-400 uppercase tracking-widest mb-1 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-ping" />
                <span>DebugBot Telemetry</span>
              </div>
              <p>{currentDialogue.text}</p>
              {/* Little speech tail */}
              <div
                aria-hidden="true"
                className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-x-8 border-x-transparent border-t-8 border-t-navy-900"
              />
            </div>

            {/* Clickable Mascot */}
            <button
              type="button"
              onClick={handleMascotClick}
              title="Click to interact with guide!"
              aria-label="Interact with guide to change dialogue"
              className="cursor-pointer select-none group relative focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full p-2 transition-transform hover:scale-105 active:scale-95"
            >
              <SebGuide size={140} isWaving={true} />
              <span className="sr-only">Click to poke guide</span>
            </button>

            <span className="font-mono text-[10px] text-white/40 uppercase tracking-widest mt-2">
              ( Tap guide avatar to speak )
            </span>
          </div>

          {/* Heading */}
          <h1 className="font-display font-black text-white text-3xl sm:text-5xl tracking-tight mb-4 leading-tight">
            Lost in the <span className="text-amber-400">digital void.</span>
          </h1>

          <p className="font-display text-white/60 text-base sm:text-lg mb-8 leading-relaxed max-w-md">
            The page you are looking for has been moved, deallocated, or never compiled into this universe.
          </p>

          {/* Return Button */}
          <Link
            to="/"
            id="return-home-button"
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-amber-400 text-navy-950 font-bold text-sm hover:bg-amber-300 active:scale-95 transition-all shadow-xl shadow-amber-400/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
          >
            <span>← Return to Safety</span>
          </Link>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  )
}
