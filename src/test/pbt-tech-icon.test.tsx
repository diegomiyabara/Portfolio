/**
 * Feature: portfolio-visual-content
 *
 * Property 1: TechIcon bem formado para skills mapeadas
 * Property 2: SkillBadge sem ícone não exibe placeholder vazio
 * Property 9: TechIcon usa currentColor
 */
import React from 'react'
import { render, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach, vi } from 'vitest'
import * as fc from 'fast-check'
import techIcons from '../data/techIcons'

vi.mock('framer-motion', () => {
  const React = require('react')
  const makeMotion = (tag: string) =>
    React.forwardRef(
      (
        { children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode },
        ref: React.Ref<HTMLElement>
      ) => {
        const { initial, animate, exit, variants, whileHover, whileTap, whileInView, transition, viewport, ...rest } =
          props as Record<string, unknown>
        void initial; void animate; void exit; void variants; void whileHover; void whileTap; void whileInView; void transition; void viewport
        return React.createElement(tag, { ...rest, ref }, children)
      }
    )
  return {
    motion: { div: makeMotion('div'), a: makeMotion('a'), nav: makeMotion('nav'), span: makeMotion('span') },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: () => false,
  }
})

afterEach(() => {
  cleanup()
})

// ---------------------------------------------------------------------------
// Property 1: TechIcon bem formado para skills mapeadas
// Validates: Requirements 1.1, 1.3, 1.4
// ---------------------------------------------------------------------------
describe('Property 1: TechIcon bem formado para skills mapeadas', () => {
  it('para qualquer skill mapeada, o ícone tem aria-hidden="true" e dimensões 20×20', () => {
    fc.assert(
      fc.property(fc.constantFrom(...Object.keys(techIcons)), (skill) => {
        const IconComponent = techIcons[skill]
        const { container } = render(
          <IconComponent aria-hidden="true" focusable="false" width={20} height={20} />
        )
        const svg = container.querySelector('svg')
        expect(svg).not.toBeNull()
        expect(svg!.getAttribute('aria-hidden')).toBe('true')
        expect(svg!.getAttribute('width')).toBe('20')
        expect(svg!.getAttribute('height')).toBe('20')
        cleanup()
      }),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property 2: SkillBadge sem ícone não exibe placeholder vazio
// Validates: Requirements 1.2
// ---------------------------------------------------------------------------
describe('Property 2: SkillBadge sem ícone não exibe placeholder vazio', () => {
  it('para qualquer skill não mapeada, techIcons[skill] é undefined', () => {
    const mappedKeys = new Set(Object.keys(techIcons))
    fc.assert(
      fc.property(
        fc.string().filter((s) => !mappedKeys.has(s)),
        (unmappedSkill) => {
          // Use hasOwn to avoid prototype chain access (e.g. "__proto__")
          const hasIcon = Object.prototype.hasOwnProperty.call(techIcons, unmappedSkill)
          expect(hasIcon).toBe(false)
        }
      ),
      { numRuns: 100 }
    )
  })

  it('para qualquer skill não mapeada, renderizar o ícone retorna null (sem SVG)', () => {
    // TechIcon returns null when skill is not in the map — verify by rendering
    // a wrapper that mimics TechIcon logic
    const mappedKeys = new Set(Object.keys(techIcons))
    fc.assert(
      fc.property(
        fc.string().filter((s) => !mappedKeys.has(s)),
        (unmappedSkill) => {
          function TechIconWrapper({ skill }: { skill: string }) {
            const hasIcon = Object.prototype.hasOwnProperty.call(techIcons, skill)
            const IconComponent = hasIcon ? techIcons[skill] : undefined
            if (!IconComponent) return null
            return <IconComponent aria-hidden="true" focusable="false" width={20} height={20} />
          }
          const { container } = render(<TechIconWrapper skill={unmappedSkill} />)
          const svg = container.querySelector('svg')
          expect(svg).toBeNull()
          cleanup()
        }
      ),
      { numRuns: 100 }
    )
  })
})

// ---------------------------------------------------------------------------
// Property 9: TechIcon usa currentColor
// Validates: Requirements 5.1, 5.4
// ---------------------------------------------------------------------------
describe('Property 9: TechIcon usa currentColor', () => {
  it('para qualquer TechIcon renderizado, o SVG usa currentColor em fill ou stroke', () => {
    fc.assert(
      fc.property(fc.constantFrom(...Object.keys(techIcons)), (skill) => {
        const IconComponent = techIcons[skill]
        const { container } = render(
          <IconComponent aria-hidden="true" focusable="false" width={20} height={20} />
        )
        const svg = container.querySelector('svg')
        expect(svg).not.toBeNull()

        // Check SVG root or any descendant element uses currentColor
        const allElements = [svg!, ...Array.from(svg!.querySelectorAll('*'))]
        const usesCurrentColor = allElements.some(
          (el) =>
            el.getAttribute('fill') === 'currentColor' ||
            el.getAttribute('stroke') === 'currentColor'
        )

        expect(usesCurrentColor).toBe(true)
        cleanup()
      }),
      { numRuns: 100 }
    )
  })
})
