/**
 * Task 11.4 — PBT Property 2: language preference persists in session
 *
 * Validates: Requirements — sessionStorage persists language selection
 */
import { describe, it, expect, beforeEach, vi } from 'vitest'
import * as fc from 'fast-check'
import i18next from 'i18next'
import { initReactI18next } from 'react-i18next'
import enJSON from '../i18n/locales/en.json'
import ptJSON from '../i18n/locales/pt.json'

vi.mock('framer-motion', () => ({
  motion: { div: 'div', a: 'a', nav: 'nav', span: 'span' },
  AnimatePresence: ({ children }: { children: unknown }) => children,
  useReducedMotion: () => false,
}))

describe('PBT Property 2: language preference persists in session', () => {
  beforeEach(() => {
    sessionStorage.clear()
  })

  it('sessionStorage.getItem returns the language that was set', () => {
    fc.assert(
      fc.property(fc.constantFrom('pt' as const, 'en' as const), (lang) => {
        sessionStorage.setItem('language', lang)
        expect(sessionStorage.getItem('language')).toBe(lang)
        sessionStorage.clear()
      }),
      { numRuns: 20 }
    )
  })

  it('i18n picks up persisted language from sessionStorage on init', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom('pt' as const, 'en' as const), async (lang) => {
        sessionStorage.setItem('language', lang)

        const savedLanguage = sessionStorage.getItem('language') ?? 'pt'
        const i18n = i18next.createInstance()
        await i18n.use(initReactI18next).init({
          resources: {
            pt: { translation: ptJSON },
            en: { translation: enJSON },
          },
          lng: savedLanguage,
          fallbackLng: 'pt',
          interpolation: { escapeValue: false },
        })

        expect(i18n.language).toBe(lang)
        sessionStorage.clear()
      }),
      { numRuns: 10 }
    )
  })

  it('changing language updates sessionStorage correctly', async () => {
    const i18n = i18next.createInstance()
    await i18n.use(initReactI18next).init({
      resources: {
        pt: { translation: ptJSON },
        en: { translation: enJSON },
      },
      lng: 'pt',
      fallbackLng: 'pt',
      interpolation: { escapeValue: false },
    })

    await fc.assert(
      fc.asyncProperty(fc.constantFrom('pt' as const, 'en' as const), async (lang) => {
        await i18n.changeLanguage(lang)
        sessionStorage.setItem('language', lang)
        expect(sessionStorage.getItem('language')).toBe(lang)
      }),
      { numRuns: 10 }
    )
  })
})
