/**
 * Task 11.11 — Responsive layout example tests
 *
 * Tests DOM presence and class names at 320px, 768px, 1280px viewports.
 * jsdom doesn't process CSS, so we test class names rather than computed visibility.
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
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
    motion: { div: makeMotion('div'), a: makeMotion('a'), nav: makeMotion('nav'), span: makeMotion('span') },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: () => false,
  }
})

vi.mock('../assets/hero.png', () => ({ default: 'hero.png' }))

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

function setViewportWidth(width: number) {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
  window.dispatchEvent(new Event('resize'))
}

describe('Responsive layout', () => {
  afterEach(() => {
    setViewportWidth(1024)
  })

  describe('320px (mobile)', () => {
    beforeEach(() => setViewportWidth(320))

    it('hamburger button is present in DOM', () => {
      render(<Navbar />, { wrapper: Wrapper })
      const hamburger = screen.getByRole('button', { name: /open menu|close menu/i })
      expect(hamburger).toBeInTheDocument()
    })

    it('desktop nav has hidden md:flex class (CSS hides it on mobile)', () => {
      render(<Navbar />, { wrapper: Wrapper })
      const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(desktopNav.className).toContain('hidden')
      expect(desktopNav.className).toContain('md:flex')
    })
  })

  describe('768px (tablet)', () => {
    beforeEach(() => setViewportWidth(768))

    it('desktop nav is present in DOM', () => {
      render(<Navbar />, { wrapper: Wrapper })
      const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(desktopNav).toBeInTheDocument()
    })

    it('hamburger button is present in DOM', () => {
      render(<Navbar />, { wrapper: Wrapper })
      const hamburger = screen.getByRole('button', { name: /open menu|close menu/i })
      expect(hamburger).toBeInTheDocument()
    })
  })

  describe('1280px (desktop)', () => {
    beforeEach(() => setViewportWidth(1280))

    it('desktop nav is present in DOM', () => {
      render(<Navbar />, { wrapper: Wrapper })
      const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(desktopNav).toBeInTheDocument()
    })

    it('hamburger button is present in DOM (CSS hides it via md:hidden)', () => {
      render(<Navbar />, { wrapper: Wrapper })
      const hamburger = screen.getByRole('button', { name: /open menu|close menu/i })
      expect(hamburger).toBeInTheDocument()
    })

    it('desktop nav has 4 anchor links', () => {
      render(<Navbar />, { wrapper: Wrapper })
      const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
      expect(desktopNav.querySelectorAll('a')).toHaveLength(4)
    })
  })
})
