/**
 * Task 11.10 — PBT Property 8: all images have non-empty alt text
 *
 * Validates: Requirements — every img element has a non-empty alt attribute
 */
import React from 'react'
import { render } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import * as fc from 'fast-check'
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

import HeroSection from '../components/HeroSection'

async function makeI18n(lang: 'pt' | 'en') {
  const i18n = i18next.createInstance()
  await i18n.use(initReactI18next).init({
    resources: {
      pt: { translation: ptJSON },
      en: { translation: enJSON },
    },
    lng: lang,
    fallbackLng: 'pt',
    interpolation: { escapeValue: false },
  })
  return i18n
}

describe('PBT Property 8: all images have non-empty alt text', () => {
  it('for any language, hero image alt text is non-empty', async () => {
    await fc.assert(
      fc.asyncProperty(fc.constantFrom('pt' as const, 'en' as const), async (lang) => {
        const i18n = await makeI18n(lang)

        const { container, unmount } = render(
          <I18nextProvider i18n={i18n}>
            <HeroSection />
          </I18nextProvider>
        )

        const images = container.querySelectorAll('img')
        expect(images.length).toBeGreaterThan(0)

        for (const img of Array.from(images)) {
          const alt = img.getAttribute('alt')
          expect(alt, `img alt should be non-empty for lang=${lang}`).toBeTruthy()
          expect(alt!.trim().length).toBeGreaterThan(0)
        }

        unmount()
        return true
      }),
      { numRuns: 10 }
    )
  })

  it('hero image alt matches expected translation for pt', async () => {
    const i18n = await makeI18n('pt')
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <HeroSection />
      </I18nextProvider>
    )
    const img = container.querySelector('img')
    expect(img?.getAttribute('alt')).toBe(ptJSON.hero.photoAlt)
  })

  it('hero image alt matches expected translation for en', async () => {
    const i18n = await makeI18n('en')
    const { container } = render(
      <I18nextProvider i18n={i18n}>
        <HeroSection />
      </I18nextProvider>
    )
    const img = container.querySelector('img')
    expect(img?.getAttribute('alt')).toBe(enJSON.hero.photoAlt)
  })
})
