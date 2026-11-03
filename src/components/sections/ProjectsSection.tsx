/**
 * ProjectsSection — sequential full-bleed color chapter tour matching sebg.ch.
 *
 * Implements:
 *  - Direct transition from the Intro section into the first project scene
 *  - 3 Distinct solid color chapters:
 *      1. Sapphire Navy (#0a3149)
 *      2. Sunny Arcade Yellow (#ffe64e)
 *      3. Lilac Purple (#c2a7f4)
 *  - Direct flowing chapter transitions with geometric dither seams
 */

import { projects } from '@/data/content'
import ProjectScene from './ProjectScene'

export default function ProjectsSection() {
  const featuredProjects = projects.filter((p) => p.featured)

  return (
    <div id="projects" className="relative flex flex-col">
      {featuredProjects.map((project, i) => (
        <ProjectScene
          key={project.id}
          project={project}
          index={i}
          total={featuredProjects.length}
        />
      ))}
    </div>
  )
}
