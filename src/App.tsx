import { BrowserRouter, Routes, Route } from 'react-router'
import { Analytics } from '@vercel/analytics/react'
import MascotLayer from '@/components/mascot/MascotLayer'
import SoundToggle from '@/components/ui/SoundToggle'
import HomePage from '@/pages/HomePage'
import ProjectCaseStudyPage from '@/pages/ProjectCaseStudyPage'
import NotFoundPage from '@/pages/NotFoundPage'

/**
 * App — root routing shell.
 *
 * Persistent Global MascotLayer & SoundToggle mounted across all routes,
 * matching sebg.ch where the 3D character guides the visitor through both
 * the homepage chapters and the individual case study project pages.
 */
export default function App() {
  return (
    <BrowserRouter>
      <Analytics />
      <MascotLayer />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/work/:slug" element={<ProjectCaseStudyPage />} />
        <Route path="/projects/:slug" element={<ProjectCaseStudyPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      <SoundToggle />
    </BrowserRouter>
  )
}
