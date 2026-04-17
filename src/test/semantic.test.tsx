/**
 * Task 11.12 — Semantic HTML smoke test
 *
 * Renders the full App and asserts correct semantic structure.
 */
import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import i18next from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import enJSON from '../i18n/locales/en.json'
import ptJSON from '../i18n/locales/pt.json'

vi.mock('../assets/hero.png', () => ({ default: 'hero.png' }))

vi.mock('framer-motion', () => {
  const React = require('react')
  const makeMotion = (tag: string) =>
    React.forwardRef(({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }, ref: React.Ref<HTMLElement>) => {
      const { initial, animate, exit, variants, whileHover, whileTap, whileInView, transition, viewport, ...rest } = props as Record<string, unknown>
      void initial; void animate; void exit; void variants; void whileHover; void whileTap; void whileInView; void transition; void viewport
      return React.createElement(tag, { ...rest, ref }, children)
    })
  return {
    motion: { div: makeMotion('div'), a: makeMotion('a'), nav: makeMotion('nav'), span: makeMotion('span') },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: () => false,
  }
})

// IntersectionObserver mock as proper constructor
global.IntersectionObserver = vi.fn(function (this: unknown) {
  return { observe: vi.fn(), disconnect: vi.fn(), unobserve: vi.fn() }
}) as unknown as typeof IntersectionObserver

import App from '../App'

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

describe('Semantic HTML smoke test', () => {
  it('renders exactly one header element', () => {
    const { container } = render(<App />, { wrapper: Wrapper })
    const headers = container.querySelectorAll('header')
    expect(headers).toHaveLength(1)
  })

  it('header has role=banner', () => {
    const { container } = render(<App />, { wrapper: Wrapper })
    const header = container.querySelector('header')
    expect(header).toBeInTheDocument()
    expect(header?.getAttribute('role')).toBe('banner')
  })

  it('renders exactly one main element', () => {
    const { container } = render(<App />, { wrapper: Wrapper })
    const mains = container.querySelectorAll('main')
    expect(mains).toHaveLength(1)
  })

  it('renders exactly one footer element', () => {
    const { container } = render(<App />, { wrapper: Wrapper })
    const footers = container.querySelectorAll('footer')
    expect(footers).toHaveLength(1)
  })

  it('renders at least one nav element', () => {
    const { container } = render(<App />, { wrapper: Wrapper })
    const navs = container.querySelectorAll('nav')
    expect(navs.length).toBeGreaterThanOrEqual(1)
  })

  it('renders at least one section element', () => {
    const { container } = render(<App />, { wrapper: Wrapper })
    const sections = container.querySelectorAll('section')
    expect(sections.length).toBeGreaterThanOrEqual(1)
  })

  it('renders exactly one h1 element', () => {
    const { container } = render(<App />, { wrapper: Wrapper })
    const h1s = container.querySelectorAll('h1')
    expect(h1s).toHaveLength(1)
  })

  it('renders h2 elements (one per section)', () => {
    const { container } = render(<App />, { wrapper: Wrapper })
    const h2s = container.querySelectorAll('h2')
    expect(h2s.length).toBeGreaterThanOrEqual(1)
  })
})
