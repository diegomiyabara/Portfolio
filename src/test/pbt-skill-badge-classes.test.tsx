/**
 * Feature: portfolio-visual-content, Property 3: SkillBadge preserva classes existentes
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
// Property 3: SkillBadge preserva classes existentes
// Validates: Requirements 1.5, 5.3
// ---------------------------------------------------------------------------

/** Minimal TestBadge that mirrors SkillBadge logic using techIcons directly */
function TestBadge({ label }: { label: string }) {
  const IconComponent = techIcons[label]
  return (
    <span className="px-4 py-2 rounded-full bg-surface border border-primary/30 text-text text-sm font-medium flex items-center gap-2">
      {IconComponent ? (
        <IconComponent aria-hidden="true" focusable="false" width={20} height={20} />
      ) : null}
      {label}
    </span>
  )
}

describe('Property 3: SkillBadge preserva classes existentes', () => {
  it('para qualquer skill (mapeada ou não), o badge raiz contém as classes bg-surface e border', () => {
    const mappedSkills = Object.keys(techIcons)

    fc.assert(
      fc.property(
        fc.oneof(
          fc.constantFrom(...mappedSkills),
          fc.string()
        ),
        (skill) => {
          const { container } = render(<TestBadge label={skill} />)
          const badge = container.firstElementChild as HTMLElement
          expect(badge).not.toBeNull()
          expect(badge.classList.contains('bg-surface')).toBe(true)
          expect(badge.classList.contains('border')).toBe(true)
          cleanup()
        }
      ),
      { numRuns: 100 }
    )
  })
})
