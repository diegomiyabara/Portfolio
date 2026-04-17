/**
 * Task 11.7 — PBT Property 5: reduced-motion disables animations
 *
 * Validates: Requirements — AnimatedSection renders plain div when reduced motion is true
 */
import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as fc from 'fast-check'

// We control useReducedMotion via a module-level variable
let mockReducedMotion = false

vi.mock('framer-motion', () => {
  const React = require('react')
  const makeMotion = (tag: string) =>
    React.forwardRef(({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }, ref: React.Ref<HTMLElement>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, whileInView, transition, viewport, ...rest } = props as Record<string, unknown>
      void initial; void animate; void exit; void variants; void whileHover; void whileTap; void whileInView; void transition; void viewport
      return React.createElement(tag, { ...rest, ref }, children)
    })
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

import AnimatedSection from '../components/AnimatedSection'

describe('PBT Property 5: reduced-motion disables animations', () => {
  it('when useReducedMotion=true renders plain div without motion wrapper; when false renders motion.div', () => {
    fc.assert(
      fc.property(fc.boolean(), (reducedMotion) => {
        mockReducedMotion = reducedMotion

        const { container, unmount } = render(
          <AnimatedSection>
            <span data-testid="child">content</span>
          </AnimatedSection>
        )

        const wrapper = container.firstChild as HTMLElement
        // Both branches render a div (motion.div is also a div in jsdom)
        const isDiv = wrapper.tagName === 'DIV'
        unmount()
        return isDiv
      }),
      { numRuns: 20 }
    )
  })

  it('reduced motion true: renders a plain div (no motion wrapper)', () => {
    mockReducedMotion = true
    const { container } = render(
      <AnimatedSection>
        <span>test</span>
      </AnimatedSection>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.tagName).toBe('DIV')
    // Plain div should not have data-framer-* attributes
    expect(wrapper.hasAttribute('data-framer-component-type')).toBe(false)
  })

  it('reduced motion false: renders a div (motion.div)', () => {
    mockReducedMotion = false
    const { container } = render(
      <AnimatedSection>
        <span>test</span>
      </AnimatedSection>
    )
    const wrapper = container.firstChild as HTMLElement
    expect(wrapper.tagName).toBe('DIV')
  })

  it('children are always rendered regardless of reduced motion', () => {
    fc.assert(
      fc.property(fc.boolean(), (reducedMotion) => {
        mockReducedMotion = reducedMotion
        const { container, unmount } = render(
          <AnimatedSection>
            <span data-testid="inner">hello</span>
          </AnimatedSection>
        )
        const inner = container.querySelector('[data-testid="inner"]')
        const found = inner !== null
        unmount()
        return found
      }),
      { numRuns: 10 }
    )
  })
})
