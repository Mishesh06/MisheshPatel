/**
 * useReducedMotion — returns true if the user has requested reduced motion.
 *
 * Why a hook instead of a module-level constant?
 * The matchMedia result can change at runtime (user changes OS setting).
 * Using useState + useEffect lets React re-render if that happens.
 *
 * Usage:
 *   const reduced = useReducedMotion()
 *   if (reduced) return   // skip all GSAP
 */

import { useState, useEffect } from 'react'

export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches)
    mql.addEventListener('change', handler)
    return () => mql.removeEventListener('change', handler)
  }, [])

  return reduced
}
