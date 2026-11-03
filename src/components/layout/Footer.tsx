/**
 * Footer — distinctive architectural closing anchor.
 *
 * Implements Phase 6 specifications:
 *  - Distinctive visual styling complementing the dark final scene
 *  - High-contrast typography & clean monospace telemetry
 *  - Operational status indicator (SYSTEMS ONLINE // 2026)
 *  - Primary navigation links
 *  - Verified external profiles (GitHub, LinkedIn, Mail)
 *  - Accessible Back-To-Top button with smooth scrolling
 *  - Accessible focus states & semantic markup
 */

import { person, navLinks } from '@/data/content'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer
      aria-label="Site footer"
      className="relative bg-navy-950 border-t border-white/10 px-6 md:px-12 lg:px-20 pt-16 pb-12 overflow-hidden"
    >
      {/* Decorative hairline grid */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgba(255,255,255,0.7) 1px, transparent 1px)',
          backgroundSize: '120px 100%',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* ── Top Status Strip ── */}
        <div className="flex flex-wrap items-center justify-between gap-4 pb-8 mb-12 border-b border-white/[0.08] text-xs font-mono text-white/40">
          <div className="flex items-center gap-2.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400" />
            <span className="text-white/70">PORTFOLIO PROTOCOL // RELEASE v4.2</span>
          </div>

          <div className="flex items-center gap-6">
            <span>REGION: ASIA-SOUTH1</span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline">ZERO TRACKERS</span>
          </div>
        </div>

        {/* ── Main Footer Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          {/* Col 1 (5 cols): Identity & Philosophy */}
          <div className="md:col-span-5 space-y-4">
            <a
              href="/"
              aria-label={`${person.name} — return to top`}
              className="inline-flex items-center gap-3 group"
            >
              <span className="w-8 h-8 rounded-xl bg-navy-900 border border-amber-400/30 flex items-center justify-center group-hover:border-amber-400 transition-colors">
                <span className="w-3 h-1.5 rounded-full bg-amber-400" />
              </span>
              <span className="font-display font-black text-xl text-white tracking-tight group-hover:text-amber-400 transition-colors">
                {person.name}
              </span>
            </a>

            <p className="font-display text-white/60 text-sm leading-relaxed max-w-sm">
              {person.role}. Focused on building intelligent machine learning systems, high-throughput microservices, and human-centric software.
            </p>
          </div>

          {/* Col 2 (4 cols): Navigation Index */}
          <div className="md:col-span-4">
            <div className="font-mono text-xs uppercase tracking-widest text-amber-400/80 mb-4">
              Navigation Index
            </div>
            <nav aria-label="Footer Navigation">
              <ul className="grid grid-cols-2 gap-y-2.5 gap-x-4 list-none m-0 p-0">
                {navLinks.map((link) => (
                  <li key={link.href}>
                    <a
                      href={link.href}
                      className="font-mono text-xs text-white/60 hover:text-amber-400 transition-colors duration-200 inline-flex items-center gap-1.5 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-amber-400"
                    >
                      <span className="text-white/20">/</span>
                      <span>{link.label}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>

          {/* Col 3 (3 cols): Connect & Return to Top */}
          <div className="md:col-span-3 flex flex-col justify-between items-start md:items-end">
            <div>
              <div className="font-mono text-xs uppercase tracking-widest text-amber-400/80 mb-4 md:text-right">
                Connect
              </div>
              <div className="flex items-center gap-3">
                {person.github && (
                  <a
                    href={person.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub profile"
                    className="w-10 h-10 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center text-white/60 hover:text-amber-400 hover:border-amber-400/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  </a>
                )}
                {person.linkedin && (
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn profile"
                    className="w-10 h-10 rounded-full bg-navy-900 border border-white/10 flex items-center justify-center text-white/60 hover:text-amber-400 hover:border-amber-400/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400"
                  >
                    <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>

            {/* Back to Top Button */}
            <button
              type="button"
              onClick={scrollToTop}
              id="footer-back-to-top"
              aria-label="Back to top of page"
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-navy-900 border border-white/10 text-xs font-mono text-white/70 hover:text-amber-400 hover:border-amber-400/50 transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 active:scale-95"
            >
              <span>Back to Top</span>
              <span aria-hidden="true">↑</span>
            </button>
          </div>
        </div>

        {/* ── Bottom Signature Bar ── */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-white/30">
          <div>
            © {currentYear} {person.name}. All rights reserved.
          </div>
          <div>
            Designed &amp; Engineered with React, TypeScript &amp; GSAP.
          </div>
        </div>
      </div>
    </footer>
  )
}
