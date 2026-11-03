/**
 * DualDeviceMockup — desktop browser frame + overlapping 3D iPhone mockup.
 *
 * Replicates the exact stage architecture from sebg.ch:
 *  - 16:10 Desktop Browser with subtle macOS silver dots and centered URL pill
 *  - Overlapping 3D iPhone mockup angled at the lower-right corner (user specified)
 *  - Retro dither drop-shadows (var(--dither))
 *  - Synchronized vertical slide transitions (translateY(-activeSlide * 100%))
 *  - Automatic image loading from /projects/{slug}/ with high-fidelity conceptual fallback
 */

import { useState } from 'react'

interface DualDeviceMockupProps {
  slug: string
  url: string
  activeSlide: number
  desktopFallback: React.ReactNode
  mobileFallback?: React.ReactNode
}

export default function DualDeviceMockup({
  slug,
  url,
  activeSlide,
  desktopFallback,
  mobileFallback,
}: DualDeviceMockupProps) {
  // Track image load errors to gracefully show high-fidelity conceptual fallback
  const [imgError, setImgError] = useState(false)

  const desktopImages = [
    `/projects/${slug}/desktop-1.jpg`,
    `/projects/${slug}/desktop-2.jpg`,
    `/projects/${slug}/desktop-3.jpg`,
  ]

  const mobileImages = [
    `/projects/${slug}/mobile-1.jpg`,
    `/projects/${slug}/mobile-2.jpg`,
    `/projects/${slug}/mobile-3.jpg`,
  ]

  // Clean display URL like jaeger-lecoultre.com
  const displayUrl = url.replace(/^https?:\/\//, '').replace(/\/$/, '')

  return (
    <div className="tour__frame relative w-full select-none">
      {/* ══════════════════════════════════════════════════════════
          1. DESKTOP BROWSER MOCKUP (sebg.ch tour__browser)
      ══════════════════════════════════════════════════════════ */}
      <div className="relative tour__browser">
        {/* Dither Drop-Shadow */}
        <span className="dither absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[16px] pointer-events-none" />

        {/* Browser Outer Shell */}
        <div className="relative overflow-hidden rounded-[16px] border border-black/15 bg-white shadow-xl">
          {/* macOS Title Bar matching sebg.ch */}
          <div className="relative flex h-9 md:h-10 items-center border-b border-black/10 px-4 md:px-5 bg-[#fafaf8]">
            {/* 3 Soft Silver / Grey Window Dots */}
            <div className="flex items-center gap-1.5">
              <span className="size-2.5 md:size-3 rounded-full bg-[#d2d6dc] border border-black/10" />
              <span className="size-2.5 md:size-3 rounded-full bg-[#d2d6dc] border border-black/10" />
              <span className="size-2.5 md:size-3 rounded-full bg-[#d2d6dc] border border-black/10" />
            </div>

            {/* Centered URL Pill matching sebg.ch */}
            <div className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center rounded-full bg-[#eaedf0] px-4 md:px-5 py-0.5 md:py-1 text-[11px] md:text-xs font-sans text-neutral-600 tracking-normal select-none">
              <span>{displayUrl}</span>
            </div>
          </div>

          {/* Browser Viewport (16:10 aspect ratio) */}
          <div className="relative aspect-[16/10] w-full overflow-hidden bg-white">
            {!imgError ? (
              <div
                className="screens relative flex size-full flex-col transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateY(-${activeSlide * 100}%)` }}
              >
                {desktopImages.map((src, idx) => (
                  <div key={idx} className="relative size-full shrink-0 overflow-hidden bg-[#faf9f5]">
                    <img
                      src={src}
                      alt={`${slug} desktop screen ${idx + 1}`}
                      className="size-full object-cover object-top"
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      onError={() => setImgError(true)}
                    />
                  </div>
                ))}
              </div>
            ) : (
              desktopFallback
            )}
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════════
          2. OVERLAPPING 3D IPHONE MOCKUP (sebg.ch tour__phone)
             Positioned on the RIGHT side as explicitly requested
      ══════════════════════════════════════════════════════════ */}
      <div className="tour__phone absolute -right-3 sm:-right-5 md:-right-7 lg:-right-9 -bottom-8 sm:-bottom-10 md:-bottom-12 lg:-bottom-14 w-[28.5%] min-w-[145px] max-w-[240px] z-20 pointer-events-auto">
        {/* Dither Drop-Shadow for Phone */}
        <span className="dither absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-[34px] pointer-events-none" />

        {/* iPhone Body */}
        <div className="relative overflow-hidden rounded-[34px] border-[3.5px] border-[#2b2b2d] bg-[#1a1a1c] shadow-2xl p-[3px]">
          {/* Screen Container (390:844 aspect ratio) */}
          <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[28px] bg-white">
            {/* Status Bar + Dynamic Island */}
            <div className="absolute top-0 inset-x-0 h-6 z-30 flex items-center justify-between px-3 text-[9px] font-semibold text-ink bg-white/80 backdrop-blur-xs select-none">
              <span>9:41</span>
              {/* Dynamic Island */}
              <div className="h-3 w-14 md:w-16 rounded-full bg-black mx-auto" />
              {/* Signal & Battery */}
              <div className="flex items-center gap-1 text-ink">
                <svg className="h-2 w-2.5" viewBox="0 0 16 12" fill="currentColor">
                  <path d="M8 2.4c2.3 0 4.4.9 6 2.3l1.3-1.3A10.4 10.4 0 0 0 8 .5 10.4 10.4 0 0 0 .7 3.4L2 4.7a8.5 8.5 0 0 1 6-2.3Z" />
                  <path d="m8 11.5 2-2a2.9 2.9 0 0 0-4 0Z" />
                </svg>
                <div className="w-3.5 h-1.8 rounded-[2px] border border-ink p-[1px] flex items-center">
                  <div className="w-full h-full bg-ink rounded-[1px]" />
                </div>
              </div>
            </div>

            {/* Mobile App Bar Header matching sebg.ch */}
            <div className="absolute top-6 inset-x-0 h-6 z-20 flex items-center justify-between px-2.5 border-b border-black/5 bg-[#faf9f5] text-black/70 select-none">
              {/* Hamburger */}
              <div className="flex flex-col gap-0.5 w-3">
                <span className="h-[1.5px] w-full bg-black/70 rounded-full" />
                <span className="h-[1.5px] w-2 bg-black/70 rounded-full" />
              </div>
              {/* Centered Site Brand */}
              <span className="font-display font-bold text-[9px] tracking-tight truncate max-w-[80px]">
                {slug === 'career-gap-analyzer' ? 'Career Gap' : displayUrl.split('.')[0]}
              </span>
              {/* Search & Bag Icons */}
              <div className="flex items-center gap-1.5 text-black/60">
                <svg className="size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <svg className="size-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z" />
                  <line x1="3" x2="21" y1="6" y2="6" />
                  <path d="M16 10a4 4 0 0 1-8 0" />
                </svg>
              </div>
            </div>

            {/* Mobile Screen Slides */}
            {!imgError ? (
              <div
                className="screens relative flex size-full flex-col pt-12 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateY(-${activeSlide * 100}%)` }}
              >
                {mobileImages.map((src, idx) => (
                  <div key={idx} className="size-full shrink-0 overflow-hidden bg-white">
                    <img
                      src={src}
                      alt={`${slug} mobile screen ${idx + 1}`}
                      className="size-full object-cover object-top"
                      loading="lazy"
                      onError={() => {}}
                    />
                  </div>
                ))}
              </div>
            ) : mobileFallback ? (
              <div
                className="screens relative flex size-full flex-col pt-12 transition-transform duration-700 ease-[cubic-bezier(0.25,1,0.5,1)]"
                style={{ transform: `translateY(-${activeSlide * 100}%)` }}
              >
                {mobileFallback}
              </div>
            ) : (
              /* High-fidelity mobile simulated preview fallback */
              <div className="pt-14 px-3 flex flex-col items-center justify-center text-center size-full bg-[#fdfdfc]">
                <div className="size-8 rounded-full bg-ink/5 border border-ink/10 flex items-center justify-center mb-2 shadow-xs">
                  <span className="font-mono text-[10px] font-bold text-ink">AI</span>
                </div>
                <p className="font-display font-bold text-[11px] text-ink leading-tight line-clamp-1">{displayUrl}</p>
                <span className="mt-2 text-[8px] font-mono font-medium text-ink/70 bg-ink/5 px-2.5 py-0.5 rounded-full border border-ink/5">
                  Slide {activeSlide + 1} / 3
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
