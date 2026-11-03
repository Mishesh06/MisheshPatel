/**
 * Navbar — exact match for the header of https://www.sebg.ch/
 *
 * Implements:
 *  - Authentic sebg.ch typography: bold author brand on top, large regular role beneath
 *  - Same vertical alignment, location, and margin padding (--margin)
 *  - Exact "Get in touch ↓" pill button with crisp solid comic drop-shadow & border
 *  - Accessible landmark and skip link
 */

import { person } from '@/data/content'

export default function Navbar() {
  return (
    <>
      {/* Skip-to-content for keyboard/screen-reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                   focus:px-5 focus:py-2.5 focus:rounded-full focus:bg-ink focus:text-paper
                   focus:font-semibold focus:text-sm shadow-xl"
      >
        Skip to main content
      </a>

      <header
        className="w-full flex items-start justify-between z-20 select-none"
        style={{
          paddingInline: 'var(--margin)',
          paddingTop: 'clamp(2rem, 3.2vw, 2.75rem)',
        }}
      >
        {/* Left: Brand Identity matching Sébastien Graf / Frontend developer */}
        <a
          href="#hero"
          aria-label={`${person.name} — return to top`}
          className="flex flex-col leading-tight group text-inherit focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white rounded-sm"
        >
          <span className="font-display font-bold text-[clamp(1.75rem,2.8vw,2.35rem)] text-white tracking-[-0.02em] leading-[1.08] transition-opacity duration-200 group-hover:opacity-95">
            {person.name}
          </span>
          <span className="font-display font-normal text-[clamp(1.25rem,2vw,1.75rem)] text-white tracking-[-0.015em] leading-[1.12] mt-1 transition-opacity">
            AI/ML Developer
          </span>
        </a>

        {/* Right Action: "Get in touch ↓" matching sebg.ch exact .button component */}
        <a
          href="#contact"
          className="button group pointer-events-auto shrink-0 select-none cursor-pointer"
        >
          <span>Get in touch</span>
          <svg
            className="size-3.5 transition-transform duration-150 group-hover:translate-y-1 shrink-0"
            viewBox="0 0 14 14"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            aria-hidden="true"
          >
            <path d="M7 1v12m0 0 5-5m-5 5L2 8" />
          </svg>
        </a>
      </header>
    </>
  )
}
