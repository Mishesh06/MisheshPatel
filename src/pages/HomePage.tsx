/**
 * HomePage — assembles all sections in order.
 *
 * Symmetrical 1:1 section flow matching sebg.ch:
 *   Hero → About → Featured Projects → All Work → Contact
 *
 * <main> wraps the page sections. The Navbar and Footer sit outside <main>
 * so they're accessible from any page-level landmark navigation.
 */

import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import ProjectsSection from '@/components/sections/ProjectsSection'
import AllWorkSection from '@/components/sections/AllWorkSection'
import ContactSection from '@/components/sections/ContactSection'

export default function HomePage() {
  return (
    <main id="main-content">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <AllWorkSection />
      <ContactSection />
    </main>
  )
}
