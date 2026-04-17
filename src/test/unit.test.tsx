/**
 * Task 11.1 — Unit tests for LanguageToggle, ContactSection, Navbar, useActiveSection
 */
import React from 'react'
import { render, screen, fireEvent, act, renderHook } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import i18next from 'i18next'
import { initReactI18next, I18nextProvider } from 'react-i18next'
import enJSON from '../i18n/locales/en.json'
import ptJSON from '../i18n/locales/pt.json'

// ---------------------------------------------------------------------------
// framer-motion mock — motion.* components rendered as plain HTML elements
// ---------------------------------------------------------------------------
vi.mock('framer-motion', () => {
  const React = require('react')
  const makeMotion = (tag: string) =>
    React.forwardRef(({ children, ...props }: React.HTMLAttributes<HTMLElement> & { children?: React.ReactNode }, ref: React.Ref<HTMLElement>) => {
      // Strip framer-motion-specific props
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
      section: makeMotion('section'),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
    useReducedMotion: () => false,
  }
})

// ---------------------------------------------------------------------------
// hero image mock
// ---------------------------------------------------------------------------
vi.mock('../assets/hero.png', () => ({ default: 'hero.png' }))

// ---------------------------------------------------------------------------
// i18n test instance
// ---------------------------------------------------------------------------
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

// ---------------------------------------------------------------------------
// IntersectionObserver mock — must be a constructor function
// ---------------------------------------------------------------------------
const mockObserve = vi.fn()
const mockDisconnect = vi.fn()
let intersectionCallback: IntersectionObserverCallback

global.IntersectionObserver = vi.fn(function (this: unknown, cb: IntersectionObserverCallback) {
  intersectionCallback = cb
  return { observe: mockObserve, disconnect: mockDisconnect, unobserve: vi.fn() }
}) as unknown as typeof IntersectionObserver

// ---------------------------------------------------------------------------
// Imports under test (after mocks)
// ---------------------------------------------------------------------------
import LanguageToggle from '../components/LanguageToggle'
import ContactSection from '../components/ContactSection'
import Navbar from '../components/Navbar'
import { useActiveSection } from '../hooks/useActiveSection'

// ---------------------------------------------------------------------------
// LanguageToggle tests
// ---------------------------------------------------------------------------
describe('LanguageToggle', () => {
  beforeEach(() => {
    sessionStorage.clear()
    testI18n.changeLanguage('pt')
  })

  it('renders a button', () => {
    render(<LanguageToggle />, { wrapper: Wrapper })
    expect(screen.getByRole('button')).toBeInTheDocument()
  })

  it('shows "EN" label when language is pt', () => {
    render(<LanguageToggle />, { wrapper: Wrapper })
    expect(screen.getByRole('button')).toHaveTextContent('EN')
  })

  it('calls i18n.changeLanguage and sets sessionStorage on click', async () => {
    const changeSpy = vi.spyOn(testI18n, 'changeLanguage')
    render(<LanguageToggle />, { wrapper: Wrapper })
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(changeSpy).toHaveBeenCalledWith('en')
    expect(sessionStorage.getItem('language')).toBe('en')
    changeSpy.mockRestore()
  })

  it('toggles back to pt from en', async () => {
    await act(async () => { await testI18n.changeLanguage('en') })
    const changeSpy = vi.spyOn(testI18n, 'changeLanguage')
    render(<LanguageToggle />, { wrapper: Wrapper })
    await act(async () => {
      fireEvent.click(screen.getByRole('button'))
    })
    expect(changeSpy).toHaveBeenCalledWith('pt')
    expect(sessionStorage.getItem('language')).toBe('pt')
    changeSpy.mockRestore()
  })
})

// ---------------------------------------------------------------------------
// ContactSection tests
// ---------------------------------------------------------------------------
describe('ContactSection', () => {
  it('renders available contact links', () => {
    render(<ContactSection />, { wrapper: Wrapper })
    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /e-mail|email/i })).toBeInTheDocument()
  })

  it('does not render whatsapp link (available=false)', () => {
    render(<ContactSection />, { wrapper: Wrapper })
    expect(screen.queryByRole('link', { name: /whatsapp/i })).not.toBeInTheDocument()
  })
})

// ---------------------------------------------------------------------------
// Navbar tests
// ---------------------------------------------------------------------------
describe('Navbar', () => {
  it('renders exactly 4 nav anchor links in the desktop nav', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
    const links = desktopNav.querySelectorAll('a')
    expect(links).toHaveLength(4)
  })

  it('each desktop nav link has correct href', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const desktopNav = screen.getByRole('navigation', { name: /main navigation/i })
    const hrefs = Array.from(desktopNav.querySelectorAll('a')).map((a) => a.getAttribute('href'))
    expect(hrefs).toContain('#home')
    expect(hrefs).toContain('#skills')
    expect(hrefs).toContain('#projects')
    expect(hrefs).toContain('#contact')
  })

  it('renders logo link pointing to #home', () => {
    render(<Navbar />, { wrapper: Wrapper })
    const logoLink = screen.getByRole('link', { name: /diego/i })
    expect(logoLink).toHaveAttribute('href', '#home')
  })
})

// ---------------------------------------------------------------------------
// useActiveSection tests
// ---------------------------------------------------------------------------
describe('useActiveSection', () => {
  it('returns the first section ID as initial value', () => {
    const { result } = renderHook(() => useActiveSection(['home', 'skills', 'projects']))
    expect(result.current).toBe('home')
  })

  it('updates when IntersectionObserver fires with isIntersecting=true', () => {
    const ids = ['home', 'skills', 'projects']
    ids.forEach((id) => {
      if (!document.getElementById(id)) {
        const el = document.createElement('div')
        el.id = id
        document.body.appendChild(el)
      }
    })

    const { result } = renderHook(() => useActiveSection(ids))
    expect(result.current).toBe('home')

    const skillsEl = document.getElementById('skills')!
    act(() => {
      intersectionCallback(
        [{ isIntersecting: true, target: skillsEl } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })
    expect(result.current).toBe('skills')

    ids.forEach((id) => document.getElementById(id)?.remove())
  })

  it('does not update when isIntersecting=false', () => {
    const ids = ['home', 'about']
    ids.forEach((id) => {
      if (!document.getElementById(id)) {
        const el = document.createElement('div')
        el.id = id
        document.body.appendChild(el)
      }
    })

    const { result } = renderHook(() => useActiveSection(ids))
    const aboutEl = document.getElementById('about')!
    act(() => {
      intersectionCallback(
        [{ isIntersecting: false, target: aboutEl } as IntersectionObserverEntry],
        {} as IntersectionObserver
      )
    })
    expect(result.current).toBe('home')

    ids.forEach((id) => document.getElementById(id)?.remove())
  })
})
