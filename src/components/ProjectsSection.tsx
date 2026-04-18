import { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { motion, useReducedMotion } from '../lib/motion'
import AnimatedSection from './AnimatedSection'
import SectionBackground from './SectionBackground'

interface ProjectItem {
  title: string
  description: string
  techStack: string[]
  imageUrl?: string
  imageAlt?: string
  links?: readonly { label: string; url: string }[]
}

interface ProjectCardProps {
  project: ProjectItem
}

// Compositor-thread safe: only transform (scale) and opacity animated.
const projectLinkVariants = {
  rest: { scale: 1, opacity: 1 },
  hover: { scale: 1.08, opacity: 0.85 },
  tap: { scale: 0.96 },
}

function ProjectCard({ project }: ProjectCardProps) {
  const shouldReduceMotion = useReducedMotion()
  const [imgError, setImgError] = useState(false)

  const showImage = project.imageUrl && !imgError

  return (
    <div className="project-card flex h-full min-w-0 flex-col overflow-hidden rounded-2xl border border-primary/30 bg-surface">
      {/* Visual area */}
      <div
        data-testid="project-visual-area"
        className="project-media h-40 overflow-hidden rounded-t-2xl"
      >
        {showImage ? (
          <motion.img
            data-testid="project-image"
            src={project.imageUrl}
            alt={project.imageAlt ?? project.title}
            className="object-cover w-full h-full"
            initial={shouldReduceMotion ? false : { opacity: 0, scale: 0.98 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1, scale: 1 }}
            transition={{ duration: 0.55, ease: 'easeOut' }}
            onError={() => setImgError(true)}
          />
        ) : (
          <div
            data-testid="project-placeholder"
            className="w-full h-full relative overflow-hidden"
            style={{ background: 'var(--color-surface, #141414)' }}
          >
            {/* Subtle code-themed SVG background */}
            <svg
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              className="absolute inset-0 w-full h-full"
              preserveAspectRatio="xMidYMid slice"
              viewBox="0 0 400 160"
            >
              {/* Grid dots */}
              {Array.from({ length: 9 }).map((_, col) =>
                Array.from({ length: 4 }).map((_, row) => (
                  <circle
                    key={`${col}-${row}`}
                    cx={40 + col * 40}
                    cy={20 + row * 40}
                    r={1.5}
                    fill="#00d4ff"
                    opacity={0.15}
                  />
                ))
              )}
              {/* Code lines — simulating a code editor */}
              {/* Line 1: function declaration */}
              <rect x="32" y="44" width="12" height="4" rx="2" fill="#7c3aed" opacity="0.6" />
              <rect x="50" y="44" width="40" height="4" rx="2" fill="#00d4ff" opacity="0.5" />
              <rect x="96" y="44" width="8" height="4" rx="2" fill="#e2e8f0" opacity="0.25" />
              {/* Line 2: indented */}
              <rect x="48" y="56" width="24" height="4" rx="2" fill="#a855f7" opacity="0.5" />
              <rect x="78" y="56" width="56" height="4" rx="2" fill="#e2e8f0" opacity="0.2" />
              <rect x="140" y="56" width="16" height="4" rx="2" fill="#00d4ff" opacity="0.4" />
              {/* Line 3: indented */}
              <rect x="48" y="68" width="32" height="4" rx="2" fill="#e2e8f0" opacity="0.15" />
              <rect x="86" y="68" width="48" height="4" rx="2" fill="#a855f7" opacity="0.4" />
              {/* Line 4: closing + comment */}
              <rect x="32" y="80" width="8" height="4" rx="2" fill="#e2e8f0" opacity="0.25" />
              <rect x="56" y="80" width="72" height="4" rx="2" fill="#64748b" opacity="0.4" />
              {/* Line 5: another block */}
              <rect x="32" y="96" width="16" height="4" rx="2" fill="#7c3aed" opacity="0.6" />
              <rect x="54" y="96" width="28" height="4" rx="2" fill="#00d4ff" opacity="0.45" />
              <rect x="88" y="96" width="10" height="4" rx="2" fill="#e2e8f0" opacity="0.2" />
              {/* Line 6 */}
              <rect x="48" y="108" width="20" height="4" rx="2" fill="#a855f7" opacity="0.35" />
              <rect x="74" y="108" width="44" height="4" rx="2" fill="#e2e8f0" opacity="0.15" />
              {/* Terminal cursor blink indicator */}
              <rect x="32" y="120" width="8" height="4" rx="1" fill="#00d4ff" opacity="0.7" />
              {/* Bracket decorations */}
              <text x="340" y="90" fontSize="48" fontFamily="monospace" fill="#00d4ff" opacity="0.06" fontWeight="bold">{'{'}</text>
              <text x="360" y="130" fontSize="32" fontFamily="monospace" fill="#7c3aed" opacity="0.08" fontWeight="bold">{'}'}</text>
            </svg>
            {/* Gradient overlay for depth */}
            <div
              className="absolute inset-0"
              style={{
                background: 'linear-gradient(135deg, rgba(0,212,255,0.05) 0%, transparent 60%, rgba(124,58,237,0.08) 100%)',
              }}
            />
          </div>
        )}
      </div>
      {/* Card body */}
      <div className="project-body flex min-w-0 flex-1 flex-col gap-4 px-6 pb-6 pt-5">
        <h3 className="project-title text-xl font-semibold text-text">{project.title}</h3>
        <p className="project-description text-sm leading-relaxed text-muted">{project.description}</p>
        <div className="project-chips mt-auto flex flex-wrap gap-2">
          {project.techStack.map((tech) => (
            <span
              key={tech}
              className="project-chip rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-text"
            >
              {tech}
            </span>
          ))}
        </div>
        {project.links && project.links.length > 0 && (
          <div className="project-links flex flex-wrap gap-3 pt-2">
            {project.links.map((link) => (
              <motion.a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="project-link rounded text-sm font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                variants={shouldReduceMotion ? undefined : projectLinkVariants}
                initial="rest"
                whileHover="hover"
                whileTap="tap"
                transition={{ duration: 0.15 }}
              >
                {link.label}
              </motion.a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default function ProjectsSection() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true }) as ProjectItem[]

  return (
    <section
      id="projects"
      aria-label="Projects"
      className="projects-shell relative flex h-full min-h-full w-full items-center justify-center overflow-hidden"
    >
      <SectionBackground variant="projects" />
      <div className="projects-inner section-shell relative z-10 mx-auto w-full max-w-6xl px-4 text-center">
        <AnimatedSection className="projects-content w-full">
          <h2 className="section-heading text-3xl md:text-4xl font-bold text-text mb-10">
            {t('projects.sectionTitle')}
          </h2>
          <div className="projects-grid grid auto-rows-fr grid-cols-1 gap-6 text-left md:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
