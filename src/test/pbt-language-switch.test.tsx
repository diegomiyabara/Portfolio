/**
 * Task 11.3 — PBT Property 1: language switch replaces all text
 *
 * Validates: Requirements — language switching produces correct translated text
 */
import React from 'react'
import { render, screen, act } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as fc from 'fast-check'
import i18next from 'i18next'
import { initReactI18next, I18nextProvider, useTranslation } from 'react-i18next'
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

const translations: Record<string, Record<string, string>> = {
  pt: { 'navbar.home': ptJSON.navbar.home },
  en: { 'navbar.home': enJSON.navbar.home },
}

function TestComponent() {
  const { t } = useTranslation()
  return <span data-testid="text">{t('navbar.home')}</span>
}

describe('PBT Property 1: language switch replaces all text', () => {
  it('for any language, rendered text matches expected translation', async () => {
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
        await act(async () => {
          await i18n.changeLanguage(lang)
        })

        const { unmount } = render(
          <I18nextProvider i18n={i18n}>
            <TestComponent />
          </I18nextProvider>
        )

        const text = screen.getByTestId('text').textContent
        expect(text).toBe(translations[lang]['navbar.home'])
        unmount()
      }),
      { numRuns: 10 }
    )
  })

  it('pt and en translations for navbar.home differ', () => {
    expect(ptJSON.navbar.home).not.toBe(enJSON.navbar.home)
  })
})
