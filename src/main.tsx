/**
 * main.tsx — application entry point.
 *
 * Responsibilities:
 *  1. Register all GSAP plugins exactly ONCE here so no section file
 *     needs to call gsap.registerPlugin() itself.
 *  2. Register the useGSAP hook with GSAP (required by @gsap/react).
 *  3. Wrap the app in <ThemeProvider> so the dark/light toggle is
 *     available everywhere.
 *  4. Mount React in StrictMode.
 *
 * StrictMode renders components twice in development to catch side-effects.
 * It does NOT affect production builds.
 */

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ThemeProvider } from '@/context/ThemeContext'
import './index.css'
import App from './App.tsx'

// ── GSAP setup (one place only) ──────────────────────────────────
// 1. Tell GSAP about ScrollTrigger so it participates in the render cycle.
// 2. Register the React hook so useGSAP cleans up tweens on unmount.
gsap.registerPlugin(ScrollTrigger, useGSAP)

// ── Mount ──────────────────────────────────────────────────────────
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </StrictMode>,
)
