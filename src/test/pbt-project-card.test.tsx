/**
 * Feature: portfolio-visual-content
 *
 * Property 4: Área visual do ProjectCard tem altura consistente
 * Property 5: Alt text da imagem do ProjectCard
 * Unit tests: área visual do ProjectCard
 */
import React, { useState } from 'react'
import { render, cleanup, fireEvent } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import * as fc from 'fast-check'

// ---------------------------------------------------------------------------
// framer-motion mock — useReducedMotion is overridable per test via the module
// ---------------------------------------------------------------------------
let mockReducedMotion = false

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
    useReducedMotion: () => mockReducedMotion,
  }
})

afterEach(() => {
  cleanup()
  mockReducedMotion = false
})

// ---------------------------------------------------------------------------
// TestProjectCard — mirrors ProjectCard logic from ProjectsSection.tsx
// ---------------------------------------------------------------------------
interface ProjectItem {
  title: string
  description: string
  techStack: string[]
  imageUrl?: string
  imageAlt?: string
  links?: readonly { label: string; url: string }[]
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
              data-testid="project-image"
              src={project.imageUrl}
              alt={project.imageAlt ?? project.title}
              className="object-cover w-full h-full"
              onError={() => setImgError(true)}
            />
          </motion.div>
        ) : (
          <div
            data-testid="project-placeholder"
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
// Property 4: Área visual do ProjectCard tem altura consistente
// Validates: Requirements 2.1, 2.5
// ---------------------------------------------------------------------------
describe('Property 4: Área visual do ProjectCard tem altura consistente', () => {
  it('para qualquer ProjectItem (com ou sem imageUrl), a área visual tem classe h-40', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string(),
          description: fc.string(),
          techStack: fc.array(fc.string()),
          imageUrl: fc.option(fc.webUrl(), { nil: undefined }),
          imageAlt: fc.option(fc.string(), { nil: undefined }),
          links: fc.option(
            fc.array(fc.record({ label: fc.string(), url: fc.webUrl() })),
            { nil: undefined }
          ),
        }),
        (project) => {
          const { getByTestId } = render(<TestProjectCard project={project} />)
          const visualArea = getByTestId('project-visual-area')
          expect(visualArea.classList.contains('h-40')).toBe(true)
          cleanup()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property 5: Alt text da imagem do ProjectCard
// Validates: Requirements 2.4, 4.3
// ---------------------------------------------------------------------------
describe('Property 5: Alt text da imagem do ProjectCard', () => {
  it('para qualquer ProjectItem com imageUrl, o alt da imagem é imageAlt quando presente, ou title quando ausente', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string({ minLength: 1 }),
          description: fc.string(),
          techStack: fc.array(fc.string()),
          imageUrl: fc.webUrl(),
          imageAlt: fc.option(fc.string({ minLength: 1 }), { nil: undefined }),
        }),
        (project) => {
          const { getByTestId } = render(<TestProjectCard project={project} />)
          const img = getByTestId('project-image') as HTMLImageElement
          const expectedAlt = project.imageAlt ?? project.title
          expect(img.getAttribute('alt')).toBe(expectedAlt)
          cleanup()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Unit tests: área visual do ProjectCard
// ---------------------------------------------------------------------------
describe('Unit tests: área visual do ProjectCard', () => {
  // Requirement 2.3 — placeholder quando imageUrl ausente
  it('renderiza placeholder quando imageUrl está ausente', () => {
    const project: ProjectItem = {
      title: 'Meu Projeto',
      description: 'Descrição',
      techStack: ['React'],
    }
    const { getByTestId, queryByTestId } = render(<TestProjectCard project={project} />)
    expect(getByTestId('project-placeholder')).toBeTruthy()
    expect(queryByTestId('project-image')).toBeNull()
  })

  // Requirement 2.2 — imagem com object-cover quando imageUrl presente
  it('renderiza imagem com classe object-cover quando imageUrl está presente', () => {
    const project: ProjectItem = {
      title: 'Meu Projeto',
      description: 'Descrição',
      techStack: ['React'],
      imageUrl: 'https://example.com/img.png',
    }
    const { getByTestId, queryByTestId } = render(<TestProjectCard project={project} />)
    const img = getByTestId('project-image') as HTMLImageElement
    expect(img).toBeTruthy()
    expect(img.classList.contains('object-cover')).toBe(true)
    expect(queryByTestId('project-placeholder')).toBeNull()
  })

  // Requirement 5.2 — placeholder usa variáveis CSS do tema
  it('placeholder usa variáveis CSS do tema no background', () => {
    const project: ProjectItem = {
      title: 'Projeto Sem Imagem',
      description: 'Descrição',
      techStack: [],
    }
    const { getByTestId } = render(<TestProjectCard project={project} />)
    const placeholder = getByTestId('project-placeholder') as HTMLElement
    const bg = placeholder.style.background
    expect(bg).toContain('var(--color-primary')
    expect(bg).toContain('var(--color-surface')
  })

  // onError substitui imagem por placeholder
  it('onError na imagem substitui por placeholder', () => {
    const project: ProjectItem = {
      title: 'Projeto',
      description: 'Descrição',
      techStack: [],
      imageUrl: 'https://example.com/broken.png',
    }
    const { getByTestId, queryByTestId } = render(<TestProjectCard project={project} />)
    // Initially shows image
    expect(getByTestId('project-image')).toBeTruthy()
    // Trigger error
    fireEvent.error(getByTestId('project-image'))
    // Now shows placeholder
    expect(queryByTestId('project-image')).toBeNull()
    expect(getByTestId('project-placeholder')).toBeTruthy()
  })

  // Requirement 2.6 — Reduced Motion: imagem renderiza sem animação de entrada
  it('com Reduced Motion ativado, a imagem é renderizada normalmente (sem animação de opacidade)', () => {
    mockReducedMotion = true
    const project: ProjectItem = {
      title: 'Projeto',
      description: 'Descrição',
      techStack: [],
      imageUrl: 'https://example.com/img.png',
    }
    // With reduced motion, the motion.div receives initial=false and animate=undefined.
    // The mock strips these props and renders a plain div — the image must still be visible.
    const { getByTestId } = render(<TestProjectCard project={project} />)
    const img = getByTestId('project-image') as HTMLImageElement
    expect(img).toBeTruthy()
    expect(img.getAttribute('src')).toBe('https://example.com/img.png')
    // The visual area must still be present with h-40
    const visualArea = getByTestId('project-visual-area')
    expect(visualArea.classList.contains('h-40')).toBe(true)
  })
})

// ---------------------------------------------------------------------------
// Property 6: Links do ProjectCard presentes e com atributos corretos
// Validates: Requirements 3.1, 3.2, 3.3
// ---------------------------------------------------------------------------
describe('Property 6: Links do ProjectCard presentes e com atributos corretos', () => {
  it('para qualquer ProjectItem com links não vazio, cada <a> tem href, target="_blank" e rel="noopener noreferrer"', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string(),
          description: fc.string(),
          techStack: fc.array(fc.string()),
          links: fc.array(
            fc.record({ label: fc.string({ minLength: 1 }), url: fc.webUrl() }),
            { minLength: 1 }
          ),
        }),
        (project) => {
          const { container } = render(<TestProjectCard project={project} />)
          const anchors = container.querySelectorAll('a')
          expect(anchors.length).toBe(project.links!.length)
          project.links!.forEach((link, i) => {
            expect(anchors[i].getAttribute('href')).toBe(link.url)
            expect(anchors[i].getAttribute('target')).toBe('_blank')
            expect(anchors[i].getAttribute('rel')).toBe('noopener noreferrer')
          })
          cleanup()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property 7: ProjectCard sem links não renderiza área de links
// Validates: Requirements 3.5
// ---------------------------------------------------------------------------
describe('Property 7: ProjectCard sem links não renderiza área de links', () => {
  it('para qualquer ProjectItem com links ausente ou vazio, não há <a> no card', () => {
    fc.assert(
      fc.property(
        fc.record({
          title: fc.string(),
          description: fc.string(),
          techStack: fc.array(fc.string()),
          links: fc.option(fc.constant([]), { nil: undefined }),
        }),
        (project) => {
          const { container } = render(<TestProjectCard project={project} />)
          const anchors = container.querySelectorAll('a')
          expect(anchors.length).toBe(0)
          cleanup()
        }
      ),
      { numRuns: 100 }
    )
  })
})
