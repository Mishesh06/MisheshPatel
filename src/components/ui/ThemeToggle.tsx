/**
 * ThemeToggle — animated sun / moon button.
 *
 * Accessibility:
 *  - <button> with a descriptive aria-label that updates with the active theme.
 *  - Visible focus ring inherited from index.css :focus-visible.
 *  - The SVG icons are aria-hidden; the label carries the meaning.
 *
 * Animation:
 *  - CSS transition on opacity + scale for the icon swap (no GSAP needed;
 *    keep GSAP for scroll-driven and complex sequences only).
 */

import { useTheme } from '@/context/ThemeContext'

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  const isDark = theme === 'dark'

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="
        relative w-9 h-9 rounded-full flex items-center justify-center
        border border-white/10 dark:border-white/10
        bg-navy-800/60 dark:bg-navy-800/60
        text-amber-400 dark:text-amber-400
        hover:border-amber-400/50 hover:bg-amber-400/10
        transition-all duration-200
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2
        focus-visible:ring-offset-transparent
      "
    >
      {/* Sun icon — shown in light mode */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isDark ? 'opacity-0 scale-50 rotate-90' : 'opacity-100 scale-100 rotate-0'
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 stroke-current fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1"  x2="12" y2="3"  />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22"   x2="5.64" y2="5.64"   />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1"  y1="12" x2="3"  y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78"  x2="5.64" y2="18.36"  />
          <line x1="18.36" y1="5.64"  x2="19.78" y2="4.22"  />
        </svg>
      </span>

      {/* Moon icon — shown in dark mode */}
      <span
        aria-hidden="true"
        className={`absolute inset-0 flex items-center justify-center transition-all duration-300 ${
          isDark ? 'opacity-100 scale-100 rotate-0' : 'opacity-0 scale-50 -rotate-90'
        }`}
      >
        <svg viewBox="0 0 24 24" className="w-4.5 h-4.5 stroke-current fill-none stroke-2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      </span>
    </button>
  )
}

