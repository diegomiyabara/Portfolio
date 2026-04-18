/**
 * Task 11.6 — PBT Property 4: active section tracking returns exactly one ID
 *
 * Validates: Requirements — useActiveSection always returns exactly one valid section ID
 */
import { renderHook, act } from '@testing-library/react'
import { describe, it, vi, beforeEach } from 'vitest'
import * as fc from 'fast-check'
import { useActiveSection } from '../hooks/useActiveSection'

const mockObserve = vi.fn()
const mockDisconnect = vi.fn()
let capturedCallback: IntersectionObserverCallback

// Must be a proper constructor function
global.IntersectionObserver = vi.fn(function (this: unknown, cb: IntersectionObserverCallback) {
  capturedCallback = cb
  return { observe: mockObserve, disconnect: mockDisconnect, unobserve: vi.fn() }
}) as unknown as typeof IntersectionObserver

describe('PBT Property 4: active section tracking returns exactly one ID', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    document.body.innerHTML = ''
  })

  it('initial value is always the first element of the input array', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 10 }),
        (sectionIds) => {
          const { result, unmount } = renderHook(() => useActiveSection(sectionIds))
          const initial = result.current
          unmount()
          return initial === sectionIds[0]
        }
      ),
      { numRuns: 50 }
    )
  })

  it('returned value is always a member of the provided IDs array', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
        (sectionIds) => {
          // Create DOM elements so the observer can find them
          sectionIds.forEach((id) => {
            if (!document.getElementById(id)) {
              const el = document.createElement('div')
              el.id = id
              document.body.appendChild(el)
            }
          })

          const { result, unmount } = renderHook(() => useActiveSection(sectionIds))

          // Simulate intersection for a random element
          const targetId = sectionIds[Math.floor(Math.random() * sectionIds.length)]
          const targetEl = document.getElementById(targetId)
          if (targetEl && capturedCallback) {
            act(() => {
              capturedCallback(
                [{ isIntersecting: true, target: targetEl } as unknown as IntersectionObserverEntry],
                {} as IntersectionObserver
              )
            })
          }

          const active = result.current
          unmount()

          // Clean up
          sectionIds.forEach((id) => document.getElementById(id)?.remove())

          return sectionIds.includes(active)
        }
      ),
      { numRuns: 30 }
    )
  })

  it('returns exactly one string (not an array or undefined)', () => {
    fc.assert(
      fc.property(
        fc.array(fc.string({ minLength: 1 }), { minLength: 1, maxLength: 5 }),
        (sectionIds) => {
          const { result, unmount } = renderHook(() => useActiveSection(sectionIds))
          const active = result.current
          unmount()
          return typeof active === 'string'
        }
      ),
      { numRuns: 30 }
    )
  })
})
