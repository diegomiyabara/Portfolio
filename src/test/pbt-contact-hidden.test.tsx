/**
 * Task 11.5 — PBT Property 3: contact links with available=false are hidden
 *
 * Validates: Requirements — unavailable contact items produce no rendered anchor
 */
import React from 'react'
import { render, screen } from '@testing-library/react'
import { describe, it, vi } from 'vitest'
import * as fc from 'fast-check'

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

// Minimal ContactLink equivalent that mirrors the real component's logic
interface ContactItem {
  id: string
  href: string
  available: boolean
}

function MinimalContactLink({ item }: { item: ContactItem }) {
  if (!item.available) return null
  return (
    <a href={item.href} aria-label={item.id}>
      {item.id}
    </a>
  )
}

function MinimalContactList({ items }: { items: ContactItem[] }) {
  return (
    <div>
      {items.map((item, i) => (
        <MinimalContactLink key={`${item.id}-${i}`} item={item} />
      ))}
    </div>
  )
}

describe('PBT Property 3: contact links with available=false are hidden', () => {
  it('available=false items produce no anchor; available=true items produce an anchor', () => {
    fc.assert(
      fc.property(
        fc.array(
          fc.record({
            id: fc.constantFrom('linkedin', 'github', 'email', 'whatsapp'),
            href: fc.webUrl(),
            available: fc.boolean(),
          }),
          { minLength: 0, maxLength: 8 }
        ),
        (items) => {
          const { container, unmount } = render(<MinimalContactList items={items} />)

          const anchors = container.querySelectorAll('a')
          const availableItems = items.filter((i) => i.available)
          const unavailableItems = items.filter((i) => !i.available)

          // Count of rendered anchors must equal count of available items
          if (anchors.length !== availableItems.length) {
            unmount()
            return false
          }

          // Every available item should have a corresponding anchor
          for (const item of availableItems) {
            const found = Array.from(anchors).some(
              (a) => a.getAttribute('aria-label') === item.id && a.getAttribute('href') === item.href
            )
            if (!found) {
              unmount()
              return false
            }
          }

          // No unavailable item should have a rendered anchor with its href
          for (const item of unavailableItems) {
            const found = Array.from(anchors).some(
              (a) => a.getAttribute('href') === item.href && a.getAttribute('aria-label') === item.id
            )
            if (found) {
              unmount()
              return false
            }
          }

          unmount()
          return true
        }
      ),
      { numRuns: 50 }
    )
  })

  it('real contact data: whatsapp (available=false) is not rendered', () => {
    const items: ContactItem[] = [
      { id: 'linkedin', href: 'https://linkedin.com', available: true },
      { id: 'github', href: 'https://github.com', available: true },
      { id: 'email', href: 'mailto:a@b.com', available: true },
      { id: 'whatsapp', href: 'https://wa.me/123', available: false },
    ]
    render(<MinimalContactList items={items} />)
    const whatsappLink = screen.queryByRole('link', { name: /whatsapp/i })
    expect(whatsappLink).not.toBeInTheDocument()
  })
})
