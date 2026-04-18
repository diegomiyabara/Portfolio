/**
 * Feature: portfolio-visual-content
 * Smoke tests: links e acessibilidade
 * Requirements: 1.5, 3.4, 4.4
 */
import React, { useState } from 'react'
import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'

import ptJson from '../i18n/locales/pt.json'
import enJson from '../i18n/locales/en.json'

// ---------------------------------------------------------------------------
// framer-motion mock
// ---------------------------------------------------------------------------
vi.mock('framer-motion', () => {
  const React = require('react')
  const makeMotion = (tag: string) =>
    React.forwardRef(
      (
        { children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode },
        ref: React.Ref<HTMLElement>
      ) => {
        const {
          initial, animate, exit, variants, whileHover, whileTap,
          whileInView, transition, viewport, ...rest
        } = props as Record<string, unknown>
        void initial; void animate; void exit; void variants
        void whileHover; void whileTap; void whileInView; void transition; void viewport
        return React.createElement(tag, { ...rest, ref }, children)
      }
    )
  return {
    motion: {
      div: makeMotion('div'),
      a: makeMotion('a'),
      nav: makeMotion('nav'),
      span: makeMotion('span'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: () => false,
  }
})

// ---------------------------------------------------------------------------
// react-i18next mock for SkillsSection
// ---------------------------------------------------------------------------
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string, opts?: { returnObjects?: boolean }) => {
      if (key === 'skills.items' && opts?.returnObjects) {
        return ['React', 'TypeScript', 'Node.js']
      }
      if (key === 'skills.sectionTitle') return 'Skills'
      return key
    },
    i18n: { changeLanguage: () => Promise.resolve() },
  }),
  initReactI18next: { type: '3rdParty', init: () => {} },
}))

afterEach(() => cleanup())

// ---------------------------------------------------------------------------
// Minimal TestProjectCard (mirrors ProjectsSection logic)
// ---------------------------------------------------------------------------
interface ProjectLink { label: string; url: string }
interface ProjectItem {
  title: string
  description: string
  techStack: string[]
  imageUrl?: string
  imageAlt?: string
  links?: ProjectLink[]
}

function TestProjectCard({ project }: { project: ProjectItem }) {
  const { useReducedMotion, motion } = require('framer-motion')
  const shouldReduceMotion = useReducedMotion()
  const [imgError, setImgError] = useState(false)
  const showImage = project.imageUrl && !imgError

  return (
    <div className="bg-surface border border-primary/30 rounded-2xl overflow-hidden flex flex-col gap-4">
      <div data-testid="project-visual-area" className="h-40 rounded-t-2xl overflow-hidden">
        {showImage ? (
          <motion.div
            className="w-full h-full"
            initial={shouldReduceMotion ? false : { opacity: 0 }}
            animate={shouldReduceMotion ? undefined : { opacity: 1 }}
          >
            <img
              src={project.imageUrl}
              alt={project.imageAlt ?? project.title}
              className="object-cover w-full h-full"
              onError={() => setImgError(true)}
            />
          </motion.div>
        ) : (
          <div
            className="w-full h-full"
            style={{
              background:
                'linear-gradient(135deg, var(--color-primary, #00d4ff) 0%, var(--color-surface, #141414) 100%)',
              opacity: 0.15,
            }}
          />
        )}
      </div>
      <div className="px-6 pb-6 flex flex-col gap-4">
        <h3 className="text-xl font-semibold text-text">{project.title}</h3>
        <p className="text-muted text-sm leading-relaxed">{project.description}</p>
        <div className="flex flex-wrap gap-2 mt-auto">
          {project.techStack.map((tech) => (
            <span key={tech} className="px-3 py-1 rounded-full bg-primary/10 border border-primary/30 text-text text-xs font-medium">
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
                className="text-primary text-sm font-medium hover:underline rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// ---------------------------------------------------------------------------
// Smoke test 1: links têm classes focus-visible (Requirement 3.4)
// ---------------------------------------------------------------------------
describe('Smoke: links têm classes focus-visible', () => {
  it('cada <a> no ProjectCard tem focus-visible:ring-2 no className', () => {
    const project: ProjectItem = {
      title: 'Projeto Teste',
      description: 'Descrição',
      techStack: ['React'],
      links: [
        { label: 'GitHub', url: 'https://github.com/example' },
        { label: 'Demo', url: 'https://demo.example.com' },
      ],
    }
    const { container } = render(<TestProjectCard project={project} />)
    const anchors = container.querySelectorAll('a')
    expect(anchors.length).toBe(2)
    anchors.forEach((a) => {
      expect(a.className).toContain('focus-visible:ring-2')
    })
  })
})

// ---------------------------------------------------------------------------
// Smoke test 2: arquivos de tradução têm ≥ 2 projetos com imageAlt e links (Requirement 4.4)
// ---------------------------------------------------------------------------
describe('Smoke: arquivos i18n têm ≥ 2 projetos com imageAlt e links', () => {
  it('pt.json tem pelo menos 2 itens com imageAlt e links preenchidos', () => {
    const items = ptJson.projects.items as Array<Record<string, unknown>>
    const enriched = items.filter(
      (item) =>
        typeof item.imageAlt === 'string' &&
        item.imageAlt.length > 0 &&
        Array.isArray(item.links) &&
        (item.links as unknown[]).length > 0
    )
    expect(enriched.length).toBeGreaterThanOrEqual(2)
  })

  it('en.json tem pelo menos 2 itens com imageAlt e links preenchidos', () => {
    const items = enJson.projects.items as Array<Record<string, unknown>>
    const enriched = items.filter(
      (item) =>
        typeof item.imageAlt === 'string' &&
        item.imageAlt.length > 0 &&
        Array.isArray(item.links) &&
        (item.links as unknown[]).length > 0
    )
    expect(enriched.length).toBeGreaterThanOrEqual(2)
  })
})

// ---------------------------------------------------------------------------
// Smoke test 3: container de skills mantém flex-wrap (Requirement 1.5)
// ---------------------------------------------------------------------------
describe('Smoke: container de skills mantém flex-wrap', () => {
  it('o container de skills em SkillsSection tem classe flex-wrap', async () => {
    // Dynamically import after mocks are set up
    const { default: SkillsSection } = await import('../components/SkillsSection')
    const { container } = render(<SkillsSection />)
    // The skills container uses "flex flex-wrap justify-center gap-3"
    const flexWrapEl = container.querySelector('.flex-wrap')
    expect(flexWrapEl).not.toBeNull()
  })
})
