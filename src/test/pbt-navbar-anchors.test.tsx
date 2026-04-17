/**
 * Task 11.8 — PBT Property 6: navbar renders exactly one anchor per section
 *
 * Validates: Requirements — desktop nav always has exactly 4 anchors matching section IDs
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as fc from 'fast-check'
import i18next from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import enJSON from '../i18n/locales/en.json'
import ptJSON from '../i18n/locales/pt.json'

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
    useReducedMotion: () => false,
  }
})

// IntersectionObserver mock as proper constructor
global.IntersectionObserver = vi.fn(function (this: unknown) {
  return { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() }
}) as unknown as typeof IntersectionObserver

import Navbar from '../components/Navbar'

const testI18n = i18next.createInstance()
testI18n.use(initReactI18next).init({
  resources: {
    pt: { translation: ptJSON },
    en: { translation: enJSON },
  },
  lng: 'pt',
  fallbackLng: 'pt',
  interpolation: { escapeValue: false },
})

function Wrapper({ children }: { children: React.ReactNode }) {
  return <I18nextProvider i18n={testI18n}>{children}</I18nextProvider>
}

describe('PBT Property 6: navbar renders exactly one anchor per section', () => {
  it('desktop nav always contains exactly 4 anchors', () => {
    fc.assert(
      fc.property(
        fc.constant(['home', 'skills', 'projects', 'contact'] as const),
        (sectionIds) => {
          const { unmount } = render(<Navbar />, { wrapper: Wrapper })
          const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
          const anchors = desktopNav.querySelectorAll('a')
          const count = anchors.length
          unmount()
          return count === sectionIds.length
        }
      ),
      { numRuns: 5 }
    )
  })

  it('each section ID has exactly one corresponding anchor with correct href', () => {
    const sectionIds = ['home', 'skills', 'projects', 'contact']
    render(<Navbar />, { wrapper: Wrapper })
    const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
    const anchors = Array.from(desktopNav.querySelectorAll('a'))

    for (const id of sectionIds) {
      const matching = anchors.filter((a) => a.getAttribute('href') === `#${id}`)
      expect(matching).toHaveLength(1)
    }
  })

  it('no duplicate hrefs in desktop nav', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
    const hrefs = Array.from(desktopNav.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    const unique = new Set(hrefs)
    expect(unique.size).toBe(hrefs.length)
  })
})
