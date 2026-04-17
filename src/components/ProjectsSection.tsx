import { useTranslation } from 'react-i18next'
import AnimatedSection from './AnimatedSection'

interface ProjectItem {
  title: string
  description: string
  techStack: string[]
  links?: { label: string; url: string }[]
}

interface ProjectCardProps {
  project: ProjectItem
}

function ProjectCard({ project }: ProjectCardProps) {
  return (
    <div className="bg-surface border border-primary/30 rounded-2xl p-6 flex flex-col gap-4">
      <h3 className="text-xl font-semibold text-text">{project.title}</h3>
      <p className="text-muted text-sm leading-relaxed">{project.description}</p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {project.techStack.map((tech) => (
          <span
            key={tech}
            className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-text text-xs font-medium"
          >
            {tech}
          </span>
        ))}
      </div>
      {project.links && project.links.length > 0 && (
        <div className="flex gap-3 pt-2">
          {project.links.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary text-sm font-medium hover:underline"
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default function ProjectsSection() {
  const { t } = useTranslation()
  const projects = t('projects.items', { returnObjects: true }) as ProjectItem[]

  return (
    <section id="projects" className="min-h-screen flex items-center justify-center px-4">
      <div className="max-w-4xl w-full mx-auto text-center">
        <AnimatedSection>
          <h2 className="text-3xl md:text-4xl font-bold text-text mb-10">
            {t('projects.sectionTitle')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
            {projects.map((project) => (
              <ProjectCard key={project.title} project={project} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </section>
  )
}
